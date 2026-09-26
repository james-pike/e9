import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import UpcomingRetreats from "~/components/widgets/UpcomingRetreats";
import { SITE } from "~/config.mjs";

export default component$(() => {
  return <UpcomingRetreats />;
});

export const head: DocumentHead = {
  title: `${SITE.title} - Upcoming Retreats`,
  meta: [
    {
      name: "description",
      content:
        "Upcoming Courage & Renewal retreats at earthen vessels — dates, locations, and how to reserve your place.",
    },
  ],
};
