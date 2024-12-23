import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "@/components/theme-context/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Theme } from "@radix-ui/themes";

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
    
    <html lang="en" className="dark w-full h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col h-full overflow-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >        
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>

      </body>
    </html>
    
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