import { component$, useTask$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  LuArrowRight,
  LuCalendarDays,
  LuSprout,
  LuEar,
  LuHeartHandshake,
  LuMoon,
  LuUsers,
  LuLeaf,
  LuBuilding2,
  LuCompass,
  LuMapPin,
  LuMail,
  LuQuote,
} from "@qwikest/icons/lucide";
import RetreatsSpotlight from "~/components/widgets/RetreatsSpotlight";

// The Touchstones are the real practice that holds a Circle of Trust in the
// Courage & Renewal tradition. Presented here as an invitation, not a checklist.
const touchstones = [
  {
    icon: LuHeartHandshake,
    title: "Come as you are, willing to grow",
    text: "There is nothing to prove and no one to impress. You are welcome exactly as you arrive, whole and unfinished at once.",
  },
  {
    icon: LuEar,
    title: "Listen without fixing",
    text: "We set aside the urge to advise, correct, or set one another straight. We simply make room for what wants to be said.",
  },
  {
    icon: LuSprout,
    title: "Turn to wonder",
    text: "When we feel resistance or judgement rise, we ask instead: I wonder what brought them to this? I wonder what they are feeling?",
  },
  {
    icon: LuMoon,
    title: "Let silence do its quiet work",
    text: "Silence is a gift we give ourselves and each other — not an absence to fill, but a space where the inner voice can be heard.",
  },
];

// The different ways a person or group can gather with us. This is the heart of
// "twice as many things to choose from" — a spread of retreat shapes.
const waysToGather = [
  {
    icon: LuUsers,
    title: "Weekend Circle of Trust",
    text: "Two unhurried days in a small circle — the fullest way to slow down, listen inward, and let a real question surface.",
  },
  {
    icon: LuLeaf,
    title: "A Day of Renewal",
    text: "A single quiet day to set the work down and return to what matters. Gentle enough to begin with, deep enough to remember.",
  },
  {
    icon: LuBuilding2,
    title: "Private & Team Circles",
    text: "A retreat shaped for your staff, board, or community — held privately at our studio or brought to your own space.",
  },
  {
    icon: LuCalendarDays,
    title: "Seasonal Retreats",
    text: "Circles that turn with the year — autumn's letting go, winter's rest, spring's beginnings — each with its own invitation.",
  },
  {
    icon: LuHeartHandshake,
    title: "For Caregivers & Clergy",
    text: "For those who spend their days holding space for others. A place to be held for a change, and to remember why you began.",
  },
  {
    icon: LuSprout,
    title: "Guided Reflection with Clay",
    text: "An introductory evening at the wheel and the table — reflection and clay together, no experience needed in either.",
  },
];


const whoItsFor = [
  { icon: LuCompass, title: "Anyone at a threshold", text: "A change of season in your work or life, and a decision worth listening your way into." },
  { icon: LuHeartHandshake, title: "Helpers & caregivers", text: "Nurses, teachers, clergy, therapists — those who give so much they forget to be filled." },
  { icon: LuUsers, title: "Teams & communities", text: "Groups longing to trust one another more honestly, and to work from a steadier centre." },
  { icon: LuLeaf, title: "Seekers of quiet", text: "Anyone simply weary of the noise, wanting a day that asks nothing but your presence." },
];

const retreatFaqs = [
  {
    q: "Do I need any experience with clay?",
    a: "None at all. The clay is here as a companion to reflection, not a skill to master. Everything you need is provided, and a facilitator is always close by.",
  },
  {
    q: "How large is a retreat?",
    a: "Circles are kept intentionally small — usually eight to twelve people — so there is room for everyone to be seen and heard.",
  },
  {
    q: "What does a retreat cost?",
    a: "It varies by length and format. Reach out and we'll share current dates and pricing, and talk through what might suit you or your group.",
  },
  {
    q: "Can you hold a private retreat for my group?",
    a: "Yes. We regularly host private circles for teams, boards, and communities — at our studio, or brought to a space of your own.",
  },
  {
    q: "Will I have to share or talk in the circle?",
    a: "Never. You are always free to speak or to stay quiet — silence is as welcome as words here. Nothing is fixed, no advice is given, and everything you offer is simply received.",
  },
  {
    q: "What should I bring?",
    a: "Only yourself and comfortable clothes you don't mind getting a little clay on. Everything else — materials, tools, tea, and time — is provided.",
  },
];

