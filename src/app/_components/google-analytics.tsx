import Script from "next/script";

const GA_TRACKING_ID = 'GTM-WXHZMHWL';
const GoogleAnalytics = () => (
    <>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
        }
        />
        <Script
            id='gtag-init'
            strategy='afterInteractive'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
            });`,
            }}
        />
    </>
);

export default GoogleAnalytics;