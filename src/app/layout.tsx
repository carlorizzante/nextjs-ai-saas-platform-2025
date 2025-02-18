import './globals.css';
import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
} from 'next/font/google';
import { CrispProvider } from '@/components/crisp-provider';
import { ModalProvider } from '@/components/modals/modal-provider';
import { ToastProvider } from '@/components/toast-provider';
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genjus AI",
  description: "AI Platform for the future!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <ModalProvider />
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
