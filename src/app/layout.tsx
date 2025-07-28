import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/contexts/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"




const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrustNexus",
  description: "Secure business gateway with advanced authentication.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white`}>
        <CartProvider>
          
          <ThemeProvider defaultTheme="light" storageKey="trustnexus-theme">
            {children}
          </ThemeProvider>
          <CartSidebar />
        </CartProvider>
        
      </body>
    </html>
  )
}
