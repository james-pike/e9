import { component$, useSignal, useVisibleTask$, useTask$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { getClasses } from '~/lib/turso';
import { SITE } from "~/config.mjs";

interface Workshop {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isActive?: boolean;
}

export const useClassesData = routeLoader$(async () => {
  try {
    const classes = await getClasses();
    return classes
      .map(classItem => ({
        id: classItem.id?.toString() || '',
        name: classItem.name?.toString() || '',
        description: classItem.description?.toString() || '',
        image: classItem.image?.toString() || '',
        url: classItem.url?.toString() || '',
        isActive: classItem.isActive === 1,
      }))
      .filter(classItem => classItem.isActive);
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
});

export default component$(() => {
  const classesData = useClassesData();
  const workshops = useSignal<Workshop[]>([]);
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

  // Load classes data
  useVisibleTask$(() => {
    workshops.value = classesData.value;
  });

  // Show loading state if no workshops yet
  if (workshops.value.length === 0 && classesData.value.length === 0) {
    return (
      <section class="relative overflow-hidden py-12 md:py-16">
        <div class="relative max-w-6xl mx-auto px-5 sm:px-6">
          <div class="text-center py-12">
            <p class="text-primary-700 dark:text-primary-300 text-lg">Loading classes...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Grid Section */}
      <section class="relative overflow-hidden py-12 md:py-16">
        <div class="relative max-w-5xl mx-auto px-5 sm:px-6">
          {/* Header and Subtitle */}
          <div class="text-center mb-12">
            <h1 class="!text-5xl md:!text-5xl xdxd font-bold mb-6">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
                Our Offerings
              </span>
            </h1>
            <p class="text-xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
              Browse our complete collection of workshops and courses. We offer a range of experiences tailored to all levels.
            </p>
          </div>

          {workshops.value.length === 0 ? (
            <div class="text-center py-12">
              <p class="text-primary-700 dark:text-primary-300 text-lg">Loading Classes...</p>
            </div>
          ) : (
            <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {workshops.value.map((workshop) => (
                <a
                  key={workshop.id}
                  href={workshop.url || "https://bookeo.com/earthenvessels"}
                  target="_blank"
                  rel="noopener noreferrer"
                  class={[
                    "break-inside-avoid group backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:border-secondary-200 hover:bg-white/45 cursor-pointer block mb-6",
                    "bg-white/35 border-primary-200 dark:border-secondary-700 overflow-hidden",
                  ]}
                  style={{
                    transitionProperty:
                      "transform, opacity, margin, box-shadow, background-color, border-color",
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Book ${workshop.name}`}
                >
                  {/* Image */}
                  {workshop.image && (
                    <div
                      class="h-40 w-full bg-gray-100 overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${workshop.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      role="img"
                      aria-label={workshop.name}
                    />
                  )}

                  {/* Info */}
                  <div class="flex flex-col p-4">
                    <h3 class="text-base font-bold text-secondary-900 dark:text-secondary-100 text-center mb-3 line-clamp-2">
                      {workshop.name}
                    </h3>

                    {/* Description */}
                    <p class="text-primary-700 dark:text-primary-300 text-sm text-center mb-4 line-clamp-5">
                      {workshop.description}
                    </p>

                    {/* Book Button */}
                    <span
                      class="inline-block px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 text-center"
                      role="button"
                      aria-label={`Book ${workshop.name}`}
                    >
                      Book Now
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" class="relative overflow-hidden py-12 md:py-16">
        <div class="relative max-w-5xl mx-auto px-5 sm:px-6">
          <div class="text-center mb-10">
            <p class="text-2xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
              Book Private & Corporate Events
            </p>
          </div>

          {/* Event Cards */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - Classes`,
  meta: [
    {
      name: "description",
      content:
        "Discover our community partners and learn about their role in fostering connection and creativity.",
    },
  ],
};