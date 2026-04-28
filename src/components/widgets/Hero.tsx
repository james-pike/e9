import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

export default component$(() => {
  return (
    <section class="relative overflow-hidden shadow-sm pb-8">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 opacity-20" aria-hidden="true"></div>

      {/* Floating decorative elements */}
   
             {/* <div class="absolute top-0 left-80 w-[600px] h-[600px]  bg-primary-200 rounded-full blur-xl animate-float" aria-hidden="true"></div> */}

      

      <div class="grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Mobile/Tablet Logo */}
        <img
          src="/images/logo22.svg"
          alt="earthen vessels Logo"
          class="px-16 -mt-4 md:mt-6 h-48 md:h-32 mx-auto lg:hidden"
        />

        {/* Left Column (Desktop) / Text Content (Mobile/Tablet) */}
        <div class="relative z-10 order-1 flex items-center justify-center px-4 pt-3 md:pt-6 pb-10 lg:pl-8 lg:py-12 lg:order-1">
          <div class="text-center lg:text-left px-2">
            {/* Headline (Desktop only) */}
            <h1 class=" lg:block text-5.5xl lg:text-7xl font-bold tracking-tight lg:mb-4 mb-6 lg:-mt-0 -mt-10 md:mt-2 ">
              <span class="bg-gradient-to-r xdxd from-secondary-800 via-tertiary-500 to-secondary-800  bg-clip-text text-transparent">
                earthen vessels
              </span>
            </h1>
            {/* Slogan */}
            <h2 class="!text-2.5xl  lg:!text-3xl xdxd font-bold -mx-4 lg:mx-0 text-secondary-800 lg:text-primary-600 mb-4 lg:mb-8 mt-9 ">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              Listening, Connecting & Creating
              </span>
            </h2>
            {/* Subtitle */}
            <p class="text-xl -mx-2 lg:text-2xl font-light text-primary-800 mb-6 max-w-2xl lg:mx-0">
              Here, we gather around clay, to listen deeply to one another, to ourselves, and to the earth as we shape earthen vessels.
            </p>
          </div>
        </div>

        {/* Mobile/Tablet Image (Below Text) */}
        <div class="lg:hidden px-6 pb-10 -mt-6 order-2 relative">
          <Image
            src="/images/hero.webp"
            alt="earthen vessels Pottery"
            class="w-full max-h-64 md:max-h-96 object-contain rounded-lg shadow-xl border-half border-primary-300"
          />
          <div class="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "inset 0 0 30px 15px rgba(227, 231, 227, 0.8)" }} aria-hidden="true" />
        </div>

        {/* Desktop Right Column: Image */}
        <div class="hidden lg:block relative order-3 lg:order-2 py-12 pr-12">
          <div class="relative">
            <Image
              src="/images/hero.webp"
              alt="earthen vessels Pottery"
              widths={[400, 800, 1200, 1600]}
              layout="constrained"
              class="w-full object-contain rounded-2xl shadow-xl border-2 border-primary-300"
              placeholder="blur"
              blurDataURL="/images/hero.webp?blur=10&w=20"
            />
            <div class="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "inset 0 0 50px 25px rgba(227, 231, 227, 0.8)" }} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
});