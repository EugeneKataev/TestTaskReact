import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Layout from "../components/Layout/Layout";
import StyledComponentsRegistry from "../lib/registry";

export const metadata: Metadata = {
  title: "Blog Application",
  description: "Blog web application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <Providers>
            <Layout>
              {children}
            </Layout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
