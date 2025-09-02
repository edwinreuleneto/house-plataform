import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

// Styles
import "@/styles/globals.css";

// Configurando Inter
const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Houser. Presente, precisa e inteligente",
  description:
    "Houser é sua assistente virtual de alta performance, preparada para atuar com precisão em ambientes corporativos.",
  keywords: [
    "assistente virtual",
    "inteligência artificial",
    "executiva",
    "Houser",
    "automação",
    "secretária digital",
  ],
  authors: [{ name: "Equipe Houser" }],
  creator: "Houser AI",
  metadataBase: new URL("https://Houser.ai"),

  openGraph: {
    title: "Houser. Presente, precisa e inteligente",
    description:
      "Descubra a Houser, a assistente inteligente para empresas de alta performance.",
    url: "https://Houser.ai",
    siteName: "Houser AI",
    images: [
      {
        url: "https://Houser.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Houser, a assistente virtual corporativa",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Houser. Presente, precisa e inteligente",
    description:
      "Houser é sua assistente virtual corporativa de alta performance.",
    images: ["https://Houser.ai/og-image.jpg"],
    creator: "@donna_ai",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} antialiased bg-gradient h-full bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}
