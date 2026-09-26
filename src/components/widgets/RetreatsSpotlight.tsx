import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { LuArrowRight, LuCalendarDays, LuMapPin } from "@qwikest/icons/lucide";

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

/**
 * Alternative display #1 — "Spotlight".
 * One retreat shown large; a rail of thumbnails lets you jump between them.
 * User-driven (no auto-advance), good when there are only a handful of dates.
 */
export default component$(() => {
  const retreats = useSignal<Retreat[]>([]);
  const loaded = useSignal(false);
  const activeIndex = useSignal(0);

  useVisibleTask$(async () => {
    try {
      const response = await fetch("/api/retreats");
      if (response.ok) {
        retreats.value = await response.json();
      }
    } catch (error) {
      console.error("Error fetching retreats:", error);
    } finally {
      loaded.value = true;
    }
  }, { strategy: "document-ready" });

  const select$ = $((index: number) => {
    activeIndex.value = index;
  });

  const bookButtonClass =
    "inline-flex items-center gap-2 rounded-xl bg-secondary-500 px-5 py-2.5 font-medium text-white shadow-sm transition-all duration-300 hover:bg-secondary-600 hover:shadow-md";

  return (
    <div class="px-1">
      {/* Header */}
      <div class="mt-0 mb-6">
        <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
          Another way to browse · Spotlight
        </p>
        <h2 class="mt-1 font-bold !text-4xl md:!text-4.5xl">
          <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
            Upcoming Retreats
          </span>
        </h2>
        <p class="mt-3 text-primary-700 dark:text-primary-300 max-w-3xl text-xl md:text-2xl">
          One at a time, in focus — tap a date to bring it forward
        </p>
      </div>

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
          <a href="/retreats/register" class={`mt-6 ${bookButtonClass}`}>
            Ask to be notified
            <LuArrowRight class="h-4 w-4" />
          </a>
        </div>
      ) : (
        <div class="grid gap-6 lg:grid-cols-[1fr_18rem]">
          {/* Featured retreat */}
          {(() => {
            const retreat = retreats.value[activeIndex.value] ?? retreats.value[0];
            return (
              <div class="group flex flex-col overflow-hidden rounded-2xl border-2 border-primary-200 dark:border-secondary-700 bg-white/45 backdrop-blur-sm shadow-md md:flex-row">
                {retreat.image && (
                  <div class="md:w-1/2 overflow-hidden">
                    <img
                      src={retreat.image}
                      alt={retreat.title}
                      class="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
                    />
                  </div>
                )}
                <div class="flex flex-1 flex-col p-6 md:p-7">
                  <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary-600 dark:text-primary-300">
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
                  <h3 class="mt-3 font-serif text-2xl md:text-3xl text-secondary-900 dark:text-secondary-100">
                    {retreat.title}
                  </h3>
                  {retreat.subtitle && (
                    <p class="mt-1 font-serif italic text-primary-500 dark:text-primary-400">
                      {retreat.subtitle}
                    </p>
                  )}
                  <p class="mt-3 leading-7 text-primary-700 dark:text-primary-300">
                    {retreat.description}
                  </p>
                  <div class="mt-auto pt-6">
                    <a
                      href={retreat.url || "/retreats/register"}
                      target={retreat.url?.startsWith("http") ? "_blank" : undefined}
                      rel={retreat.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                      class={bookButtonClass}
                    >
                      Reserve a place
                      <LuArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Thumbnail rail */}
          <div class="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {retreats.value.map((retreat, index) => (
              <button
                key={retreat.id}
                type="button"
                onClick$={() => select$(index)}
                class={`group flex w-52 shrink-0 items-center gap-3 rounded-xl border-2 p-2 text-left transition-all duration-200 lg:w-full ${
                  index === activeIndex.value
                    ? "border-secondary-400 bg-white/70 shadow-sm dark:bg-gray-800/60"
                    : "border-transparent bg-white/30 hover:border-primary-200 hover:bg-white/50 dark:bg-gray-800/30"
                }`}
              >
                {retreat.image && (
                  <img
                    src={retreat.image}
                    alt={retreat.title}
                    class="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />
                )}
                <span class="min-w-0">
                  <span class="block truncate text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                    {retreat.title}
                  </span>
                  {retreat.dateLabel && (
                    <span class="block truncate text-xs text-primary-600 dark:text-primary-300">
                      {retreat.dateLabel}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
