import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // https://www.npmjs.com/package/next-themes
    <html lang="en" suppressHydrationWarning>
      <body style={{ overflow: "auto" }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-dvh bg-background text-foreground transition transition ease-in-out duration-500`}
          >
            <Header />
            {children}
            <Toaster />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
