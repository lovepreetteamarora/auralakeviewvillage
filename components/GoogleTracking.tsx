import Script from "next/script";
import { analyticsConfig } from "@/lib/analytics-config";
import { AnalyticsPageViews } from "@/components/AnalyticsPageViews";

export function GoogleTracking() {
  const { gtmId, gaId } = analyticsConfig;
  if (gtmId) return <Script id="google-tag-manager" strategy="beforeInteractive">{`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',${JSON.stringify(gtmId)});
  `}</Script>;
  if (!gaId) return null;
  return <>
    <Script id="google-analytics-init" strategy="beforeInteractive">{`
      window.dataLayer=window.dataLayer||[];
      window.gtag=function(){window.dataLayer.push(arguments);};
      window.gtag('js',new Date());
      window.gtag('config',${JSON.stringify(gaId)},{send_page_view:false});
    `}</Script>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive"/>
    <AnalyticsPageViews/>
  </>;
}

export function GoogleTagManagerNoScript() {
  if (!analyticsConfig.gtmId) return null;
  return <noscript><iframe
    title="Google Tag Manager"
    src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}`}
    height="0" width="0" style={{ display: "none", visibility: "hidden" }}
  /></noscript>;
}
