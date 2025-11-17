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

export default component$(() => {
  const workshops = useSignal<Workshop[]>([]);
  const isPlaying = useSignal<boolean>(false);
  const slidesPerViewSig = useSignal(4); // Start with 4 for desktop to avoid flash
  const loc = useLocation();

  // Fetch workshops data client-side
  useVisibleTask$(async () => {
    try {
      const response = await fetch('/api/classes');
      if (response.ok) {
        const data = await response.json();
        workshops.value = data;
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  });

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
        slidesPerViewSig.value = 4; // Desktop and up: 4 per row
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
  });

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
      <div class="p-5 -mt-1.5 md:px-16 bg-white/20  max-w-7xl md:mx-auto">
        {/* Header */}
        <div class="text-center mt-14 mb-10">
          <h1 class="!text-4xl md:!text-4.5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
              Our Offerings
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
            Explore our Classes & Workshops
          </p>
        </div>

        {/* Carousel */}
        {workshops.value.length === 0 ? (
          <div class="text-center py-12">
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

        {/* Events Section */}
        <div id="events" class="text-center mt-12 mb-8">
          <p class="text-xl md:text-2xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto mb-8">
            Book Private & Corporate Events
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Corporate */}
            <a
              href="mailto:hello@earthenvessels.ca"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden"
            >
              <div class="h-48 w-full overflow-hidden">
                <img
                  src="/images/corporate.webp"
                  alt="Corporate Events"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="flex flex-col flex-1 p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-bold text-secondary-900 dark:text-secondary-100 flex-1 pr-3">
                    Corporate Events
                  </h3>
                  <span class={bookButtonClass}>
                    Book
                  </span>
                </div>
                <p class="text-sm md:text-base text-primary-700 dark:text-primary-300 line-clamp-4">
                  We offer creative, hands-on clay experiences designed to foster connection, reflection, and collaboration. Perfect for corporate retreats or staff appreciation gatherings. Contact us to discuss what might work for your group.
                </p>
              </div>
            </a>

            {/* Private */}
            <a
              href="mailto:hello@earthenvessels.ca"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden"
            >
              <div class="h-48 w-full overflow-hidden">
                <img
                  src="/images/private.jpeg"
                  alt="Private Events"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="flex flex-col flex-1 p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-bold text-secondary-900 dark:text-secondary-100 flex-1 pr-3">
                    Private Events
                  </h3>
                  <span class={bookButtonClass}>
                    Book
                  </span>
                </div>
                <p class="text-sm md:text-base text-primary-700 dark:text-primary-300 line-clamp-4">
                  Celebrate life's special moments. Gather around our large creative table to celebrate one another, play, and make something beautiful together. Think about hosting your next birthday, book club, family gathering or evening out with friends at earthen vessels. Contact us to discuss the opportunities!
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
});