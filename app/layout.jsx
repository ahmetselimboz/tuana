import "./globals.css";
import Script from "next/script";
import { Dosis } from 'next/font/google'
import StoreProvider from "./providers/StoreProvider";
import Loading from "./loading";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import Head from "next/head";

const dosis = Dosis({ subsets: ['latin'] })

export const metadata = {
  title: "Tuana | AI-Powered User Behavior Analytics Platform for Websites and Apps",
  description: "Tuana is an AI-powered platform providing real-time user behavior analytics for websites and apps, helping optimize user experience and performance.",
  robots: "index, follow",
  author: "Ahmet Selim Boz",
  publisher: "Lina Technologies",
  canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
  openGraph: {
    title: "Tuana | AI-Powered User Behavior Analytics Platform",
    description: "AI-powered platform providing real-time user behavior analytics for websites and apps.",
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
    site_name: "Tuana",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}tuana_pp_logo.jpg`, // Bir görsel linki ekleyin
        width: 1200,
        height: 630,
        alt: "Tuana platform overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuana | AI-Powered User Behavior Analytics Platform",
    description: "Real-time user behavior analytics with AI-driven insights.",
    image: `${process.env.NEXT_PUBLIC_DOMAIN_URL}tuana_pp_logo.jpg`, // Twitter için görsel
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <meta name="author" content="Ahmet Selim Boz" />
        <meta name="publisher" content="Lina Technologies" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN_URL} />
        <link rel="alternate" hrefLang="en" href={process.env.NEXT_PUBLIC_DOMAIN_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <img src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}tuana_pp_logo.jpg`} alt="Tuana user behavior analytics platform dashboard" />
        <img src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}tuana_pp_logo.jpg`} alt="Analytics platform" loading="lazy" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Tuana",
              "description": "AI-powered user behavior analytics platform",
              "url": `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
              "applicationCategory": "BusinessApplication",
              "creator": {
                "@type": "Organization",
                "name": "Lina Technologies",
              },
            }),
          }}
        />
        
      </Head>
      <body className={`${dosis.className} antialiased bg-main`}>
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <StoreProvider>
              {children}
            </StoreProvider>
          </Suspense>
        </ErrorBoundary>
      </body>

      <Script id="datalayer" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function track() {
            dataLayer.push(arguments);
          }
          track("js", new Date());
          track("config", "TNAKLYTP");`}
      </Script>
      <Script async src={`${process.env.NEXT_PUBLIC_SCRIPT_URL}`} />
    </html >
  );
}
