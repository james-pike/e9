import { component$, useSignal, useVisibleTask$, useTask$, $ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';
import { useLocation } from "@builder.io/qwik-city";
import { LuChevronLeft, LuChevronRight, LuCalendarDays, LuMapPin } from '@qwikest/icons/lucide';

interface Retreat {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  date: string;
  dateLabel: string;
  image: string;
  url: string;
  isActive?: boolean;
}

export default component$((props: { compact?: boolean }) => {
  const compact = props.compact ?? false;
  const retreats = useSignal<Retreat[]>([]);
  const loaded = useSignal(false);
  const isPlaying = useSignal<boolean>(false);
  const slidesPerViewSig = useSignal(compact ? 1 : 3); // Start with 3 for desktop to avoid flash
  const loc = useLocation();

  // Fetch retreats eagerly on document ready so content doesn't disappear on scroll
  useVisibleTask$(async () => {
    try {
      const response = await fetch('/api/retreats');
      if (response.ok) {
        retreats.value = await response.json();
      }
    } catch (error) {
      console.error('Error fetching retreats:', error);
    } finally {
      loaded.value = true;
    }
  }, { strategy: 'document-ready' });

  // Handle hash navigation
  useTask$(({ track }) => {
    track(() => loc.url.pathname + loc.url.hash);
    const hash = loc.url.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
    }
  });

  // Responsive slidesPerView – 1 on mobile (<768px), then scale up
  useVisibleTask$(({ cleanup }) => {
    isPlaying.value = true;

    const updateSlidesPerView = () => {
      if (compact) {
        slidesPerViewSig.value = 1; // Embedded in a narrow column: one card at a time
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        slidesPerViewSig.value = 3; // Desktop and up: 3 per row
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        slidesPerViewSig.value = 2; // Tablet: 2 per row
      } else {
        slidesPerViewSig.value = 1; // Mobile: strictly 1 per row
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    cleanup(() => {
      window.removeEventListener('resize', updateSlidesPerView);
    });
  }, { strategy: 'document-ready' });

  const handleMouseEnter$ = $(() => {
    isPlaying.value = false;
  });

  const handleMouseLeave$ = $(() => {
    isPlaying.value = true;
  });

  // Shared button style, matching the "Book" pill on the programs carousel
  const bookButtonClass = "shrink-0 min-w-[90px] px-4 py-1.5 text-sm font-medium text-white text-center bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 whitespace-nowrap";

  // Arrow button styles, matching the programs carousel
  const arrowButtonClass = "w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 opacity-75 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed text-primary-600";

  return (
    <div class="px-1">
      {/* Header */}
      <div class="mt-0 mb-6">
        <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
          Held at our studio
        </p>
        <h2 class={`mt-1 font-bold ${compact ? "!text-3xl md:!text-4xl" : "!text-4xl md:!text-4.5xl"}`}>
          <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
            Upcoming Retreats
          </span>
        </h2>
        <p class={`mt-3 text-primary-700 dark:text-primary-300 max-w-3xl ${compact ? "text-lg" : "text-xl md:text-2xl"}`}>
          Small circles of trust, gathered around the clay
        </p>
      </div>

      {/* Carousel / states */}
      {!loaded.value ? (
        <div class="flex items-center justify-center min-h-[300px]">
          <p class="text-primary-700 dark:text-primary-300 text-lg">Loading retreats...</p>
        </div>
      ) : retreats.value.length === 0 ? (
        <div class="mx-auto max-w-2xl rounded-2xl border border-dashed border-primary-300 dark:border-primary-700 bg-white/60 dark:bg-gray-800/40 px-7 py-12 text-center">
          <p class="font-serif text-2xl text-primary-800 dark:text-primary-100">
            No retreats are on the calendar just yet
          </p>
          <p class="mx-auto mt-3 max-w-md leading-7 text-primary-600 dark:text-primary-300">
            New dates are added through the seasons. Ask to be told when the next
            one opens, and we will be in touch.
          </p>
          <a
            href="/retreats/register"
            class={`mt-6 inline-block ${bookButtonClass}`}
          >
            Ask to be notified
          </a>
        </div>
      ) : (
        <Carousel.Root
          class="carousel-root relative"
          slidesPerView={slidesPerViewSig.value}
          gap={25}
          autoPlayIntervalMs={5000}
          bind:autoplay={isPlaying}
          draggable={true}
          align="start"
          sensitivity={{ mouse: 2.5, touch: 2.0 }}
          onMouseEnter$={handleMouseEnter$}
          onMouseLeave$={handleMouseLeave$}
        >
          <Carousel.Scroller class="carousel-scroller">
            {retreats.value.map((retreat) => (
              <Carousel.Slide key={retreat.id} class="h-auto">
                <a
                  href={retreat.url || "/retreats/register"}
                  target={retreat.url?.startsWith("http") ? "_blank" : undefined}
                  rel={retreat.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                  class="group flex flex-col h-full backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden block"
                >
                  {retreat.image && (
                    <img
                      src={retreat.image}
                      class="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={retreat.title}
                    />
                  )}
                  <div class="flex flex-col flex-1 p-4">
                    {/* Date + location line */}
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 text-sm text-primary-600 dark:text-primary-300">
                      {retreat.dateLabel && (
                        <span class="inline-flex items-center gap-1.5 font-medium">
                          <LuCalendarDays class="h-4 w-4 text-tertiary-500" />
                          {retreat.dateLabel}
                        </span>
                      )}
                      {retreat.location && (
                        <span class="inline-flex items-center gap-1.5">
                          <LuMapPin class="h-4 w-4 text-tertiary-500" />
                          {retreat.location}
                        </span>
                      )}
                    </div>

                    <div class="flex items-start justify-between mb-1 gap-3">
                      <h3 class="text-lg font-bold text-secondary-900 dark:text-secondary-100 line-clamp-2 flex-1">
                        {retreat.title}
                      </h3>
                      <span class={bookButtonClass}>
                        Reserve
                      </span>
                    </div>
                    {retreat.subtitle && (
                      <p class="font-serif italic text-primary-500 dark:text-primary-400 line-clamp-1 mb-1">
                        {retreat.subtitle}
                      </p>
                    )}
                    <p class="text-sm md:text-base text-primary-700 dark:text-primary-300 line-clamp-4 flex-1">
                      {retreat.description}
                    </p>
                  </div>
                </a>
              </Carousel.Slide>
            ))}
          </Carousel.Scroller>

          {/* Navigation and Pagination */}
          <div class="flex items-center justify-end mt-6 gap-4">
            <Carousel.Pagination class="flex space-x-2">
              {retreats.value.map((_, index) => (
                <Carousel.Bullet key={index} />
              ))}
            </Carousel.Pagination>
            <div class="flex gap-2">
              <Carousel.Previous class={arrowButtonClass}>
                <LuChevronLeft class="h-5 w-5" />
              </Carousel.Previous>
              <Carousel.Next class={arrowButtonClass}>
                <LuChevronRight class="h-5 w-5" />
              </Carousel.Next>
            </div>
          </div>
        </Carousel.Root>
      )}

      {/* Footer link to the full list */}
      <div class="text-center mt-8">
        <a
          href="/retreats/retreats"
          class="inline-flex items-center gap-1.5 font-medium text-primary-700 dark:text-primary-200 underline-offset-4 hover:underline"
        >
          See all upcoming retreats
          <LuChevronRight class="h-4 w-4" />
        </a>
      </div>
    </div>
  );
});
