import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface NotificationRequest {
  type: string;
  data: Record<string, unknown>;
}

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact Form Submission",
  consultation: "Consultation Request",
  cube_score: "CUBE SCORE Request",
  safe_snap: "SAFE SNAP Request",
  cube_insight: "CUBE INSIGHT Request",
  cube_care: "CUBE CARE Request",
  training: "Training Enquiry",
  iso_support: "ISO Support Request",
  product_quote: "Product Quotation Request",
  store_launch: "Store Launch Subscription",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { type, data } = (await req.json()) as NotificationRequest;
    const label = TYPE_LABELS[type] || "New Submission";

    const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL") || Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "noreply@safecube.example";
    const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL");

    let notifyEmail = adminEmail;

    if (!notifyEmail && supabaseUrl && serviceRoleKey) {
      const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { data: settings } = await supabase
        .from("site_settings")
        .select("admin_notification_email")
        .maybeSingle();
      if (settings?.admin_notification_email) {
        notifyEmail = settings.admin_notification_email;
      }
    }

    if (notifyEmail) {
      await sendEmail(resendApiKey, fromEmail, notifyEmail, label, type, data);
      await sendUserConfirmation(resendApiKey, fromEmail, data, label);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Notification error:", err);
    return new Response(
      JSON.stringify({ error: "Notification failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function sendEmail(
  apiKey: string | undefined,
  from: string,
  to: string,
  label: string,
  type: string,
  data: Record<string, unknown>
) {
  if (!apiKey) {
    console.warn("[Resend] RESEND_API_KEY not configured — skipping admin email");
    return;
  }

  const summary = formatSummary(type, data);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `SAFE CUBE <${from}>`,
      to: [to],
      subject: `[SAFE CUBE] ${label}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #00163E; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 20px;">SAFE CUBE — New ${label}</h1>
          </div>
          <div style="background: #F5F8FA; padding: 24px; border-radius: 0 0 8px 8px;">
            ${summary}
            <p style="color: #6B7280; font-size: 13px; margin-top: 24px;">
              This is an automated notification from the SAFE CUBE website.
            </p>
          </div>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[Resend] Admin email failed:", errText);
  }
}

async function sendUserConfirmation(
  apiKey: string | undefined,
  from: string,
  data: Record<string, unknown>,
  label: string
) {
  if (!apiKey) return;
  const userEmail = data.email as string | undefined;
  if (!userEmail) return;

  const userName = (data.name as string) || "there";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `SAFE CUBE <${from}>`,
      to: [userEmail],
      subject: "We have received your submission — SAFE CUBE",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #00163E; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 20px;">SAFE CUBE</h1>
          </div>
          <div style="background: #F5F8FA; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="color: #111827; font-size: 16px;">Hi ${userName},</p>
            <p style="color: #4B5563; font-size: 15px;">
              Thank you for contacting SAFE CUBE. We have received your ${label.toLowerCase()} and will respond within one business day.
            </p>
            <p style="color: #4B5563; font-size: 15px;">
              If your enquiry is urgent, please contact us directly by phone or WhatsApp.
            </p>
            <p style="color: #6B7280; font-size: 13px; margin-top: 24px;">
              SAFE CUBE — Strengthening Every Side of Your Business.
            </p>
          </div>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[Resend] User confirmation failed:", errText);
  }
}

function formatSummary(type: string, data: Record<string, unknown>): string {
  const fields: Record<string, string> = {
    name: (data.name as string) || "—",
    email: (data.email as string) || "—",
    phone: (data.phone as string) || "—",
    company: (data.company as string) || "—",
  };

  if (data.subject) fields.subject = data.subject as string;
  if (data.message) fields.message = data.message as string;
  if (data.industry) fields.industry = data.industry as string;
  if (data.employee_count) fields.employee_count = data.employee_count as string;
  if (data.preferred_date) fields.preferred_date = data.preferred_date as string;
  if (data.preferred_time) fields.preferred_time = data.preferred_time as string;
  if (data.service_interest) fields.service_interest = data.service_interest as string;
  if (data.training_program) fields.training_program = data.training_program as string;
  if (data.iso_standard) fields.iso_standard = data.iso_standard as string;
  if (data.location) fields.location = data.location as string;

  if (data.product_interests && Array.isArray(data.product_interests)) {
    fields.product_interests = (data.product_interests as string[]).join(", ");
  }
  if (data.service_areas && Array.isArray(data.service_areas)) {
    fields.service_areas = (data.service_areas as string[]).join(", ");
  }

  const rows = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding: 6px 12px; color: #6B7280; font-size: 14px; text-transform: capitalize; width: 160px;">${key.replace(/_/g, " ")}</td><td style="padding: 6px 12px; color: #111827; font-size: 14px;">${value}</td></tr>`
    )
    .join("");

  return `<table style="width: 100%; border-collapse: collapse;">${rows}</table>`;
}
