import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import AboutTeaser from "@/components/sections/AboutTeaser";
import EventsTeaser from "@/components/sections/EventsTeaser";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Testimonials from "@/components/sections/Testimonials";
import DomainsHorizontalScroll from "@/components/sections/DomainsHorizontalScroll";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutTeaser />
      <EventsTeaser />
      <WhatWeDo />
      <Testimonials />
      <DomainsHorizontalScroll />
    </>
  );
}
