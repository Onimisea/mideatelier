import { Metadata } from "next";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AboutMide from "./components/AboutMide";
import CollectionSection from "./components/CollectionSection";
import DealSection from "./components/DealSection";

export const metadata: Metadata = {
  title: "Mide's Atelier | Luxurious Couture Brand",
  description:
    "Mide's Atelier is a luxurious couture brand specializing in high-fashion bridal, ready-to-wear, and bespoke clothing for women. With a focus on timeless elegance and exquisite craftsmanship, each piece is carefully designed to tell a unique story. The brand seamlessly blends vintage luxury with modern chic, offering tailored designs that exude sophistication, warmth, and an organic, earthy-luxe aesthetic",
};

export default function Home() {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col">
      <Header />
      <MobileMenu />

      <div className="flex-1">
        <HeroSection />
        <AboutMide />
        <CollectionSection />
        <DealSection />
      </div>

      <Footer />
    </section>
  );
}
