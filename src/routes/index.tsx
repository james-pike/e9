import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";
import Hero from "~/components/widgets/Hero";
import LandingCards from "~/components/LandingCards";
import ClassesCarousel from "~/components/widgets/ClassesCarousel";
import RetreatsSpotlight from "~/components/widgets/RetreatsSpotlight";
import EventsSection from "~/components/widgets/EventsSection";

export default component$(() => {
  return (
    <>
      <div class="-mt-2" style={{ contain: "layout style" }}>
        {/* Floating decorative circles — temporarily hidden
        <div class="hidden md:block absolute top-10 left-[46%] -translate-x-[46%] w-[700px] h-[500px] bg-primary-200/50 rounded-full blur-xl animate-float pointer-events-none" aria-hidden="true"></div>

        <div class="hidden lg:block absolute top-8 left-[44%] -translate-x-[44%] w-[300px] h-[300px] border-[2px] border-white rounded-full blur-sm animate-float pointer-events-none" aria-hidden="true"></div>

        <div class="hidden lg:block absolute top-10 left-[85%] -translate-x-[85%] w-[200px] h-[200px] border-[2.5px] border-white rounded-full blur-sm animate-floatx pointer-events-none" aria-hidden="true"></div>

        <div class="hidden lg:block absolute top-60 left-[93%] -translate-x-[93%] w-[100px] h-[100px] border-[2.5px] border-white rounded-full blur-sm animate-float pointer-events-none" aria-hidden="true"></div>

        <div class="hidden lg:block absolute top-[8%] left-[60%] -translate-x-[60%] w-[300px] h-[300px] border-[2.5px] border-white rounded-full blur-sm animate-float pointer-events-none" aria-hidden="true"></div>
        */}

        <Hero />

        {/* ClassesCarousel now fetches its own data client-side */}
        <ClassesCarousel />

        {/* Upcoming retreats — one container, matching the retreats page's
            Spotlight section wrapper (rounded panel + soft edge mask). */}
        <div class="relative z-10 p-5 md:px-8 lg:px-16 max-w-7xl md:mx-auto">
          <div class="relative rounded-3xl border-2 border-primary-100 bg-white/40 p-5 backdrop-blur-sm dark:border-primary-800/50 dark:bg-gray-800/30 md:p-8">
            <RetreatsSpotlight />
            {/* Soft edge mask so the panel blends into the page */}
            <div
              class="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ boxShadow: "inset 0 0 50px 25px rgba(227, 231, 227, 0.8)" }}
              aria-hidden="true"
            ></div>
          </div>
        </div>

        {/* Book Private & Corporate Events — now below Upcoming Retreats */}
        <EventsSection />

        <LandingCards />

        {/* ReviewsCarousel fetches its own data client-side */}
      
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: SITE.title,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};