import { component$, useStore, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import IconChevronDown from "../icons/IconChevronDown";
import MenuModal from "./MenuModal";
import { useBannerLoader } from "~/routes/layout";
import { 
  LuUsers, 
  LuImage, 
  LuHome, 
  LuEye, 
  LuNewspaper, 
  LuHelpCircle,
  LuCalendarDays,
  LuBuilding2,
  LuPartyPopper,
  LuGift,
  LuLeaf,
  LuCompass,
  LuQuote,
  LuMail,
  LuCuboid,
  LuSprout,
  LuHeartHandshake,
} from "@qwikest/icons/lucide";

export default component$(() => {
  const store = useStore({
    isScrolling: false,
    isMobile: false,
    showBanner: true,
  });

  const isInitialized = useSignal(false);
  const location = useLocation();
  const isHomeRoute = location.url.pathname === "/";

  const bannerMessages = useBannerLoader();
  const hasBannerMessages = useSignal<boolean>(false);

  const currentMessageIndex = useSignal(0);

  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    store.isMobile = mediaQuery.matches;
    isInitialized.value = true;
    const handler = (e: MediaQueryListEvent) => {
      store.isMobile = e.matches;
    };
    mediaQuery.addEventListener("change", handler);

    hasBannerMessages.value = !!(bannerMessages.value && 
      (Array.isArray(bannerMessages.value) ? bannerMessages.value.length > 0 : !!bannerMessages.value));

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
      { 
        text: "This Is Us", 
        href: "/team",
        items: [
          { text: "Facilitators", href: "/team", icon: LuUsers },
          { text: "Our Logo", href: "/team#logo", icon: LuImage },
          { text: "Contact", href: "/contact", icon: LuMail },
        ]
      },
      //
      {
        text: "About",
        href: "/about",
        items: [
          { text: "Our Space", href: "/about", icon: LuHome },
          { text: "What To Expect", href: "/about#what-to-expect", icon: LuEye },
                    { text: "Benefits Of Clay", href: "/about#benefits-of-clay", icon: LuCuboid },

          { text: "Newsletter", href: "/newsletter", icon: LuNewspaper },
          { text: "Gallery", href: "/gallery", icon: LuImage },
          { text: "FAQ", href: "/faq", icon: LuHelpCircle },
        ],
      },
      {
        text: "Our Offerings",
        href: "/offerings",
        items: [
          { text: "Classes & Workshops", href: "/offerings", icon: LuCalendarDays },
          // Monthly Calendars hidden for now
          // { text: "Monthly Calendars", href: "/offerings#calendars", icon: LuCalendarDays },
          { text: "Corporate Events", href: "/offerings#events", icon: LuBuilding2 },
          { text: "Private Events", href: "/offerings#events", icon: LuPartyPopper },
          { text: "Gift Cards", href: "https://bookeo.com/earthenvessels/buyvoucher", icon: LuGift },
        ],
      },
      {
        text: "Retreats",
        href: "/courage-renewal",
        items: [
          { text: "Overview", href: "/courage-renewal", icon: LuLeaf },
          { text: "Ways To Gather", href: "/courage-renewal#ways-to-gather", icon: LuUsers },
          { text: "Upcoming Retreats", href: "/courage-renewal/retreats", icon: LuCalendarDays },
          { text: "Held At Our Studio", href: "/courage-renewal#at-the-studio", icon: LuBuilding2 },
          { text: "The Approach", href: "/courage-renewal#approach", icon: LuCompass },
          { text: "How A Day Unfolds", href: "/courage-renewal#a-day", icon: LuNewspaper },
          { text: "Why Clay", href: "/courage-renewal#the-clay", icon: LuSprout },
          { text: "What To Expect", href: "/courage-renewal#what-to-expect", icon: LuEye },
          { text: "Who It's For", href: "/courage-renewal#who-its-for", icon: LuHeartHandshake },
          { text: "Reflections", href: "/courage-renewal#reflections", icon: LuQuote },
          { text: "Questions", href: "/courage-renewal#faq", icon: LuHelpCircle },
          { text: "Ask About A Retreat", href: "/courage-renewal/register", icon: LuMail },
        ],
      },
         {
        text: "Reviews",
        href: "/reviews/",
        items: [
          { text: "Reviews", href: "/reviews", icon: LuCalendarDays },
          { text: "In The News", href: "/reviews/#news", icon: LuNewspaper },
       
        ],
      },
            { text: "Community", href: "/community" },
    ],
  };

  return (
    <>
      {/* Banner - Both mobile and desktop */}
      {(hasBannerMessages.value ?? false) && (
        <div
          class={`
            bg-primary-200/70 max-w-7xl md:mx-auto px-0.5
             shadow-sm
            transition-[height,padding,opacity] duration-150 ease-in-out
            ${store.showBanner ? 'h-auto py-0.5 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}
          `}
        >
          <div class="mx-auto px-0 md:px-6 max-w-7xl shadow-sm">
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
                      {bannerMessages.value?.gif && (
                        <>
                          <span class="text-md opacity-90">•</span>
                          <img
                            src={bannerMessages.value.gif}
                            alt="Banner animation"
                            class="h-6 w-auto object-contain inline-block"
                          />
                        </>
                      )}
                      <span class="text-md opacity-0 mx-8">•</span>
                    </span>
                    {/* Duplicate for seamless loop */}
                    <span class="inline-flex items-center gap-2">
                      <h3 class="font-bold text-md text-primary-600">{bannerMessages.value?.title}</h3>
                      <span class="text-md opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.subtitle}</span>
                      <span class="text-md opacity-90">•</span>
                      <span class="text-md opacity-90">{bannerMessages.value?.message}</span>
                      {bannerMessages.value?.gif && (
                        <>
                          <span class="text-md opacity-90">•</span>
                          <img
                            src={bannerMessages.value.gif}
                            alt="Banner animation"
                            class="h-6 w-auto object-contain inline-block"
                          />
                        </>
                      )}
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
                  {bannerMessages.value?.gif && (
                    <>
                      <span class="text-md opacity-90">•</span>
                      <img
                        src={bannerMessages.value.gif}
                        alt="Banner animation"
                        class="h-6 w-auto object-contain inline-block"
                      />
                    </>
                  )}
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
          sticky top-0 z-40 flex-none mx-auto max-w-7xl border-primary-200 shadow-sm
          md:backdrop-blur-sm
          transition-[background-color] duration-300 ease-in-out
          ${store.isScrolling
            ? "bg-primary-100/95 md:bg-primary-100/80 dark:bg-primary-900/80"
            : "bg-primary-100/95"
          }
        `}
        style={{ willChange: "auto", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
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
        <div class="relative text-default py-1 pb-1.5 lg:p-1 px-2 lg:px-6 mx-auto w-full lg:flex lg:justify-between max-w-7xl">
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
            <div class="flex items-center lg:hidden gap-2">
              <MenuModal />
            </div>
          </div>
          <nav
            class="items-center w-full lg:w-auto hidden lg:flex dark:text-white overflow-y-auto overflow-x-hidden lg:overflow-y-visible lg:overflow-x-auto lg:mx-5 group"
            aria-label="Main navigation"
          >
            {menu && menu.items ? (
              <ul class="flex flex-col lg:flex-row text-primary-600 lg:self-center w-full lg:w-auto text-xl lg:text-xl tracking-[0.01rem] font-medium">
                {menu.items.map(({ text, href, items,  }, key) => {
                  const isActive = location.url.pathname === href;
                  return (
                    <li key={key} class={items?.length ? "dropdown" : ""}>
                      {items?.length ? (
                        <>
                          <a
                            href={href}
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
                                ? "text-secondary-800 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                              }
                            `}
                            onClick$={(event) => {
                              // Only "Our Offerings" has the special home-page scroll behaviour
                              if (href === "/offerings" && location.url.pathname === "/") {
                                event.preventDefault();
                                const servicesSection = document.getElementById("services");
                                if (servicesSection) {
                                  servicesSection.scrollIntoView({ behavior: "smooth" });
                                }
                              }
                              // all other cases (including clicking "Our Offerings" when not on home) → normal navigation
                            }}
                          >
                            {text}
                            <IconChevronDown class="w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline" />
                          </a>
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
                              md:bg-white/95
                              md:min-w-[200px]
                              drop-shadow-xl
                              py-2
                            `}
                          >
                            {items.map(({ text: text2, href: href2, icon: ItemIcon }, key2) => {
                              const isDropdownActive = location.url.pathname === href2;
                              const isFirst = key2 === 0;
                              const isLast = key2 === items.length - 1;
                              const isExternalLink = href2?.startsWith('http');
                              return (
                                <li key={key2}>
                                  <a
                                    class={`
                                      hover:bg-muted
                                      hover:text-secondary-800
                                      py-2 px-5
                                      flex items-center gap-2
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
                                    {...(isExternalLink && { target: "_blank", rel: "noopener noreferrer" })}
                                    onClick$={(e) => {
                                      if (text2 === "Clay" && href2 === "/about#clay") {
                                        e.preventDefault();
                                        if (location.url.pathname !== "/about") {
                                          window.location.href = "/about#clay";
                                        } else {
                                          const claySection = document.getElementById("clay");
                                          if (claySection) {
                                            claySection.scrollIntoView({ behavior: "instant" });
                                          }
                                        }
                                      }
                                    }}
                                  >
                                    {ItemIcon && <ItemIcon class="w-4 h-4 flex-shrink-0" />}
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
        </div>
      </header>
    </>
  );
});