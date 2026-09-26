import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { LuArrowRight, LuCalendarDays, LuMapPin, LuChevronLeft, LuChevronRight } from "@qwikest/icons/lucide";

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
 * Alternative display #2 — "Showcase".
 * One wide card at a time with a cross-fade (not a horizontal slide), auto-advancing.
 * Prev/next arrows, a position counter and dots. Slower, more deliberate rhythm.
 */
export default component$(() => {
  const retreats = useSignal<Retreat[]>([]);
  const loaded = useSignal(false);
  const index = useSignal(0);
  const paused = useSignal(false);

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

  // Auto-advance with a gentle cross-fade; pauses on hover.
  useVisibleTask$(({ cleanup }) => {
    const timer = setInterval(() => {
      if (!paused.value && retreats.value.length > 1) {
        index.value = (index.value + 1) % retreats.value.length;
      }
    }, 6000);
    cleanup(() => clearInterval(timer));
  });

  const go$ = $((next: number) => {
    const total = retreats.value.length;
    if (total === 0) return;
    index.value = (next + total) % total;
  });

  const bookButtonClass =
    "inline-flex items-center gap-2 rounded-xl bg-secondary-500 px-5 py-2.5 font-medium text-white shadow-sm transition-all duration-300 hover:bg-secondary-600 hover:shadow-md";
  const arrowButtonClass =
    "w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 opacity-75 hover:opacity-100 text-primary-600";

  return (
    <div class="px-1">
      {/* Header */}
      <div class="mt-0 mb-6">
        <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
          Another way to browse · Showcase
        </p>
        <h2 class="mt-1 font-bold !text-4xl md:!text-4.5xl">
          <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
            Upcoming Retreats
          </span>
        </h2>
        <p class="mt-3 text-primary-700 dark:text-primary-300 max-w-3xl text-xl md:text-2xl">
          One retreat at a time, fading gently from one to the next
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
          <a href="/courage-renewal/register" class={`mt-6 ${bookButtonClass}`}>
            Ask to be notified
            <LuArrowRight class="h-4 w-4" />
          </a>
        </div>
      ) : (
        <div
          onMouseEnter$={() => (paused.value = true)}
          onMouseLeave$={() => (paused.value = false)}
        >
          {/* Stage — cards stacked; the active one fades in */}
          <div class="relative min-h-[22rem] md:min-h-[20rem]">
            {retreats.value.map((retreat, i) => (
              <div
                key={retreat.id}
                class={`transition-opacity duration-700 ease-in-out ${
                  i === index.value
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-0 opacity-0"
                }`}
                aria-hidden={i === index.value ? "false" : "true"}
              >
                <div class="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary-200 dark:border-secondary-700 bg-white/45 backdrop-blur-sm shadow-md md:flex-row">
                  {retreat.image && (
                    <div class="md:w-[45%] overflow-hidden">
                      <img
                        src={retreat.image}
                        alt={retreat.title}
                        class="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
                      />
                    </div>
                  )}
                  <div class="flex flex-1 flex-col p-6 md:p-8">
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
                        href={retreat.url || "/courage-renewal/register"}
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
              </div>
            ))}
          </div>

          {/* Controls: prev / dots + counter / next */}
          <div class="mt-6 flex items-center justify-between gap-4">
            <button type="button" class={arrowButtonClass} aria-label="Previous retreat" onClick$={() => go$(index.value - 1)}>
              <LuChevronLeft class="h-5 w-5" />
            </button>

            <div class="flex items-center gap-4">
              <div class="flex gap-2">
                {retreats.value.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to retreat ${i + 1}`}
                    onClick$={() => go$(i)}
                    class={`h-2.5 rounded-full transition-all duration-300 ${
                      i === index.value ? "w-6 bg-secondary-500" : "w-2.5 bg-primary-300 hover:bg-primary-400"
                    }`}
                  />
                ))}
              </div>
              <span class="text-sm font-medium tabular-nums text-primary-600 dark:text-primary-300">
                {index.value + 1} / {retreats.value.length}
              </span>
            </div>

            <button type="button" class={arrowButtonClass} aria-label="Next retreat" onClick$={() => go$(index.value + 1)}>
              <LuChevronRight class="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
