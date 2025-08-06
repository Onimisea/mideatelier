"use client";

import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/charts/styles.css";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import QueryProvider from "@/lib/query-provider";
import theme from "@/styles/theme";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--playfair",
  display: "swap",
});

const geistSans = Geist({
  variable: "--geist",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased font-geist bg-deep-navy text-muted-gold`}
      >
        <QueryProvider>
          <MantineProvider
            theme={theme}
            defaultColorScheme="dark"
            withCssVariables
          >
            <ModalsProvider>
              <Notifications />
              <NavigationProgress />
              {children}
            </ModalsProvider>

            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
