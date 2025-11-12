// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
// import "./globals.css";

// const poppins = Poppins({
//   weight: ["300", "400", "500", "600", "700", "800"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

// export const metadata: Metadata = {
//   title: "Digital Marketing & IT Services | Transform Your Business",
//   description: "Transform your business with cutting-edge digital marketing and IT services powered by automation",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${poppins.variable} font-poppins antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script"; // Import Script component
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Digital Marketing & IT Services | Transform Your Business",
  description:
    "Transform your business with cutting-edge digital marketing and IT services powered by automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M2CMK463');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M2CMK463"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End GTM (noscript) */}
        {children}
      </body>
    </html>
  );
}
