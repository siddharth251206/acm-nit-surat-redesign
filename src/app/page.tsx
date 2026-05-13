import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import AboutTeaser from "@/components/sections/AboutTeaser";
import EventsTeaser from "@/components/sections/EventsTeaser";
import DomainsHorizontalScroll from "@/components/sections/DomainsHorizontalScroll";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutTeaser />
      <EventsTeaser />
      <DomainsHorizontalScroll />
    </>
  );
}
