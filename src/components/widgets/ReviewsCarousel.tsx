import { component$, useSignal, $, useTask$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { tursoClient } from "~/lib/turso";

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  date: string;
  role: string;
}

// Database loader
export const useReviewsLoader = routeLoader$(async (event) => {
  try {
    const client = tursoClient(event);
    const result = await client.execute('SELECT * FROM reviews ORDER BY id ASC');
    return result.rows.map((row: any) => ({
      id: Number(row.id) || 0,
      name: String(row.name) || '',
      review: String(row.review) || '',
      rating: Number(row.rating) || 0,
      date: String(row.date) || '',
      role: String(row.role) || '',
    })) as Review[];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
});

export default component$(() => {
  const reviewsData = useReviewsLoader();
  const reviews = useSignal<Review[]>([]);
  const currentIndex = useSignal(0);
  const isAutoPlaying = useSignal(true);
  const carouselRef = useSignal<HTMLElement | undefined>();
  const location = useLocation();
  const isHomePage = location.url.pathname === "/";

  // Load reviews data
  useVisibleTask$(() => {
    reviews.value = reviewsData.value;
  });

  useStyles$(`
    .multi-column-grid {
      column-count: 1;
      column-gap: 1.5rem;
      padding: 0 1rem;
    }
    @media (min-width: 640px) {
      .multi-column-grid {
        column-count: 2;
      }
    }
    @media (min-width: 1024px) {
      .multi-column-grid {
        column-count: 3;
      }
    }
    .review-card {
      break-inside: avoid;
      margin-bottom: 1.5rem;
    }
    .scrollbar-invisible::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-invisible {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .review-content {
      max-height: 150px;
      overflow-y: auto;
    }
    .review-content::-webkit-scrollbar {
      width: 6px;
    }
    .review-content::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
    }
    .review-content::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
    .review-content::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  `);

  const REVIEWS_PER_SLIDE = 3;
  const safeReviews = reviews.value;
  const numSlides = Math.max(0, Math.ceil(safeReviews.length / REVIEWS_PER_SLIDE));

  const nextSlide = $(() => {
    if (carouselRef.value) {
      const cardWidth = 320;
      const newScrollLeft = carouselRef.value.scrollLeft + cardWidth;
      carouselRef.value.scrollTo({ left: newScrollLeft, behavior: "smooth" });
      currentIndex.value = Math.min(currentIndex.value + 1, numSlides - 1);
    }
  });

  const prevSlide = $(() => {
    if (carouselRef.value) {
      const cardWidth = 320;
      const newScrollLeft = carouselRef.value.scrollLeft - cardWidth;
      carouselRef.value.scrollTo({ left: newScrollLeft, behavior: "smooth" });
      currentIndex.value = Math.max(currentIndex.value - 1, 0);
    }
  });

  useTask$(({ track, cleanup }) => {
    track(() => isAutoPlaying.value);
    if (typeof window !== "undefined" && isHomePage) {
      const interval = setInterval(() => {
        if (isAutoPlaying.value && safeReviews.length > 0) {
          nextSlide();
        }
      }, 4000);
      cleanup(() => clearInterval(interval));
    }
  });

  function formatRelativeDate(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) {
      return "in the future";
    }
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
    if (diffWeek > 0) return `${diffWeek} week${diffWeek > 1 ? "s" : ""} ago`;
    if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    return "just now";
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        class={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Mock media articles data - replace with your actual data source
  const mediaArticles = [
    {
      id: 1,
      title: "Featured in Tech Innovation Magazine",
      publication: "Tech Innovation",
      date: "2024-10-15",
      excerpt: "How this program is changing the landscape of professional development...",
      url: "#",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Success Stories: Transforming Careers",
      publication: "Business Weekly",
      date: "2024-09-28",
      excerpt: "Alumni share their journey and the impact of the program on their professional lives...",
      url: "#",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Industry Leader Spotlight",
      publication: "Professional Development Journal",
      date: "2024-09-10",
      excerpt: "Recognition for excellence in training and development programs...",
      url: "#",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop"
    }
  ];

  if (safeReviews.length === 0) {
    return (
      <section class="relative overflow-hidden py-12 md:py-16">
        <div class="relative max-w-7xl mx-auto px-1 sm:px-6">
          <div class="text-center mb-12">
            <h2 class="!text-5xl md:text-6xl px-4 font-bold mb-6">
              <span class="bg-gradient-to-r xdxd from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                Participant Reviews
              </span>
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section class="relative overflow-hidden py-12 md:py-16">
        <div class="relative max-w-7xl mx-auto px-1 sm:px-6">
          <div class="text-center mb-12">
            <h2 class="!text-5xl md:text-6xl px-4 font-bold mb-6">
              <span class="bg-gradient-to-r xdxd from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                Participant Reviews
              </span>
            </h2>
          </div>

          <div class="relative max-w-6xl mx-auto">
            {safeReviews.length === 0 ? (
              <div class="text-center py-12 text-primary-600 text-lg">
                No reviews available yet.
              </div>
            ) : isHomePage ? (
              <>
                <div
                  class="overflow-x-auto snap-x snap-mandatory md:px-6 scrollbar-invisible"
                  ref={carouselRef}
                >
                  <div class="flex gap-6">
                    {safeReviews.map((review: Review) => (
                      <div key={review.id} class="flex-shrink-0 w-80 snap-center">
                        <div class="bg-gradient-to-br from-white/70 via-primary-50/70 to-secondary-50/70 dark:from-gray-800/90 dark:via-primary-900/30 dark:to-secondary-900/30 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-secondary-200 border-2 border-primary-100 dark:border-secondary-700">
                          <div class="flex justify-center mb-4 pt-6">
                            <div class="flex space-x-1">{renderStars(review.rating)}</div>
                          </div>
                          <blockquote class="review-content text-md text-secondary-900 dark:text-secondary-100 mb-6 px-6">
                            "{review.review}"
                          </blockquote>
                          <div class="flex items-center space-x-3 mb-4 px-6">
                            <div class="text-left">
                              <h4 class=" font-bold text-secondary-900 dark:text-secondary-100">
                                {review.name}
                              </h4>
                              {review.role && (
                                <p class="text-primary-600 dark:text-primary-400 text-xs">{review.role}</p>
                              )}
                            </div>
                          </div>
                          <p class="text-primary-500 dark:text-primary-400 text-xs mt-3 pb-6 px-6">
                            {formatRelativeDate(review.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {safeReviews.length > 1 && (
                  <div class="flex justify-center mt-4 space-x-2">
                    <button
                      onClick$={prevSlide}
                      class="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700"
                      aria-label="Previous slide"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                    <button
                      onClick$={nextSlide}
                      class="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700"
                      aria-label="Next slide"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div class="multi-column-grid">
                {safeReviews.map((review: Review) => (
                  <div key={review.id} class="review-card">
                    <div class="bg-gradient-to-br from-white/50 via-primary-50/30 to-secondary-50/30 dark:from-gray-800/90 dark:via-primary-900/30 dark:to-secondary-900/30 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-secondary-200 border-2 border-primary-100 dark:border-secondary-700">
                      <div class="flex justify-center mb-4 pt-6">
                        <div class="flex space-x-1">{renderStars(review.rating)}</div>
                      </div>
                      <blockquote class="review-content !text-lg text-secondary-900 dark:text-secondary-100 mb-6 px-6">
                        "{review.review}"
                      </blockquote>
                      <div class="flex items-center space-x-3 mb-4 px-6">
                        <div class="text-left">
                          <h4 class=" font-bold text-secondary-900 dark:text-secondary-100">
                            {review.name}
                          </h4>
                        </div>
                      </div>
                      <p class="text-primary-500 dark:text-primary-400 text-xs mt-3 pb-6 px-6">
                        {formatRelativeDate(review.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media Articles Section */}
      <section class="relative overflow-hidden py-12 md:py-16 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 dark:from-gray-900/50 dark:to-gray-800/50">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-12">
            <h2 class="!text-5xl md:text-6xl font-bold mb-6">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                Featured in Media
              </span>
            </h2>
            <p class="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              See what leading publications are saying about us
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mediaArticles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary-100 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-600"
              >
                <div class="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">
                      {article.publication}
                    </span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {formatRelativeDate(article.date)}
                    </span>
                  </div>
                  <h3 class="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h3>
                  <p class="text-secondary-600 dark:text-secondary-400 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div class="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-semibold text-sm">
                    Read More
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
});