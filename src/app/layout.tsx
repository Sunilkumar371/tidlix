import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/ui/dark-mode";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Tidlix – Organize Your Life",
  description: "Tidlix is a modern productivity app for managing your todos, journaling daily thoughts, and taking organized notes — all in one place.",
  keywords: [
    "Tidlix",
    "todo app",
    "notes app",
    "journal app",
    "productivity",
    "task manager",
    "daily planner",
    "minimal todo",
    "organize tasks",
    "self-improvement",
  ],
  authors: [{ name: "Tidlix Team", url: "https://tidlix.onbva.live" }],
  creator: "Tidlix",
  openGraph: {
    title: "Tidlix – Organize Your Life",
    description:
      "Tidlix helps you stay on top of your goals with intuitive task management, journaling, and note-taking features.",
    url: "https://tidlix.onbva.live",
    siteName: "Tidlix",
    images: [
      {
        url: "/Tidlixlogo.png",
        width: 1200,
        height: 630,
        alt: "Tidlix App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tidlix – Organize Your Life",
    description: "A beautiful and simple way to manage your tasks, notes, and journal.",
    images: ["/Tidlixlogo.png"],
    creator: "@sunilkumar371",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            <div className="flex justify-end mt-2 mr-2">
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
