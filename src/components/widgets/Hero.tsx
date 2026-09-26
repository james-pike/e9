import { component$ } from "@builder.io/qwik";
import HeroImageCarousel from "~/components/widgets/HeroImageCarousel";

export default component$(() => {
  return (
    <section class="relative">
      {/* Top cover: message + carousel. On desktop it fills the viewport MINUS
          the mural's overlap (20rem), so the turtle mural below straddles the
          100vh fold — its top half sits at the bottom of the cover, its bottom
          half is revealed on scroll. overflow-hidden lives HERE (not on the
          <section>) so the carousel masks clip, but the mural — which extends
          past the fold — is not clipped. */}
      <div class="relative overflow-hidden lg:h-[30rem]">
        {/* Desktop: full-bleed background carousel, faded toward the message on the left */}
        <div
          class="absolute inset-y-0 right-0 hidden w-[67%] lg:block"
          style={{
            // Left fade only — each slide image carries its own top/bottom fade,
            // aligned to that image's actual edges.
            maskImage: "linear-gradient(to right, transparent 0%, black 28%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%)",
          }}
          aria-hidden="true"
        >
          <HeroImageCarousel fill />
        </div>

        {/* Content — pointer-events-none so hover/click pass through to the
            background carousel; re-enabled on the interactive columns. */}
        <div class="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 py-4 sm:px-10 lg:px-12 lg:py-0">
          <div class="grid w-full items-center gap-10 lg:grid-cols-2">
            {/* Left column — wordmark, slogan, invitation */}
            <div class="pointer-events-auto text-center lg:max-w-[26rem] lg:pl-2 lg:text-left">
              {/* Logo (mobile/tablet) */}
              <img
                src="/images/logo22.svg"
                alt="earthen vessels logo"
                class="mx-auto mb-4 h-48 w-auto md:h-32 lg:hidden"
              />

              <h1 class="-mx-3 px-3 text-5.5xl font-bold tracking-tight lg:text-7xl">
                <span class="xdxd bg-gradient-to-r from-secondary-800 via-tertiary-500 to-secondary-800 bg-clip-text text-transparent">
                  earthen vessels
                </span>
              </h1>

              <h2 class="-mx-3 mt-4 px-3 font-bold !text-2.5xl lg:!text-3xl">
                <span class="xdxd bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                  Listening, Connecting &amp; Creating
                </span>
              </h2>

              <p class="mx-auto mt-6 max-w-[34rem] text-lg font-light leading-8 text-primary-800 dark:text-primary-200 md:text-xl lg:mx-0 lg:max-w-[23rem]">
                Here, we gather around clay, to listen deeply to one another, to
                ourselves, and to the earth as we shape earthen vessels.
              </p>

              {/* Action buttons */}
              <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="https://bookeo.com/earthenvessels"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 px-8 py-3.5 text-lg font-semibold text-white shadow-md ring-1 ring-inset ring-white/15 transition-all duration-200 hover:from-primary-500 hover:to-primary-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-50 sm:w-auto"
                  aria-label="Book a class"
                >
                  Book a Class
                  <svg class="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile/tablet — framed carousel (desktop uses the background layer) */}
            <div class="pointer-events-auto relative lg:hidden">
              <div class="absolute -inset-3 -rotate-2 rounded-[2rem] bg-gradient-to-tr from-secondary-200/50 via-tertiary-200/40 to-primary-200/50 blur-md" aria-hidden="true"></div>
              <div class="relative overflow-hidden rounded-[1.75rem] border-2 border-white/70 bg-primary-50 shadow-xl dark:bg-gray-800">
                <HeroImageCarousel />
                <div
                  class="pointer-events-none absolute inset-0 rounded-[1.75rem]"
                  style={{ boxShadow: "inset 0 0 50px 25px rgba(227, 231, 227, 0.8)" }}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Turtle mural — full-bleed, straddling the fold. It's ~24rem tall on
          desktop and the cover above is (100vh - 12rem), so its vertical middle
          lands on the 100vh fold: top half shows at the bottom of the cover,
          bottom half is revealed on scroll. object-cover crops the sky (top) and
          road (bottom) out of the photo. BOTH edges are masked so it fades into
          the background above and into the section that follows below. */}
      <div class="pointer-events-none relative z-10 w-full">
        <img
          src="/turtle.png"
          alt="Hand-painted turtle mural"
          width="2048"
          height="1536"
          class="h-56 w-full object-cover sm:h-64 lg:h-[24rem]"
          style={{
            // Bias the crop upward so the lead turtle's head isn't clipped.
            objectPosition: "center 42%",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
});
