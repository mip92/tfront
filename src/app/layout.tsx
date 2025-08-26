import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/graphql';
import { AuthProvider } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tattoo Client - GraphQL App",
  description: "Next.js application with GraphQL authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider client={client}>
          <AuthProvider>
            <Navigation />
            {children}
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
