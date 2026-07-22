'use client';

import { useState } from 'react';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { SiteSettings } from '@/types/database';

interface SettingsFormProps {
  initialSettings: SiteSettings | null;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    phone: initialSettings?.phone ?? siteConfig.contact.phone,
    phone_href: initialSettings?.phone_href ?? siteConfig.contact.phoneHref,
    whatsapp: initialSettings?.whatsapp ?? siteConfig.contact.whatsapp,
    whatsapp_href: initialSettings?.whatsapp_href ?? siteConfig.contact.whatsappHref,
    email: initialSettings?.email ?? siteConfig.contact.email,
    email_href: initialSettings?.email_href ?? siteConfig.contact.emailHref,
    office: initialSettings?.office ?? siteConfig.contact.office,
    hours: initialSettings?.hours ?? siteConfig.contact.hours,
    linkedin: initialSettings?.linkedin ?? siteConfig.social.linkedin,
    facebook: initialSettings?.facebook ?? siteConfig.social.facebook,
    instagram: initialSettings?.instagram ?? siteConfig.social.instagram,
    youtube: initialSettings?.youtube ?? siteConfig.social.youtube,
    default_seo_title: initialSettings?.default_seo_title ?? siteConfig.seo.defaultTitle,
    default_seo_description: initialSettings?.default_seo_description ?? siteConfig.seo.defaultDescription,
    admin_notification_email: initialSettings?.admin_notification_email ?? '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
      }
    } catch {
      // Error handling
    }

    setSaving(false);
  };

  const fields = [
    { section: 'Contact Information', items: [
      { key: 'phone', label: 'Phone Number' },
      { key: 'phone_href', label: 'Phone Link (tel:)' },
      { key: 'whatsapp', label: 'WhatsApp Number' },
      { key: 'whatsapp_href', label: 'WhatsApp Link' },
      { key: 'email', label: 'Email Address' },
      { key: 'email_href', label: 'Email Link (mailto:)' },
      { key: 'office', label: 'Office Address' },
      { key: 'hours', label: 'Office Hours' },
    ]},
    { section: 'Social Links', items: [
      { key: 'linkedin', label: 'LinkedIn URL' },
      { key: 'facebook', label: 'Facebook URL' },
      { key: 'instagram', label: 'Instagram URL' },
      { key: 'youtube', label: 'YouTube URL' },
    ]},
    { section: 'SEO Defaults', items: [
      { key: 'default_seo_title', label: 'Default SEO Title' },
      { key: 'default_seo_description', label: 'Default SEO Description' },
    ]},
    { section: 'Admin Notifications', items: [
      { key: 'admin_notification_email', label: 'Admin Notification Email' },
    ]},
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {fields.map((section) => (
        <div key={section.section}>
          <h2 className="mb-4 border-b border-cube-soft pb-2 text-base font-semibold text-cube-navy">
            {section.section}
          </h2>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.key}>
                <label htmlFor={item.key} className="mb-1.5 block text-sm font-medium text-cube-navy">
                  {item.label}
                </label>
                <input
                  id={item.key}
                  type="text"
                  value={form[item.key as keyof typeof form]}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                  className="w-full rounded-md border border-cube-soft bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-cube-green px-6 py-2.5 text-sm font-semibold text-white hover:bg-cube-green/90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-cube-success">
            <CheckCircle2 className="h-4 w-4" />
            Settings saved successfully.
          </span>
        )}
      </div>
    </form>
  );
}
