import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import CourageRenewal from "~/components/widgets/CourageRenewal";
import { SITE } from "~/config.mjs";

export default component$(() => {
  return <CourageRenewal />;
});

export const head: DocumentHead = {
  title: `${SITE.title} - Courage & Renewal Retreats`,
  meta: [
    {
      name: "description",
      content:
        "Quiet retreats for the inner life at earthen vessels, held in the tradition of the Center for Courage & Renewal.",
    },
  ],
};
