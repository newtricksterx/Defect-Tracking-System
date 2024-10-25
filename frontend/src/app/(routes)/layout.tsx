import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LayoutDashboard, NotebookPen, UserRoundPen, Settings, Home } from "lucide-react";
import { SideBarDesktop } from "@/components/sidebar/sidebar-desktop";
import { SideBar } from "@/components/sidebar/sidebar";
import { Header } from "@/components/header/Header";
import { ThemeProvider } from "@/components/ThemeModes/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
    <AuthProvider>
    <html lang="en" className="dark w-full h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col h-full overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <div className="flex flex-1 overflow-hidden">
            <SideBar />
            <main className="ml-[215px] flex-1 h-full">
                {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
    </AuthProvider>
  );
}

/*
  <div className="absolute left-0 w-1/6 h-full">
    <SideBarFunction />
  </div>

  <div className="absolute right-0 w-5/6 h-full flex flex-col justify-center">
    {children}
  </div>
*/