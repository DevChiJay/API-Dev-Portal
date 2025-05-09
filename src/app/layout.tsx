import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/src/components/theme-provider";
import { Toaster } from "@/src/components/ui/toaster";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "API Developer Portal",
  description: "Manage and explore APIs for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Manage and explore APIs for developers" />
          <meta property="og:title" content="API Developer Portal" />
          <meta property="og:description" content="Manage and explore APIs for developers" />
          <meta property="og:image" content="/logo.png" />
          <meta property="og:url" content="https://portal.devchihub.com" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
