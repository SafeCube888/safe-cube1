'use server';

import { getAdminClient } from '@/lib/supabase/server';
import type { LeadStatus } from '@/types/database';

export async function updateLeadStatus(table: string, id: string, status: LeadStatus): Promise<{ success: boolean }> {
  try {
    const admin = getAdminClient();
    const { error } = await admin.from(table).update({ status }).eq('id', id);
    if (error) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function updateLeadNotes(table: string, id: string, internal_notes: string): Promise<{ success: boolean }> {
  try {
    const admin = getAdminClient();
    const { error } = await admin.from(table).update({ internal_notes }).eq('id', id);
    if (error) return { success: false };
    return { success: true };
  } catch {
    return { success: false };
  }
}
