import { component$, useSignal, useVisibleTask$, useTask$, $ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';
import { useLocation } from "@builder.io/qwik-city";

interface Workshop {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isActive?: boolean;
}

interface CarouselProps {
  workshops: Workshop[];
}

export default component$<CarouselProps>(({ workshops = [] }) => {
  const isPlaying = useSignal<boolean>(false);
  const slidesPerViewSig = useSignal(2);
  const loc = useLocation();

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

  // Update slidesPerView based on screen size
  useVisibleTask$(({ cleanup }) => {
    isPlaying.value = true;

    const updateSlidesPerView = () => {
      if (window.matchMedia('(min-width: 640px)').matches) {
        slidesPerViewSig.value = 3; // Larger screens
      } else {
        slidesPerViewSig.value = 1; // Mobile
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    cleanup(() => {
      window.removeEventListener('resize', updateSlidesPerView);
    });
  });

  // Hover pause handlers
  const handleMouseEnter$ = $(() => {
    isPlaying.value = false;
  });

  const handleMouseLeave$ = $(() => {
    isPlaying.value = true;
  });

  return (
    <>
      <div class="p-3 mt-6 md:p-8 bg-white/20 rounded-2xl max-w-7xl md:mx-0 mx-5">
        {/* Header and Subtitle */}
        <div class="text-center mt-12 mb-8">
          <h1 class="!text-5xl md:!text-5xl xdxd font-bold mb-6">
            <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
              Our Offerings
            </span>
          </h1>
          <p class="text-2xl px-1 text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
            Explore our Classes & Workshops
          </p>
        </div>

        {workshops.length === 0 ? (
          <div class="text-center py-12">
            <p class="text-primary-700 dark:text-primary-300 text-lg">Loading classes...</p>
          </div>
        ) : (
          <Carousel.Root
            class="carousel-root p-1"
            slidesPerView={slidesPerViewSig.value}
            gap={12}
            autoPlayIntervalMs={2500}
            bind:autoplay={isPlaying}
            draggable={true}
            align="start"
            onMouseEnter$={handleMouseEnter$}
            onMouseLeave$={handleMouseLeave$}
          >
            <Carousel.Scroller class="carousel-scroller">
              {workshops.map((workshop) => (
                <Carousel.Slide key={workshop.id} class="">
                  <a
                    href={workshop.url || "https://bookeo.com/earthenvessels"}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden block h-full"
                  >
                    <img
                      src={workshop.image}
                      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={workshop.name}
                    />
                    <div class="p-4">
                      <h3 class="text-lg font-bold text-secondary-900 dark:text-secondary-100 mb-2 line-clamp-2">
                        {workshop.name}
                      </h3>
                      <p class="text-sm md:text-md text-primary-700 dark:text-primary-300 line-clamp-4 mb-4">
                        {workshop.description}
                      </p>
                      <span class="inline-block px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200">
                        Book Now
                      </span>
                    </div>
                  </a>
                </Carousel.Slide>
              ))}
            </Carousel.Scroller>
          </Carousel.Root>
        )}

        {/* Events Section with ID */}
        <div id="events" class="text-center mt-16 mb-2">
          <p class="text-2xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto mb-10">
            Book Private & Corporate Events
          </p>

          {/* Event Cards */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-1">
            {/* Corporate Events Card */}
            <a
              href="mailto:hello@earthenvessels.ca"
              target="_blank"
              rel="noopener noreferrer"
              class="group backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden"
            >
              <div class="h-64 w-full overflow-hidden">
                <img
                  src="/images/corporate.png"
                  alt="Corporate Events"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
                  Corporate Events
                </h3>
                <p class="text-primary-700 dark:text-primary-300 mb-4">
                  We offer creative, hands-on clay experiences designed to foster connection, reflection, and collaboration. Perfect for corporate retreats or staff appreciation gatherings. Contact us to discuss what might work for your group.
                </p>
                <span class="inline-block px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200">
                  Book Now
                </span>
              </div>
            </a>

            {/* Private Events Card */}
            <a
              href="mailto:hello@earthenvessels.ca"
              target="_blank"
              rel="noopener noreferrer"
              class="group backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden"
            >
              <div class="h-64 w-full overflow-hidden">
                <img
                  src="/images/private.jpeg"
                  alt="Private Events"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
                  Private Events
                </h3>
                <p class="text-primary-700 dark:text-primary-300 mb-4">
                  Celebrate life's special moments. Gather around our large creative table to celebrate one another, play, and make something beautiful together. Think about hosting your next birthday, book club, family gathering or evening out with friends at earthen vessels. Contact us to discuss the opportunities!
                </p>
                <span class="inline-block px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200">
                  Book Now
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
});