export const ShinyButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`relative overflow-hidden rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};