export default component$(() => {
  const loc = useLocation();

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

  // Shared style tokens, drawn from the studio homepage so this page feels of a piece.
  const headingGradient =
    "bg-gradient-to-r from-secondary-800 via-tertiary-600 to-primary-600 bg-clip-text text-transparent";
  const card =
    "rounded-2xl border-2 border-primary-200 dark:border-primary-800/60 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:border-secondary-300 hover:bg-white/60";

  return (
    <div class="relative overflow-hidden">
      {/* Ambient floating shapes, echoing the homepage */}
      <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div class="absolute -top-16 left-[8%] h-72 w-72 rounded-full bg-secondary-200/30 blur-3xl animate-float"></div>
        <div class="absolute top-[26%] right-[4%] h-80 w-80 rounded-full bg-primary-200/40 blur-3xl animate-float"></div>
        <div class="absolute top-[62%] left-[2%] h-64 w-64 rounded-full bg-tertiary-200/40 blur-3xl animate-float"></div>
        <div class="absolute bottom-[6%] right-[12%] h-72 w-72 rounded-full bg-secondary-200/25 blur-3xl animate-float"></div>
      </div>

      <main class="relative z-10 mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
        {/* ─────────────────────────  HERO  ───────────────────────── */}
        <section class="grid items-center gap-10 pt-6 pb-12 md:pt-10 md:pb-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div class="lg:pl-6">
            <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300 md:text-xl">
              Retreats with earthen vessels, in the tradition of
            </p>
            <h1 class="mt-2 text-4xl font-bold leading-[1.08] tracking-tight text-balance md:text-6xl">
              <span class={headingGradient}>The Center for Courage&nbsp;&amp; Renewal</span>
            </h1>
            <p class="mt-6 max-w-[38rem] text-lg leading-8 text-primary-800 dark:text-primary-200 md:text-xl">
              Quiet retreats for the inner life — space to slow down, listen to the
              voice within, and remember what matters. Held at our studio, guided by a
              facilitator prepared through the Center for Courage&nbsp;&amp; Renewal,
              and grounded, as always, in the honest company of clay.
            </p>
          </div>

          {/* Hero image */}
          <div class="relative">
            <div class="absolute -inset-3 -rotate-2 rounded-[2rem] bg-gradient-to-tr from-secondary-200/50 via-tertiary-200/40 to-primary-200/50 blur-md" aria-hidden="true"></div>
            <div class="relative overflow-hidden rounded-[1.75rem] border-2 border-white/70 shadow-xl">
              <Image
                src="/images/space.jpeg"
                alt="The earthen vessels studio, set for a retreat"
                layout="constrained"
                width={640}
                height={520}
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ─────────────────  UPCOMING RETREATS  ───────────────── */}
        <section
          id="upcoming"
          class="relative scroll-mt-24 rounded-3xl border-2 border-primary-100 bg-white/40 p-5 backdrop-blur-sm dark:border-primary-800/50 dark:bg-gray-800/30 md:p-8"
        >
          <RetreatsSpotlight />
          {/* Soft edge mask so the panel blends into the page */}
          <div
            class="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ boxShadow: "inset 0 0 50px 25px rgba(227, 231, 227, 0.8)" }}
            aria-hidden="true"
          ></div>
        </section>

        {/* ─────────────────  QUOTE BAND  ───────────────── */}
        <section class="relative my-4 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 px-7 py-14 text-center md:px-16 md:py-16">
          <LuQuote class="mx-auto h-10 w-10 text-tertiary-300/80" />
          <figure class="mx-auto mt-4 max-w-3xl">
            <blockquote class="font-serif text-2xl leading-relaxed text-white text-balance md:text-3xl">
              “Before you tell your life what you intend to do with it, listen for
              what it intends to do with you.”
            </blockquote>
            <figcaption class="mt-6 text-primary-200">
              Parker J. Palmer, founder of the Center for Courage &amp; Renewal
            </figcaption>
          </figure>
        </section>

        {/* ─────────────────  WAYS TO GATHER  ───────────────── */}
        <section id="ways-to-gather" class="scroll-mt-24 py-14 md:py-20">
          <div class="mx-auto max-w-2xl text-center">
            <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
              Ways to gather
            </p>
            <h2 class="mt-1 text-3xl font-bold tracking-tight md:text-4.5xl">
              <span class={headingGradient}>Find the retreat that calls to you</span>
            </h2>
            <p class="mt-4 text-lg leading-8 text-primary-700 dark:text-primary-200">
              However much time you have, and whoever you are bringing with you, there
              is a shape of retreat to meet you where you are.
            </p>
          </div>

          <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {waysToGather.map((w) => (
              <li key={w.title} class={`${card} p-7`}>
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-100 to-tertiary-100 text-secondary-600 dark:from-secondary-900/40 dark:to-tertiary-900/40">
                  <w.icon class="h-6 w-6" />
                </div>
                <h3 class="mt-5 font-serif text-xl text-primary-800 dark:text-primary-100">
                  {w.title}
                </h3>
                <p class="mt-2 leading-7 text-primary-600 dark:text-primary-300">{w.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ─────────────────  THE APPROACH (TOUCHSTONES)  ───────────────── */}
        <section id="approach" class="scroll-mt-24 border-t border-primary-200/70 py-14 dark:border-primary-800/60 md:py-20">
          <div class="max-w-2xl">
            <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
              The approach
            </p>
            <h2 class="mt-1 text-3xl font-bold tracking-tight md:text-4.5xl">
              <span class={headingGradient}>A circle of trust, held with care</span>
            </h2>
            <p class="mt-5 text-lg leading-8 text-primary-700 dark:text-primary-200">
              A retreat is not a workshop with a lesson to learn. It is a circle of
              trust, held by a few simple touchstones that make it safe to show up
              honestly and leave a little more whole. These are ours.
            </p>
          </div>

          <ul class="mt-10 grid gap-6 sm:grid-cols-2">
            {touchstones.map((t) => (
              <li key={t.title} class={`${card} p-7`}>
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-tertiary-100 to-primary-100 text-tertiary-600 dark:from-tertiary-900/40 dark:to-primary-900/40">
                  <t.icon class="h-6 w-6" />
                </div>
                <h3 class="mt-5 font-serif text-xl text-primary-800 dark:text-primary-100">
                  {t.title}
                </h3>
                <p class="mt-2 leading-7 text-primary-600 dark:text-primary-300">{t.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ─────────────────  WHY CLAY  ───────────────── */}
        <section id="the-clay" class="scroll-mt-24 grid items-center gap-10 border-t border-primary-200/70 py-14 dark:border-primary-800/60 md:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
              Why clay
            </p>
            <h2 class="mt-1 text-3xl font-bold tracking-tight md:text-4.5xl">
              <span class={headingGradient}>A third thing to think alongside</span>
            </h2>
            <p class="mt-5 text-lg leading-8 text-primary-700 dark:text-primary-200">
              In the Courage &amp; Renewal tradition, a poem or a story is often used
              as a “third thing” — something to gather around so the conversation
              never bears down too directly on any one person. Here, that third thing
              is the clay.
            </p>
            <p class="mt-4 text-lg leading-8 text-primary-700 dark:text-primary-200">
              Hands busy at the wheel or the table, the mind loosens. Truths that
              resist being spoken find their way out sideways, in good time. You need
              no skill for this — only willingness to begin.
            </p>
          </div>
          <div class="relative">
            <div class="absolute -inset-3 -rotate-2 rounded-[2rem] bg-gradient-to-tr from-tertiary-200/50 to-secondary-200/50 blur-md" aria-hidden="true"></div>
            <div class="relative overflow-hidden rounded-[1.75rem] border-2 border-white/70 shadow-xl">
              <Image
                src="/images/g3.jpeg"
                alt="Hands shaping clay at the studio"
                layout="constrained"
                width={620}
                height={480}
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ─────────────────  WHO IT'S FOR  ───────────────── */}
        <section id="who-its-for" class="scroll-mt-24 border-t border-primary-200/70 py-14 dark:border-primary-800/60 md:py-20">
          <div class="mx-auto max-w-2xl text-center">
            <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
              Who it's for
            </p>
            <h2 class="mt-1 text-3xl font-bold tracking-tight md:text-4.5xl">
              <span class={headingGradient}>You do not have to arrive with a reason</span>
            </h2>
            <p class="mt-4 text-lg leading-8 text-primary-700 dark:text-primary-200">
              People come to these circles from all directions. You are welcome here
              whether you know exactly why you've come, or not at all.
            </p>
          </div>

          <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoItsFor.map((w) => (
              <li key={w.title} class={`${card} p-6 text-center`}>
                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 text-primary-600 dark:from-primary-900/40 dark:to-secondary-900/40">
                  <w.icon class="h-7 w-7" />
                </div>
                <h3 class="mt-4 font-serif text-lg text-primary-800 dark:text-primary-100">{w.title}</h3>
                <p class="mt-1.5 text-sm leading-6 text-primary-600 dark:text-primary-300">{w.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ─────────────────  FAQ  ───────────────── */}
        <section id="faq" class="scroll-mt-24 border-t border-primary-200/70 py-14 dark:border-primary-800/60 md:py-20">
          <div class="max-w-2xl">
            <p class="font-serif italic text-lg text-tertiary-600 dark:text-tertiary-300">
              Questions
            </p>
            <h2 class="mt-1 text-3xl font-bold tracking-tight md:text-4.5xl">
              <span class={headingGradient}>Before you come</span>
            </h2>
          </div>

          <div class="mt-8 grid gap-3 md:grid-cols-2 md:items-start">
            {retreatFaqs.map((f) => (
              <details key={f.q} class={`${card} group p-0`}>
                <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-serif text-lg text-primary-800 dark:text-primary-100">
                  {f.q}
                  <LuArrowRight class="h-5 w-5 flex-shrink-0 text-secondary-500 transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p class="px-6 pb-6 leading-7 text-primary-600 dark:text-primary-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ─────────────────  CLOSING CTA  ───────────────── */}
        <section class="pb-20">
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 px-7 py-14 text-center md:px-16 md:py-16">
            <div class="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-tertiary-400/15 blur-2xl" aria-hidden="true"></div>
            <div class="pointer-events-none absolute -bottom-12 -left-8 h-56 w-56 rounded-full bg-secondary-400/15 blur-2xl" aria-hidden="true"></div>
            <h2 class="relative font-serif text-3xl text-white text-balance md:text-4xl">
              A retreat begins with a single quiet step
            </h2>
            <p class="relative mx-auto mt-4 max-w-xl text-lg leading-8 text-primary-100">
              See what is coming up, or reach out to ask whether a retreat might be
              right for you or your group.
            </p>
            <div class="relative mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/retreats/retreats"
                class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-lg font-medium text-primary-800 shadow-md transition-all duration-300 hover:bg-primary-50 hover:shadow-lg"
              >
                Upcoming retreats
                <LuCalendarDays class="h-5 w-5" />
              </a>
              <a
                href="/retreats/register"
                class="inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                Ask a question
                <LuMail class="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
