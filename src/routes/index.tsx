import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";
import Hero from "~/components/widgets/Hero";
import LandingCards from "~/components/LandingCards";
import ClassesCarousel from "~/components/widgets/ClassesCarousel";
import { getClasses } from '~/lib/turso';

// Add the same loader from your classes page
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
    return []; // Return empty array on error instead of throwing
  }
});

export default component$(() => {
  const classesData = useClassesData();

  return (
    <>
      <div class="md:pt-5 pt-2">
        <div class="hidden md:block absolute top-10 left-[46%] -translate-x-[46%] w-[700px] h-[500px] bg-primary-200/50 rounded-full blur-xl animate-float" aria-hidden="true"></div> 

        <div class="hidden md:block absolute top-8 left-[44%] -translate-x-[44%] w-[300px] h-[300px] border-[2px] border-white rounded-full blur-sm animate-float" aria-hidden="true"></div> 
 
        <div class="hidden md:block absolute top-10 left-[85%] -translate-x-[85%] w-[200px] h-[200px] border-[2.5px] border-white rounded-full blur-sm animate-floatx" aria-hidden="true"></div> 

        <div class="hidden md:block absolute top-60 left-[93%] -translate-x-[93%] w-[100px] h-[100px] border-[2.5px] border-white rounded-full blur-sm animate-float" aria-hidden="true"></div> 

        <div class="hidden md:block absolute top-[15%] left-[60%] -translate-x-[60%] w-[300px] h-[300px] border-[2.5px] border-white rounded-full blur-sm animate-float" aria-hidden="true"></div>

        <Hero />
        
        {/* Pass the loaded data to the carousel */}
        <ClassesCarousel workshops={classesData.value} />

        <LandingCards />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: SITE.title,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};