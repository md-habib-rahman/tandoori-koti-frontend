import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Marcellus,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import RecaptchaProvider from "@/components/providers/RecaptchaProvider";
import Footer from "@/components/common/Footer";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Tandoori Koti | Aito Intialainen Ravintola & Lounasbuffet",
  description:
    "Authentic Indian cuisine and daily lunch buffet in Kajaani, Finland.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fi" className={`${marcellus.variable} ${jakarta.variable}`}>
      <body className="bg-brand-dark text-brand-cream antialiased min-h-screen flex flex-col selection:bg-brand-gold/30 selection:text-brand-cream">
        <LanguageProvider>
          <Navbar />
          <RecaptchaProvider>
            <main className="flex-1">{children}</main>
          </RecaptchaProvider>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
