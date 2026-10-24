import { analyticsConfig } from "@/lib/analytics-config";

/** Called only after the server confirms persistence and floor-plan access. */
export function trackLeadConversion() {
  try {
    const target = window as Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };
    const id = crypto.randomUUID();
    const parameters = { event_id: id, transaction_id: id, project: "aura-lakeview-village", form_name: "aura_registration" };
    target.dataLayer ??= [];
    target.dataLayer.push({ event: "generate_lead", ...parameters });
    if (analyticsConfig.gaId && target.gtag) target.gtag("event", "generate_lead", parameters);
  } catch {
    // Analytics restrictions never block successful registration or downloads.
  }
}
