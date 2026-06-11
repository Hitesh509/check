import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {
  return (
    <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group my-4">
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      
      {/* Marquee content */}
      <div className="flex min-w-[200%] animate-[marqueeScroll_20s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-6">
        {[...categories, ...categories].map((company, index) => (
          <button
            key={index}
            className="px-12 py-4 bg-slate-100 rounded text-slate-600 text-sm sm:text-base hover:bg-slate-600 hover:text-white active:scale-95 transition-all duration-300 whitespace-nowrap"
          >
            {company}
          </button>
        ))}
      </div>

      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default CategoriesMarquee;
