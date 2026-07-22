import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { getAdminClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== 'super_admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const admin = getAdminClient();

    const { data: existing } = await admin.from('site_settings').select('id').maybeSingle();

    if (existing) {
      const { error } = await admin.from('site_settings').update(body).eq('id', existing.id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      const { error } = await admin.from('site_settings').insert(body);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log the action
    await admin.from('audit_logs').insert({
      user_id: session.userId,
      action: 'settings_updated',
      entity_type: 'site_settings',
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
