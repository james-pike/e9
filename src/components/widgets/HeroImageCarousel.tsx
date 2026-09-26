import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

interface HeroImage {
  src: string;
  alt: string;
  contain?: boolean; // show the whole image (letterboxed) instead of cropping to fill
}

// A quiet, auto-rotating set of studio moments for the homepage hero.
const images: HeroImage[] = [
  { src: '/images/hero.webp', alt: 'A group gathered around the table at earthen vessels', contain: true },
  { src: '/images/decembergroup.webp', alt: 'A workshop group with their creations' },
  { src: '/images/space.webp', alt: 'The earthen vessels studio, set with a circle of chairs' },
  { src: '/images/g6.webp', alt: 'Finished pieces from a workshop' },
];

// A soft cross-fade carousel: slides are stacked and blended via opacity rather
// than sliding. It auto-advances on a gentle timer, pauses on hover, and any
// click moves to the next image.
export default component$((props: { fill?: boolean }) => {
  const fill = props.fill ?? false;
  const current = useSignal(0);
  const paused = useSignal(false);

  useVisibleTask$(({ cleanup }) => {
    const id = setInterval(() => {
      if (!paused.value) {
        current.value = (current.value + 1) % images.length;
      }
    }, 7500);
    cleanup(() => clearInterval(id));
  }, { strategy: 'document-ready' });

  // Non-fill (mobile framed): fixed height box. Fill (desktop background): fills
  // its full-height parent layer.
  const heightClass = 'h-72 sm:h-96 lg:h-[26rem]';

  return (
    <div
      class={`relative cursor-pointer overflow-hidden ${fill ? 'h-full w-full' : `w-full ${heightClass}`}`}
      onMouseEnter$={() => {
        paused.value = true;
      }}
      onMouseLeave$={() => {
        paused.value = false;
      }}
      onClick$={() => {
        current.value = (current.value + 1) % images.length;
      }}
    >
      {images.map((image, i) => {
        // Fill (desktop background) layer:
        //  - contain images render at their natural height, vertically centered,
        //    so the element IS the photo — its top/bottom fade sits exactly on
        //    the photo's edges regardless of viewport width.
        //  - cover images fill the whole layer.
        // Each fill image carries its own vertical fade; the shared parent layer
        // handles only the left fade. (Non-fill mobile frame: no extra masking.)
        const layout = fill
          ? image.contain
            ? 'absolute inset-x-0 top-1/2 h-auto w-full -translate-y-1/2'
            : 'absolute inset-0 h-full w-full object-cover object-center'
          : `absolute inset-0 h-full w-full object-center ${image.contain ? 'object-contain' : 'object-cover'}`;
        const verticalMask = image.contain
          ? 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)'
          : 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)';
        return (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            style={fill ? { maskImage: verticalMask, WebkitMaskImage: verticalMask } : undefined}
            class={`${layout} transition-opacity duration-[1200ms] ease-in-out ${
              i === current.value ? 'opacity-100' : 'opacity-0'
            }`}
          />
        );
      })}

      {/* Pagination dots, overlaid on the image */}
      <div
        class="absolute bottom-3 z-10 flex gap-2 rounded-full bg-black/25 px-3 py-1.5 backdrop-blur-sm"
        // Fill (desktop): the carousel shares the max-w-7xl right edge with the
        // content below, so a 4rem inset (= that content's lg:px-16) lines the
        // dots up with the panel's right edge.
        style={fill ? { right: '4rem' } : { right: '1rem' }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick$={(e) => {
              e.stopPropagation();
              current.value = i;
            }}
            class={`h-2 w-2 rounded-full transition-colors ${
              i === current.value ? 'bg-white' : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
});
