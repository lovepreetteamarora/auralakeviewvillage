/** Public identifiers only. GTM owns all tags when a container is configured. */
export function resolveAnalyticsConfig(gtmId?: string, gaId?: string) {
  const gtm = gtmId?.trim() ?? "";
  const ga = gaId?.trim() ?? "";
  return {
    gtmId: /^GTM-[A-Z0-9]+$/.test(gtm) ? gtm : null,
    gaId: /^G-[A-Z0-9]+$/.test(ga) && !/^GTM-[A-Z0-9]+$/.test(gtm) ? ga : null,
  };
}

export const analyticsConfig = resolveAnalyticsConfig(
  process.env.NEXT_PUBLIC_GTM_ID,
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID,
);
