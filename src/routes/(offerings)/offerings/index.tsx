import { component$, useSignal, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { getClasses } from '~/lib/turso';
import ClassesCarousel from '~/components/widgets/ClassesCarousel';

interface Workshop {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isActive?: boolean;
}

interface CarouselProps {
  workshops: Workshop[];
}

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

export default component$<CarouselProps>(() => {
  const isPlaying = useSignal<boolean>(false);
  const slidesPerViewSig = useSignal(1);
  const loc = useLocation();

    const classesData = useClassesData();
  

  // Handle hash navigation
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

  // Update slidesPerView based on screen size
  useVisibleTask$(({ cleanup }) => {
    isPlaying.value = true;

    const updateSlidesPerView = () => {
      if (window.matchMedia('(min-width: 640px)').matches) {
        slidesPerViewSig.value = 3; // Larger screens
      } else {
        slidesPerViewSig.value = 1; // Mobile
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    cleanup(() => {
      window.removeEventListener('resize', updateSlidesPerView);
    });
  });

  // Hover pause handlers
 

  return (
    <>
            <ClassesCarousel workshops={classesData.value} />
    
    </>
  );
});