import { Button, Text, Title } from "@mantine/core";
import { Metadata } from "next";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Mide's Atelier | Luxurious Couture Brand",
  description:
    "Mide's Atelier is a luxurious couture brand specializing in high-fashion bridal, ready-to-wear, and bespoke clothing for women. With a focus on timeless elegance and exquisite craftsmanship, each piece is carefully designed to tell a unique story. The brand seamlessly blends vintage luxury with modern chic, offering tailored designs that exude sophistication, warmth, and an organic, earthy-luxe aesthetic",
};

export default function Home() {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col bg-deep-navy">
      <Header />
      <MobileMenu />

      <div className="flex-1 pt-[80px]">
        <div>
          <div className="p-6 min-h-screen flex flex-col items-center justify-center gap-6">
            <Title className="font-playfair text-5xl font-bold">
              Mide&apos;s Atelier
            </Title>

            <Text size="md" className="">
              Every Stitch Tells A Story
            </Text>

            <Button className="bg-burnt-orange hover:bg-muted-gold text-white font-bold py-3 px-8 rounded-full cursor-pointer">
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
