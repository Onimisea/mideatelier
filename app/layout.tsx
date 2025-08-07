
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import HydrationProvider from "@/providers/HydrationProvider";
import CSRFTokenProvider from "@/providers/CSRFTokenProvider";
import QueryProvider from "@/providers/QueryProvider";

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
    <html lang="en" suppressHydrationWarning className="scrollbar">
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased font-geist bg-[#f5f5f5]`}
      >
        <HydrationProvider>
          <CSRFTokenProvider>
            <QueryProvider>
              {children}

              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
              />
            </QueryProvider>
          </CSRFTokenProvider>
        </HydrationProvider>
      </body>
    </html>
  );
}
