import React from "react";
import { GoogleAnalytics as NextGoogleAnalytics } from "nextjs-google-analytics";

export type GoogleAnalyticsProps = Parameters<typeof NextGoogleAnalytics>[0];
export const DEFAULT_CONFIG: GoogleAnalyticsProps = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG_ID,
  strategy: "lazyOnload",
  trackPageViews: {
    ignoreHashChange: true
  }
};

const GoogleAnalytics = () => (
  <>
    {process.env.NODE_ENV !== "development" && <NextGoogleAnalytics {...DEFAULT_CONFIG} />}
  </>
);

export default React.memo(GoogleAnalytics);