'use client';

import { LeadTable, type LeadRecord } from '@/components/admin/LeadTable';
import { updateLeadStatus, updateLeadNotes } from '@/lib/admin-actions';
import type { LeadStatus } from '@/types/database';

interface LeadPageClientProps {
  title: string;
  records: LeadRecord[];
  columns: { key: string; label: string; render?: (value: unknown, row: LeadRecord) => React.ReactNode }[];
  tableName: string;
}

export function LeadPageClient({ title, records, columns, tableName }: LeadPageClientProps) {
  return (
    <LeadTable
      title={title}
      records={records}
      columns={columns}
      onStatusChange={async (id, status) => {
        await updateLeadStatus(tableName, id, status);
      }}
      onNotesChange={async (id, notes) => {
        await updateLeadNotes(tableName, id, notes);
      }}
    />
  );
}
