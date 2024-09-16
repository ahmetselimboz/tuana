import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Dosis } from 'next/font/google'

const dosis = Dosis({ subsets: ['latin'] })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// const dosis = localFont({
//   src: "./fonts/Dosis-Regular.woff",
//   variable: "--font-dosis-regular",
//   weight: "100 900",
// });

export const metadata = {
  title: "Tuana | AI-Based User Behavior Analysis Platform",
  description: "AI-Based User Behavior Analysis Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

      </head>
      <body className={`${dosis.className} antialiased bg-main`}>
        {children}

      </body>
      <Script async src="/track.js" />

     
      <Script id="datalayer" strategy="lazyOnload">
        {`
    window.dataLayer = window.dataLayer || [];
    function track() {
      dataLayer.push(arguments);
    }
    track("js", new Date());
    track("config", "5858");
  `}
      </Script>
    </html>
  );
}
