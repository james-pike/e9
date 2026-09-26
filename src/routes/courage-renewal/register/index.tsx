import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { LuMail, LuMapPin, LuArrowRight } from "@qwikest/icons/lucide";
import { SITE } from "~/config.mjs";

const INQUIRY_EMAIL = "hello@earthenvessels.ca";
const mailto = (subject: string, body: string) =>
  `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default component$(() => {
  return (
    <div class="bg-gradient-to-b from-primary-50/60 via-white to-primary-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <main class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8 py-10 md:py-16">
        <header class="max-w-2xl">
          <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
            Courage &amp; Renewal
          </p>
          <h1 class="mt-2 font-serif text-4xl md:text-5xl text-primary-800 dark:text-primary-100 tracking-tight text-balance">
            Ask about a retreat
          </h1>
          <p class="mt-5 text-lg leading-8 text-primary-700 dark:text-primary-200">
            Whether you are drawn to a coming retreat, hoping to hear when the next
            one opens, or wondering about a private circle for your team or
            community — write to us. There is no wrong question, and no obligation in
            asking.
          </p>
        </header>

        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          {/* Reserve / join a listed retreat */}
          <a
            href={mailto(
              "Courage & Renewal retreat inquiry",
              "Hello,\n\nI'd like to ask about an upcoming retreat.\n\nMy name:\nThe retreat I'm interested in:\nAnything you'd like us to know:\n\nThank you,",
            )}
            class="group flex flex-col rounded-2xl border border-primary-200/70 dark:border-primary-800/60 bg-white/70 dark:bg-gray-800/50 p-7 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <LuMail class="h-7 w-7 text-tertiary-500 dark:text-tertiary-300" />
            <h2 class="mt-4 font-serif text-2xl text-primary-800 dark:text-primary-100">
              Reserve or ask about a retreat
            </h2>
            <p class="mt-2 leading-7 text-primary-600 dark:text-primary-300">
              We'll reply with details and next steps.
            </p>
            <span class="mt-5 inline-flex items-center gap-2 font-medium text-primary-700 dark:text-primary-200">
              Write to us
              <LuArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>

          {/* Notify me / mailing list */}
          <a
            href={mailto(
              "Please tell me about new retreats",
              "Hello,\n\nPlease add me to the list to hear when new Courage & Renewal retreats are announced.\n\nMy name:\nMy email:\n\nThank you,",
            )}
            class="group flex flex-col rounded-2xl border border-primary-200/70 dark:border-primary-800/60 bg-white/70 dark:bg-gray-800/50 p-7 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <LuMail class="h-7 w-7 text-tertiary-500 dark:text-tertiary-300" />
            <h2 class="mt-4 font-serif text-2xl text-primary-800 dark:text-primary-100">
              Tell me when the next one opens
            </h2>
            <p class="mt-2 leading-7 text-primary-600 dark:text-primary-300">
              We'll let you know as dates are added through the seasons.
            </p>
            <span class="mt-5 inline-flex items-center gap-2 font-medium text-primary-700 dark:text-primary-200">
              Join the list
              <LuArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        {/* Direct details */}
        <div class="mt-10 rounded-2xl bg-primary-100/60 dark:bg-primary-900/30 p-7">
          <p class="text-primary-700 dark:text-primary-200">
            Prefer to reach us directly?
          </p>
          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <a
              href={`mailto:${INQUIRY_EMAIL}`}
              class="inline-flex items-center gap-2 font-medium text-primary-800 dark:text-primary-100 underline-offset-4 hover:underline"
            >
              <LuMail class="h-5 w-5 text-tertiary-500" />
              {INQUIRY_EMAIL}
            </a>
            <a
              href="https://www.google.com/maps/place/36+Rosemount+Ave,+Ottawa,+ON+K1Y+1P4/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 font-medium text-primary-800 dark:text-primary-100 underline-offset-4 hover:underline"
            >
              <LuMapPin class="h-5 w-5 text-tertiary-500" />
              36 Rosemount Ave, Ottawa
            </a>
          </div>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - Ask About a Retreat`,
  meta: [
    {
      name: "description",
      content:
        "Ask about upcoming Courage & Renewal retreats at earthen vessels, request a private circle, or join the list for new dates.",
    },
  ],
};
