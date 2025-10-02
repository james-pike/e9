import { component$, useStore, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import IconChevronDown from "../icons/IconChevronDown";
import MenuModal from "./MenuModal";
import { useBannerLoader } from "~/routes/layout";

export default component$(() => {
  const store = useStore({
    isScrolling: false,
    isMobile: false,
    showBanner: true, // Track banner visibility
  });

  const isInitialized = useSignal(false);
  const location = useLocation();
  const isHomeRoute = location.url.pathname === "/";

  const bannerMessages = useBannerLoader(); // Ensure the banner loader is invoked
  const hasBannerMessages = useSignal<boolean>(false);
  

  // Hardcoded banner data for testing - array for multiple messages
  // const bannerMessages = [
  //   {
  //     title: "🎉 Important Announcement",
  //     subtitle: "New Feature Launch",
  //     message: "Check out our latest updates and improvements!"
  //   },
  //   {
  //     title: "✨ Special Offer",
  //     subtitle: "Limited Time",
  //     message: "Join us for a pottery workshop this weekend!"
  //   }
  // ];

  const currentMessageIndex = useSignal(0);

  
  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    store.isMobile = mediaQuery.matches;
    isInitialized.value = true;
    const handler = (e: MediaQueryListEvent) => {
      store.isMobile = e.matches;
    };
    mediaQuery.addEventListener("change", handler);

    // Check if banner messages exist and are valid
    hasBannerMessages.value = !!(bannerMessages.value && 
      (Array.isArray(bannerMessages.value) ? bannerMessages.value.length > 0 : !!bannerMessages.value));

    // Cycle through banner messages every 4 seconds (only if there are multiple messages)
    let interval: NodeJS.Timeout | undefined;
    if (bannerMessages.value && Array.isArray(bannerMessages.value) && bannerMessages.value.length > 1) {
      interval = setInterval(() => {
        currentMessageIndex.value = (currentMessageIndex.value + 1) % bannerMessages.value.length;
      }, 4000);
    }

    return () => {
      mediaQuery.removeEventListener("change", handler);
      if (interval) clearInterval(interval);
    };
  });

  const menu = {
    items: [
      { text: "This Is Us", href: "/team" },
      {
        text: "About",
        href: "/about",
        items: [
          { text: "Our Space", href: "/about" },
          { text: "What To Expect", href: "/about#what-to-expect" },
          { text: "Newsletter", href: "/newsletter" },
          { text: "Gallery", href: "/gallery" },
          { text: "FAQ", href: "/faq" },
        ],
      },
      {
        text: "Classes",
        href: "/classes",
        items: [
          { text: "Our Offerings", href: "/classes" },
          { text: "Gift Cards", href: "https://bookeo.com/earthenvessels/buyvoucher" },
        ],
      },
      { text: "Reviews", href: "/reviews" },
      { text: "Connections", href: "/connections" },
      { text: "Contact", href: "/contact" },
    ],
  };

  return (
    <>
      {/* Banner - Both mobile and desktop */}
      {(hasBannerMessages.value ?? false) && (
        <div
          class={`
            bg-primary-200/70 max-w-7xl md:mx-auto px-0.5
             shadow-md
            transition-all duration-100 ease-in-out
            ${store.showBanner ? 'h-auto py-0.5 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}
          `}
        >
          <div class="mx-auto px-0 md:px-6 max-w-7xl">
            <div class="flex items-center justify-between gap-2">
              <div class="flex-1 min-w-0 overflow-hidden">
                {/* Mobile: Scrolling text */}
                <div class="md:hidden relative h-6 flex items-center text-primary-700">
                  <div class="animate-scroll whitespace-nowrap">
                    <span class="inline-flex items-center gap-2 mx-3">
                      <h3 class="font-bold text-md text-primary-600 ">{bannerMessages.value?.title}</h3>
                      <span class="text-md opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.subtitle}</span>
                      <span class="text-xs opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.message}</span>
                      <span class="text-md opacity-0 mx-8">•</span>
                    </span>
                    {/* Duplicate for seamless loop */}
                    <span class="inline-flex items-center gap-2">
                      <h3 class="font-bold text-md text-primary-600">{bannerMessages.value?.title}</h3>
                      <span class="text-md opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.subtitle}</span>
                      <span class="text-md opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.message}</span>
                      <span class="text-md opacity-0 mx-8">•</span>
                    </span>
                  </div>
                </div>
                
                {/* Desktop: Static wrapped text */}
                <div class="hidden md:flex items-center gap-2 flex-wrap text-primary-700">
                  <h3 class="font-bold text-md text-primary-600 whitespace-nowrap">{bannerMessages.value?.title}</h3>
                  <span class="text-md opacity-90">•</span>
                  <span class="text-md md:text-md opacity-90">{bannerMessages.value?.subtitle}</span>
                  <span class="text-sm opacity-90">•</span>
                  <span class="text-md md:text-sm opacity-90">{bannerMessages.value?.message}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>
        {`
          @keyframes scroll {
            0%, 10% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            display: inline-block;
            animation: scroll 22s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      {/* Header */}
      <header
        id="header"
        class={`
          sticky top-0 z-40 flex-none mx-auto max-w-7xl border-primary-200 
          transition-all duration-300 ease-in-out
          ${store.isScrolling
            ? "bg-primary-100/95 md:bg-primary-100/80 dark:bg-primary-900/80 md:backdrop-blur-sm"
            : "bg-primary-100/95"
          }
        `}
        window:onScroll$={() => {
          const scrollY = window.scrollY;

          if (!store.isScrolling && scrollY >= 10) {
            store.isScrolling = true;
            store.showBanner = false;
          } else if (store.isScrolling && scrollY < 10) {
            store.isScrolling = false;
            store.showBanner = true;
          }
        }}
      >
        <div class="absolute inset-0" aria-hidden="true"></div>
        <div class="relative text-default py-1 pb-1.5 md:p-1 px-2 md:px-6 mx-auto w-full md:flex md:justify-between max-w-7xl">
          <div class="mr-auto rtl:mr-0 rtl:ml-auto flex justify-between">
            <a class="flex items-center pb-1" href="/">
              <div style={{ width: "100px", height: "40px", position: "relative" }}>
                <img
                  src={isHomeRoute ? "/images/logo2-cropped.svg" : "/images/logo22.svg"}
                  alt={isHomeRoute ? "Logo Cropped" : "Logo"}
                  class={{
                    "absolute top-1 left-1 object-contain": true,
                    "w-[40px] h-[40px]": isHomeRoute,
                    "w-[100px] h-[40px]": !isHomeRoute,
                  }}
                  style={{ display: isInitialized.value ? "none" : "block" }}
                />
                {isInitialized.value && (
                  <>
                    {store.isMobile && isHomeRoute && (
                      <img
                        src="/images/logo2-cropped.svg"
                        alt="Logo Cropped"
                        class={{
                          "absolute top-1 left-1 w-[40px] h-[40px] object-contain transition-all duration-500 ease-in-out": true,
                          "opacity-100 translate-x-0": !store.isScrolling,
                          "opacity-0 translate-x-full": store.isScrolling,
                        }}
                      />
                    )}
                    <img
                      src="/images/logo22.svg"
                      alt="Logo"
                      class={{
                        "absolute top-1 -left-1 w-[100px] h-[40px] object-contain": true,
                        "transition-all duration-500 ease-in-out": store.isMobile && isHomeRoute,
                        "opacity-0 -translate-x-full": store.isMobile && isHomeRoute && !store.isScrolling,
                        "opacity-100 translate-x-0": !store.isMobile || !isHomeRoute || store.isScrolling,
                      }}
                    />
                  </>
                )}
              </div>
            </a>
            <div class="flex items-center md:hidden gap-1">
              <MenuModal />
            </div>
          </div>
          <nav
            class="items-center w-full md:w-auto hidden md:flex dark:text-white overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5 group"
            aria-label="Main navigation"
          >
            {menu && menu.items ? (
              <ul class="flex flex-col md:flex-row text-primary-600 md:self-center w-full md:w-auto text-xl md:text-xl tracking-[0.01rem] font-medium">
                {menu.items.map(({ text, href, items }, key) => {
                  const isActive = location.url.pathname === href;
                  return (
                    <li key={key} class={items?.length ? "dropdown" : ""}>
                      {items?.length ? (
                        <>
                          <button
                            class={`
                              hover:text-secondary-800
                              px-4 py-3
                              flex items-center
                              transition-all duration-200
                              relative
                              rounded-base
                              after:content-['']
                              after:absolute
                              after:bottom-[6px]
                              after:left-1/2
                              after:h-[2px]
                              after:bg-secondary-800
                              after:transition-all
                              after:duration-200
                              ${isActive
                                ? "after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                              }
                            `}
                            onClick$={() => {
                              if (location.url.pathname !== "/") {
                                window.location.href = "/classes";
                              } else {
                                const servicesSection = document.getElementById("services");
                                if (servicesSection) {
                                  servicesSection.scrollIntoView({ behavior: "smooth" });
                                }
                              }
                            }}
                          >
                            {text}
                            <IconChevronDown class="w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline" />
                          </button>
                          <ul
                            class={`
                              dropdown-menu
                              md:backdrop-blur-md
                              dark:md:bg-muted
                              rounded-lg
                              md:absolute
                              pl-4 md:pl-0
                              md:hidden
                              font-medium
                              md:bg-white/80
                              md:min-w-[200px]
                              drop-shadow-xl
                              py-2
                            `}
                          >
                            {items.map(({ text: text2, href: href2 }, key2) => {
                              const isDropdownActive = location.url.pathname === href2;
                              const isFirst = key2 === 0;
                              const isLast = key2 === items.length - 1;
                              return (
                                <li key={key2}>
                                  <a
                                    class={`
                                      hover:bg-muted
                                      hover:text-secondary-800
                                      py-2 px-5
                                      block
                                      whitespace-no-wrap
                                      transition-all duration-200
                                      relative
                                      after:content-['']
                                      after:absolute
                                      after:bottom-[4px]
                                      after:left-1/2
                                      after:h-[2px]
                                      after:bg-secondary-800
                                      after:transition-all
                                      after:duration-200
                                      ${isDropdownActive
                                        ? "after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                        : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                                      }
                                      ${isFirst ? "hover:rounded-t-base" : ""}
                                      ${isLast ? "hover:rounded-b-base" : ""}
                                      ${!isFirst && !isLast ? "hover:rounded-none" : ""}
                                    `}
                                    href={href2}
                                    onClick$={(e) => {
                                      if (text2 === "Clay" && href2 === "/about#clay") {
                                        e.preventDefault();
                                        if (location.url.pathname !== "/about") {
                                          window.location.href = "/about#clay";
                                        } else {
                                          const claySection = document.getElementById("clay");
                                          if (claySection) {
                                            claySection.scrollIntoView({ behavior: "smooth" });
                                          }
                                        }
                                      }
                                    }}
                                  >
                                    {text2}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <a
                          class={`
                            hover:bg-muted
                            hover:text-secondary-800
                            px-4 py-3
                            flex items-center
                            relative
                            transition-all duration-200
                            after:content-['']
                            after:absolute
                            after:bottom-[6px]
                            after:left-1/2
                            after:h-[2px]
                            after:bg-secondary-800
                            after:transition-all
                            after:duration-200
                            rounded-base
                            ${isActive
                              ? "text-secondary-800 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                              : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                            }
                          `}
                          href={href}
                        >
                          {text}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </nav>
          <div class="hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0">
            <div class="items-center flex justify-between w-full md:w-auto">
              <a
                href="https://bookeo.com/earthenvessels"
                class="w-full sm:w-auto bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1">
                  Book a Class
                  <svg class="w-5 h-5 -ml-0.5 transform group-hover:translate-x-0.75 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});