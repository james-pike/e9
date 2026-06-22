// src/components/widgets/Team.tsx
import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
 {
  name: "Ginger",
  role: "Facilitator",
  description: "Ginger took her first pottery course over 35 years ago and was immediately drawn to the tactile joy of shaping clay. Over time, she shifted from making things to discovering in clay a grounding and fulfilling experience of connection - to self, to others and to the earth.\n\nThe vision for earthen vessels was seeded by a small pottery community in Venezuela. Years later, that inspiration grew to the creation of the first ‘Touch the Earth' workshops. Ginger blends clay workshops with her studies at The Centre for Courage and Renewal - a global community founded by Parker J Palmer, whose work centers on living and leading with integrity. In earthen vessels, clay becomes a practice of slowing down, allowing creativity to open up new possibilities.\n\nIn 2012 Ginger also founded Hintonburg Pottery, rooted in the local community, a studio that welcomes children and adults and offers ceramic artists a place to showcase their work.",
  image: "/images/ginger.webp"
},
  {
    name: "Mary",
    role: "Facilitator",
    description:
      "Mary's journey with clay began in the embrace of family, surrounded by mountains, forests, and lakes. Over the years, this practice deepened into a passion—not just for creativity, but for sharing it with others. She is driven by a desire to connect hearts and nurture community well-being. At earthen vessels, she has found both a creative home and a space to pour her love for community. As she shapes clay, she draws inspiration from the wonder of the natural world and the tertiary’s generous gifts. Mary's enthusiasm and strong skills bring added energy to earthen vessels where participants feel inspired, supported and empowered in their creative exploration.",
    image: "/images/mary.webp",
  },
  {
    name: "Michelle",
    role: "Facilitator",
    description:
      "Michelle’s journey with clay began in 2002, and since then, she has immersed herself in the craft—taking countless courses, working as a studio potter, and teaching at Hintonburg Pottery. Now, she brings her passion for clay to earthen vessels as a facilitator. With over 30 years in education as a teacher, guidance counselor, and school principal, Michelle has dedicated her career to supporting growth and well-being. She holds a Master’s Degree in Counselling from the University of Ottawa and a Certificate in Positive Psychology from Wilfrid Laurier University. Her experience leading wellness initiatives in schools, combined with her love of pottery, has led her to earthen vessels, where she shares the joy of clay as a source of grounding, meditation, renewal, and fun.",
    image: "/images/michelle.webp",
  },
  {
    name: "Diane",
    role: "Facilitator",
    description:
      "Diane Black is a Kingston artist who began her training in the field of book illustration and spent many years in the commercial art world. She now has a full time studio practice with a focus on figurative clay sculpture, painting, drawing and teaching. Diane’s work is exhibited in Galleries and shows throughout Ontario and can be found in private collections both in Canada and internationally. She teaches workshops in drawing, painting and sculpture and has coordinated art workshops which attract participants internationally. In addition to her regular studio practice, Diane runs an art program for adults with disabilities.",
    image: "/images/diane.webp",
  },
  {
    name: "Sydney",
    role: "Facilitator",
    description:
      "Sydney’s connection to clay began in childhood, when she took her first pottery class and instantly fell in love with the process. Since then, clay has remained a constant creative outlet—something she returns to for both expression and inspiration.\n\nShe is currently studying Community Design at Dalhousie University, where she explores the relationship between creativity, space, and community. Alongside her studies, she has taught the Kids Clay Camps at Hintonburg Pottery. Sydney now joins earthen vessels studio as a facilitator sharing her love of pottery with kids and helping them build confidence through hands-on making.\n\nBringing a thoughtful and creative approach to her work, Sydney is passionate about creating welcoming spaces where kids can explore, experiment, and enjoy the process of working with clay.",
    image: "/images/Sydney.jpg",
  },
  {
    name: "Natalie",
    role: "Facilitator",
    description:
      "With over 25 years of experience as an artist, educator, and professional dance performer, Natalie brings a unique blend of creativity, craftsmanship, and embodied wisdom to her work with clay.\n\nHer diverse background includes goldsmithing, yoga and dance instruction, international teaching and performance. She has inspired thousands of students through creative and movement-based education, teaching in more than 250 schools throughout the Ottawa region and leading workshops around the world.\n\nAs a certified life coach trained in the La Chiara Method of Energy Medicine and Somatic Healing, Natalie integrates mindfulness, personal transformation, and the mind-body connection into her artistic practice. For her, clay is more than a medium, it is a pathway to creativity, presence, and connection.\n\nThrough her artwork and teaching, Natalie creates a welcoming space where people can explore their creativity, develop new skills, and experience the grounding, transformative power of working with clay.",
    image: "/images/Natalie.jpg",
  },
];

const ROLE_GRADIENTS: Record<string, string> = {
  Facilitator: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 border-primary-300 shadow-primary-200/50',
  Default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 shadow-gray-200/50',
};

const getRoleColor = (role: string) => {
  return ROLE_GRADIENTS[role] || ROLE_GRADIENTS.Default;
};

