import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "~/components/common/RouterHead";
import styles from "~/assets/styles/global.css?inline";
import Header from "./components/widgets/Header";

export default component$(() => {
  useStyles$(styles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        {/* Preload Dancing Script weight 400 only */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&display=block"
          as="style"
        />
        {/* Load all Dancing Script weights as stylesheet */}
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&display=block"
          rel="stylesheet"
        />
        {/* Define font-face for weight 400 with font-display: block */}
        <style>
          {`
            @font-face {
              font-family: 'Dancing Script';
              font-style: normal;
              font-weight: 600;
              src: url('https://fonts.gstatic.com/s/dancingscript/v24/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Sup5.ttf') format('truetype');
              font-display: block;
            }
          `}
        </style>
        {/* Load Della Respira normally */}
        <link href="https://fonts.googleapis.com/css2?family=Della+Respira&display=swap" rel="stylesheet" />
        <RouterHead />
        <ServiceWorkerRegister />
        {/* Image preloads with correct types */}
        <link rel="preload" href="/images/logo22.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/images/hero.webp" as="image" type="image/webp" />
                <link rel="preload" href="/images/corporate.webp" as="image" type="image/webp" />
                                <link rel="preload" href="/images/private.jpeg" as="image" type="image/webp" />


        <link rel="preload" href="/images/logo2-cropped.svg" as="image" type="image/svg+xml" />
      </head>
      <body class="bg-primary-50 dark:bg-primary-950 antialiased">
        {/* Desktop-only gate (preview branch): the mobile/tablet layouts are
            disabled for this client preview. Shown below the lg breakpoint
            (<1024px) over everything; desktop (lg+) sees the site normally.
            Remove this block before merging to production. */}
        <div class="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-primary-50 px-8 text-center dark:bg-primary-950 lg:hidden">
          <img src="/images/logo22.svg" alt="earthen vessels" class="h-40 w-auto" width="240" height="160" />
          <h1 class="font-serif text-2xl text-primary-800 dark:text-primary-100">Best viewed on desktop</h1>
          <p class="max-w-sm text-primary-700 dark:text-primary-300">
            This preview is optimized for desktop. Please open it on a larger
            screen — the mobile &amp; tablet layouts are still being finished.
          </p>
        </div>
        <Header />
        <div class="relative md:border-x mx-auto max-w-7xl overflow-x-hidden" style={{ contain: "layout style" }}>

          {/* Background layers - GPU promoted to prevent scroll repaints */}
          <div class="absolute inset-0 z-[-1] bg-watercolor-texture opacity-50 bg-secondary-100/50 bg-layer-fixed" aria-hidden="true"></div>
          <div class="absolute inset-0 z-[-1] bg-gradient-to-br from-primary-100/95 via-primary-200/80 to-tertiary-200/85 bg-layer-fixed" aria-hidden="true"></div>
          <div class="absolute inset-0 z-[-1] bg-gradient-to-t from-tertiary-300/40 via-primary-200/50 to-primary-100/60 bg-layer-fixed" aria-hidden="true"></div>
          <div class="absolute top-0 left-5 w-[700px] h-[800px] z-[-1] bg-tertiary-100/30 rounded-full blur-xl animate-float" aria-hidden="true"></div>
          <div class="absolute top-0 right-0 w-[800px] h-[800px] z-[-1] bg-primary-100/30 rounded-full blur-xl animate-float" aria-hidden="true"></div>
          <div class="absolute top-5 md:left-[650px] w-[490px] h-[80px] z-[-1] bg-primary-200/30 rounded-full blur-xl animate-float" aria-hidden="true"></div>
          <RouterOutlet />
        </div>
      </body>
    </QwikCityProvider>
  );
});