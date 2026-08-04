import type { Metadata } from "next";
import { Inter, Playfair_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import DoorTransition from "@/components/animation/DoorTransition";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SoundProvider } from "@/components/audio/SoundProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Internet Waiting Room",
  description: "A sanctuary for pauses in a hyper-connected world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${ibmPlex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF9F6] text-charcoal-900 overflow-x-hidden">
        <SoundProvider>
          <DoorTransition>
            <Navbar />
            
            {/* Main content wrapped in scaling transitions */}
            <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 md:px-12 z-30 pb-16">
              <PageTransition>{children}</PageTransition>
            </main>

            <Footer />
          </DoorTransition>
        </SoundProvider>
      </body>
    </html>
  );
}