export default component$(() => {
  const expandedMember = useSignal<string | null>(null);

  return (
    <section class="relative overflow-hidden py-12 md:py-16">
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>

      <div class="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div class="text-center mb-12">
          <h1 class="!text-5xl md:text-6xl xdxd font-bold mb-6">
            <span class="bg-gradient-to-r from-secondary-800 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              Hello! Kwey! Bonjour!
            </span>
          </h1>
          <p class="text-xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
With skilled hands and creative  presence, our facilitators bring expertise and passion, and infuse meaning to every experience.           </p>
        </div>

        {(() => {
          const renderCard = (member: TeamMember) => (
            <div
              key={member.name}
              class={[
                "break-inside-avoid mb-5 group backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out",
                "hover:shadow-xl hover:border-secondary-200 hover:bg-white/45",
                expandedMember.value === member.name
                  ? "bg-white/40 border-secondary-200"
                  : "bg-white/35 border-primary-200 dark:border-secondary-700",
              ]}
              style={{
                minHeight: "300px",
                transitionProperty: "transform, opacity, margin, box-shadow, background-color, border-color",
                transform: expandedMember.value === member.name ? "scale(1.02)" : "scale(1)",
              }}
              role="button"
              tabIndex={0}
              aria-expanded={expandedMember.value === member.name}
              onClick$={() => {
                expandedMember.value = expandedMember.value === member.name ? null : member.name;
              }}
            >
              <div class="flex flex-col items-center p-3 pt-6">
                <img
                  src={member.image}
                  alt={member.name}
                  class="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-[3px] border-secondary-200 mb-4 group-hover:scale-105 transition-transform duration-300"
                  width={160}
                  height={160}
                />
                <h3 class="text-xl sm:text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
                  {member.name}
                </h3>
                <span
                  class={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getRoleColor(member.role)}`}
                >
                  {member.role}
                </span>
                <p
                  class={[
                    "text-primary-700 dark:text-primary-300 !text-md sm:!text-md  text-center mt-4",
                    expandedMember.value === member.name
                      ? "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      : "transition-all duration-300 ease-in-out line-clamp-3",
                  ]}
                  style={{
                    maxHeight: expandedMember.value === member.name ? "1000px" : "4.5em",
                    overflow: "hidden",
                    transitionProperty: "max-height",
                  }}
                >
                  {member.description}
                </p>
                <div class="flex justify-center mt-2">
                  <svg
                    class={[
                      "w-4 h-4 text-primary-600 transition-transform duration-300",
                      expandedMember.value === member.name && "transform rotate-180",
                    ]}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          );

          const byName = (n: string) => TEAM_MEMBERS.find((m) => m.name === n)!;
          // Column-first order so the masonry columns read Ginger / Mary / Michelle across the top row
          const masonryOrder = ["Ginger", "Diane", "Mary", "Sydney", "Michelle", "Natalie"].map(byName);
          const tabletLeft = ["Ginger", "Michelle", "Diane"].map(byName);
          const tabletRight = ["Mary", "Sydney", "Natalie"].map(byName);

          return (
            <>
              {/* Mobile / small: natural order so Mary stays second */}
              <div class="columns-1 sm:columns-2 md:hidden gap-5">
                {TEAM_MEMBERS.map(renderCard)}
              </div>
              {/* Desktop: masonry columns, column-first order so an expanded card only pushes cards below it in the same column */}
              <div class="hidden lg:block lg:columns-3 gap-5">
                {masonryOrder.map(renderCard)}
              </div>
              {/* Tablet only: explicit 2-column flex with Mary first in right */}
              <div class="hidden md:flex lg:hidden gap-5">
                <div class="flex-1 flex flex-col" style={{ minWidth: "0" }}>
                  {tabletLeft.map(renderCard)}
                </div>
                <div class="flex-1 flex flex-col" style={{ minWidth: "0" }}>
                  {tabletRight.map(renderCard)}
                </div>
              </div>
            </>
          );
        })()}

{/* Logo section */}
<div id="logo" class="scroll-mt-20 mt-5 flex  p-5 py-6 flex-col bg-white/30 rounded-xl md:flex-row items-center md:items-start gap-6">
  {/* Left: Logo image (1/4 width on md+) */}
  <div class="w-full md:w-1/4 flex justify-center md:justify-start">
    <img
      src="/images/logo22.svg"
      alt="Earthen Vessels Logo"
      class="w-40 md:ml-8 md:mt-4 h-auto md:w-full max-w-[200px]"
    />
  </div>

  {/* Right: Text (3/4 width on md+) */}
  <div class="w-full md:w-3/4 text-primary-800 dark:text-primary-200 text-lg">
    Our facilitators and friends gathered to share their creative vision for earthen vessels.  
    Diane Black worked with these visions to create our rich logo.  
    Together from our shared imaginations, Diane designed a pinch pot holding water to remind us  
    of the life that flows through clay, hands, and community.
  </div>
</div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - This Is Us`,
  meta: [
    {
      name: "description",
      content: "Meet our expert team of pottery facilitators dedicated to fostering creativity and community.",
    },
  ],
};