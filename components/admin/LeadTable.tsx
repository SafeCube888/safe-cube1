'use client';

import { useState, useEffect } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';
import type { LeadStatus } from '@/types/database';

export interface LeadRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: LeadStatus;
  source_page: string | null;
  internal_notes: string | null;
  [key: string]: unknown;
}

interface LeadTableProps {
  title: string;
  records: LeadRecord[];
  columns: { key: string; label: string; render?: (value: unknown, row: LeadRecord) => React.ReactNode }[];
  pageSize?: number;
  onStatusChange?: (id: string, status: LeadStatus) => Promise<void>;
  onNotesChange?: (id: string, notes: string) => Promise<void>;
}

const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'in_progress', 'closed', 'archived'];

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-cube-blue/10 text-cube-blue',
  contacted: 'bg-cube-amber/10 text-cube-amber',
  qualified: 'bg-cube-green/10 text-cube-green',
  in_progress: 'bg-cube-purple/10 text-cube-purple',
  closed: 'bg-cube-navy/10 text-cube-navy',
  archived: 'bg-gray-100 text-gray-600',
};

export function LeadTable({ title, records, columns, pageSize = 10, onStatusChange, onNotesChange }: LeadTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<LeadRecord | null>(null);
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (selectedRecord) {
      setNotes(selectedRecord.internal_notes || '');
    }
  }, [selectedRecord]);

  const filtered = records.filter((r) => {
    const matchesSearch = !search || Object.values(r).some((v) =>
      String(v ?? '').toLowerCase().includes(search.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const pageRecords = filtered.slice(start, start + pageSize);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    if (onStatusChange) {
      setUpdating(true);
      await onStatusChange(id, status);
      setUpdating(false);
    }
  };

  const handleNotesSave = async () => {
    if (selectedRecord && onNotesChange) {
      setUpdating(true);
      await onNotesChange(selectedRecord.id, notes);
      setUpdating(false);
      setSelectedRecord(null);
    }
  };

  const exportCsv = () => {
    const headers = columns.map((c) => c.label).join(',');
    const rows = filtered.map((r) =>
      columns.map((c) => {
        const val = c.render ? '' : r[c.key];
        return `"${String(val ?? '').replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-cube-navy">{title}</h1>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 rounded-md border border-cube-soft bg-white px-4 py-2 text-sm font-medium text-cube-navy hover:bg-cube-soft"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-cube-soft bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-cube-soft bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green"
        >
          <option value="all">All Statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-cube-soft bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cube-soft bg-cube-soft/30">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRecords.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No records found.
                </td>
              </tr>
            ) : (
              pageRecords.map((record) => (
                <tr key={record.id} className="border-b border-cube-soft last:border-0 hover:bg-cube-soft/20">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-cube-navy">
                      {col.render ? col.render(record[col.key], record) : String(record[col.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="inline-flex items-center gap-1 text-sm text-cube-green hover:underline"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {start + 1}–{Math.min(start + pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-cube-soft p-2 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-muted-foreground">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-cube-soft p-2 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedRecord(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-cube-navy">Record Details</h2>
              <button onClick={() => setSelectedRecord(null)} className="text-muted-foreground hover:text-cube-navy">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {columns.map((col) => (
                <div key={col.key} className="flex flex-col gap-1 border-b border-cube-soft pb-2">
                  <span className="text-xs font-medium uppercase text-muted-foreground">{col.label}</span>
                  <span className="text-sm text-cube-navy">
                    {col.render ? col.render(selectedRecord[col.key], selectedRecord) : String(selectedRecord[col.key] ?? '—')}
                  </span>
                </div>
              ))}
              <div className="flex flex-col gap-1 border-b border-cube-soft pb-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">Source Page</span>
                <span className="text-sm text-cube-navy">{selectedRecord.source_page || '—'}</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-cube-soft pb-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">Created</span>
                <span className="text-sm text-cube-navy">{new Date(selectedRecord.created_at).toLocaleString()}</span>
              </div>
            </div>

            {/* Status update */}
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-cube-navy">Status</label>
              <select
                value={selectedRecord.status}
                onChange={(e) => {
                  handleStatusChange(selectedRecord.id, e.target.value as LeadStatus);
                  setSelectedRecord({ ...selectedRecord, status: e.target.value as LeadStatus });
                }}
                disabled={updating}
                className="w-full rounded-md border border-cube-soft px-3 py-2 text-sm"
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</option>
                ))}
              </select>
            </div>

            {/* Internal notes */}
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-cube-navy">Internal Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-cube-soft px-3 py-2 text-sm"
                placeholder="Add internal notes..."
              />
              <button
                onClick={handleNotesSave}
                disabled={updating}
                className="mt-2 rounded-md bg-cube-green px-4 py-2 text-sm font-medium text-white hover:bg-cube-green/90 disabled:opacity-60"
              >
                {updating ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { statusColors, LEAD_STATUSES };
