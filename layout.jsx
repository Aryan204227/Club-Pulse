import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export const metadata = {
    title: "ClubPulse – Smart Club Contribution & Transparency Platform",
    description: "Solve inactive club members, prevent overloaded student leader burnout, and provide transparent evidence of delivered activities in college organizations.",
};

export default function RootLayout({ children }) {
    return (
      <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('clubpulse-theme');
                  var isDark = saved ? saved === 'dark' : true;
                  var doc = document.documentElement;
                  if (isDark) {
                    doc.classList.add('dark');
                    doc.classList.remove('light');
                    doc.setAttribute('data-theme', 'dark');
                    doc.style.colorScheme = 'dark';
                  } else {
                    doc.classList.remove('dark');
                    doc.classList.add('light');
                    doc.setAttribute('data-theme', 'light');
                    doc.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F2F4F8] dark:bg-[#030108] text-slate-900 dark:text-slate-100 selection:bg-orange-100 selection:text-orange-950 transition-colors duration-200 antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<div className="h-[64px] border-b border-slate-200 bg-white"/>}>
              <Navbar />
            </Suspense>
          <main className="flex-1">
            <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading page...</div>}>
              {children}
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
      </body>
    </html>);
}
