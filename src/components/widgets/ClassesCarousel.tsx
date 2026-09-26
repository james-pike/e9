import { component$, useSignal, useVisibleTask$, useTask$, $ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';
import { useLocation } from "@builder.io/qwik-city";
import { LuChevronLeft, LuChevronRight } from '@qwikest/icons/lucide';

interface Workshop {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isActive?: boolean;
}

// TEMP (local dev only): the Turso DB isn't reachable on localhost, so the API
// returns just the dev sample. These hardcoded renewal events give the offerings
// list something to display. Remove once real classes load.
const RENEWAL_EVENTS: Workshop[] = [
  {
    id: 'renewal-1',
    name: 'Let Your Life Speak: An Autumn Circle of Trust',
    description:
      'A quiet weekend of reflection, honest questions, and time with the clay. We gather in a small circle to listen — to our own inner teacher and to one another — with no fixing, no advising, no setting each other straight.',
    image: '/images/space.jpeg',
    url: 'https://bookeo.com/earthenvessels',
  },
  {
    id: 'renewal-2',
    name: 'The Undivided Life: A Day of Renewal for Caregivers',
    description:
      'For those who spend their days holding space for others. A slow day to set down the work, return to what matters, and remember why you began.',
    image: '/images/space.jpeg',
    url: 'https://bookeo.com/earthenvessels',
  },
  {
    id: 'renewal-3',
    name: 'Winter Stillness: An Evening Circle of Trust',
    description:
      'A gentle way to begin. One quiet evening at the wheel and the table — an introduction to the circle, with time to listen inward and let the clay do its slow work.',
    image: '/images/space.jpeg',
    url: 'https://bookeo.com/earthenvessels',
  },
];

export default component$(() => {
  const workshops = useSignal<Workshop[]>([]);
  const isPlaying = useSignal<boolean>(false);
  const slidesPerViewSig = useSignal(3); // Start with 3 for desktop to avoid flash
  const loc = useLocation();

  // Fetch workshops data eagerly on document ready so content doesn't disappear on scroll
  useVisibleTask$(async () => {
    try {
      const response = await fetch('/api/classes');
      if (response.ok) {
        const data = await response.json();
        // TEMP: when only the dev sample comes back (no real DB on localhost),
        // append the hardcoded renewal events so there's content to view.
        workshops.value = data.length <= 1 ? [...data, ...RENEWAL_EVENTS] : data;
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
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
      if (window.matchMedia('(min-width: 1024px)').matches) {
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

  // Shared button style for perfect consistency
  const bookButtonClass = "shrink-0 min-w-[90px] px-4 py-1.5 text-sm font-medium text-white text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 whitespace-nowrap";

  // Arrow button styles - now for bottom placement
  const arrowButtonClass = "w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 opacity-75 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed text-primary-600";

  return (
    <>
      <div class="p-5 mt-6 lg:mt-8 md:px-8 lg:px-16 max-w-7xl md:mx-auto">
       <div class="relative rounded-3xl border-2 border-primary-100 bg-white/40 p-5 backdrop-blur-sm dark:border-primary-800/50 dark:bg-gray-800/30 md:p-8">
        {/* Header */}
        <div class="mt-0 mb-8 text-center">
          <h2 class="!text-4xl md:!text-4.5xl font-bold">
            <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
              Our Offerings
            </span>
          </h2>
          <p class="mt-3 text-xl md:text-2xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
            Explore our Classes &amp; Workshops
          </p>
        </div>

        {/* Carousel */}
        {workshops.value.length === 0 ? (
          <div class="flex items-center justify-center min-h-[440px]">
            <p class="text-primary-700 dark:text-primary-300 text-lg">Loading classes...</p>
          </div>
        ) : (
          <Carousel.Root
            class="carousel-root relative"
            slidesPerView={slidesPerViewSig.value}
            gap={25}
            autoPlayIntervalMs={4000}
            bind:autoplay={isPlaying}
            draggable={true}
            align="start"
            sensitivity={{ mouse: 2.5, touch: 2.0 }}
            onMouseEnter$={handleMouseEnter$}
            onMouseLeave$={handleMouseLeave$}
          >
            <Carousel.Scroller class="carousel-scroller">
              {workshops.value.map((workshop) => (
                <Carousel.Slide key={workshop.id} class="h-auto">
                  <a
                    href={workshop.url || "https://bookeo.com/earthenvessels"}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex flex-col h-full backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden block"
                  >
                    <img
                      src={workshop.image}
                      class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={workshop.name}
                    />
                    <div class="flex flex-col flex-1 p-4">
                      <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-bold text-secondary-900 dark:text-secondary-100 line-clamp-2 flex-1 pr-3">
                          {workshop.name}
                        </h3>
                        <span class={bookButtonClass}>
                          Book
                        </span>
                      </div>
                      <p class="text-sm md:text-base text-primary-700 dark:text-primary-300 line-clamp-4 flex-1">
                        {workshop.description}
                      </p>
                    </div>
                  </a>
                </Carousel.Slide>
              ))}
            </Carousel.Scroller>

            {/* Navigation and Pagination */}
            <div class="flex items-center justify-end mt-6 gap-4">
              <Carousel.Pagination class="flex space-x-2">
                {workshops.value.map((_, index) => (
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
        {/* Soft edge mask so the panel blends into the page */}
        <div
          class="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ boxShadow: "inset 0 0 50px 25px rgba(227, 231, 227, 0.8)" }}
          aria-hidden="true"
        ></div>
        </div>

        {/* Calendar Section — hidden for now */}
        <div id="calendars" class="hidden text-center mt-12 mb-28 scroll-mt-24">
          <p class="text-xl md:text-2xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto mb-8">
            Monthly Calendars
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* August Calendar */}
            <a
              href="https://www.canva.com/design/DAHOEYgNB0A/67gmrlOizcyOjwVieS9TfA/view?utm_content=DAHOEYgNB0A&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h51844caf63"
              target="_blank"
              rel="noopener noreferrer"
              class="group backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden"
            >
              <div class="w-full aspect-video overflow-hidden relative bg-white">
                <img
                  src="/images/August.png"
                  alt="August Calendar"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
});