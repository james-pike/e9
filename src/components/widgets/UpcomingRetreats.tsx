import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import {
  LuArrowRight,
  LuCalendarDays,
  LuMapPin,
} from "@qwikest/icons/lucide";

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

export default component$(() => {
  const retreats = useSignal<Retreat[]>([]);
  const loaded = useSignal(false);

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

  return (
    <div class="bg-gradient-to-b from-primary-50/60 via-white to-primary-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <main class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8 py-10 md:py-16">
        <header class="max-w-2xl">
          <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
            Courage &amp; Renewal
          </p>
          <h1 class="mt-2 font-serif text-4xl md:text-5xl text-primary-800 dark:text-primary-100 tracking-tight text-balance">
            Upcoming retreats
          </h1>
          <p class="mt-5 text-lg leading-8 text-primary-700 dark:text-primary-200">
            Each retreat is held in a small circle at our studio. When you find one
            that calls to you, follow through to reserve your place — or reach out
            first if you have a question.
          </p>
        </header>

        {/* Empty state — an invitation, not a dead end */}
        {loaded.value && retreats.value.length === 0 && (
          <div class="mt-12 rounded-2xl border border-dashed border-primary-300 dark:border-primary-700 bg-white/60 dark:bg-gray-800/40 px-7 py-12 text-center">
            <p class="font-serif text-2xl text-primary-800 dark:text-primary-100">
              No retreats are on the calendar just yet
            </p>
            <p class="mx-auto mt-3 max-w-md leading-7 text-primary-600 dark:text-primary-300">
              New dates are added through the seasons. Ask to be told when the next
              one opens, and we will be in touch.
            </p>
            <a
              href="/courage-renewal/register"
              class="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-primary-700"
            >
              Ask to be notified
              <LuArrowRight class="h-4 w-4" />
            </a>
          </div>
        )}

        {/* Retreat agenda */}
        <ul class="mt-12 space-y-8">
          {retreats.value.map((retreat) => (
            <li
              key={retreat.id}
              class="group grid gap-6 rounded-2xl border border-primary-200/70 dark:border-primary-800/60 bg-white/70 dark:bg-gray-800/50 p-5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg md:grid-cols-[13rem_1fr] md:p-6"
            >
              {retreat.image && (
                <div class="overflow-hidden rounded-xl">
                  <Image
                    src={retreat.image}
                    alt={retreat.title}
                    layout="constrained"
                    width={416}
                    height={312}
                    class="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
                  />
                </div>
              )}
              <div class="flex flex-col">
                <div class="flex flex-wrap items-center gap-x-5 gap-y-1 text-primary-600 dark:text-primary-300">
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

                <h2 class="mt-3 font-serif text-2xl text-primary-800 dark:text-primary-100">
                  {retreat.title}
                </h2>
                {retreat.subtitle && (
                  <p class="mt-1 font-serif italic text-primary-500 dark:text-primary-400">
                    {retreat.subtitle}
                  </p>
                )}
                <p class="mt-3 leading-7 text-primary-600 dark:text-primary-300">
                  {retreat.description}
                </p>

                <div class="mt-auto pt-5">
                  <a
                    href={retreat.url || "/courage-renewal/register"}
                    target={retreat.url?.startsWith("http") ? "_blank" : undefined}
                    rel={retreat.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                    class="inline-flex items-center gap-2 rounded-xl bg-secondary-500 px-5 py-2.5 font-medium text-white shadow-sm transition-all duration-300 hover:bg-secondary-600 hover:shadow-md"
                  >
                    Reserve a place
                    <LuArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
});
