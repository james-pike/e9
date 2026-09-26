import { component$ } from "@builder.io/qwik";

export default component$(() => {
  // Shared button style, kept consistent with the offerings carousel.
  const bookButtonClass =
    "shrink-0 min-w-[90px] px-4 py-1.5 text-sm font-medium text-white text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 whitespace-nowrap";

  return (
    <div class="p-5 md:px-8 lg:px-16 max-w-7xl md:mx-auto">
      <div id="events" class="text-center mt-12 mb-12">
        <p class="text-xl md:text-2xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto mb-8">
          Book Private & Corporate Events
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                class="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
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
  );
});
