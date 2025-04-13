import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/navbar";
import { Providers } from "./_redux/provider";
import AuthProvider from "./auth/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gallery",
  description: "A Gallery by Rishi Malik, please dont spam",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
          <Navbar />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
