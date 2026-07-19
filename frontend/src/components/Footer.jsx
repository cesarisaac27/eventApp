import { useImageTheme } from "../hooks/useImageTheme";

export default function Footer({ imageUrl }) {
  const theme = useImageTheme(imageUrl);

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        mt-auto
      "
      style={{
        borderColor: "rgba(0,0,0,.06)",
        background: "#ffffff",
      }}
    >
      {/* Glow superior */}

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64"
        style={{
          background: theme.accent,
          opacity: 0.35,
        }}
      />

      <div
        className="
          max-w-7xl
          mx-auto
          px-8
          py-10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-6
        "
      >
        {/* Logo */}

        <div className="flex items-center gap-1">

          <span
            className="text-3xl font-black"
            style={{
              color: theme.accent,
            }}
          >
            e
          </span>

          <span className="text-2xl font-bold text-slate-900">
            ventApp
          </span>

        </div>

        {/* Centro */}

        <div className="text-center">

          <p className="text-slate-500 text-sm">
            Celebrate unforgettable moments with the people you love.
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400">

            <span>Made with</span>

            <span
              className="
                transition-transform
                duration-300
                hover:scale-125
                hover:animate-pulse
              "
              style={{
                color: theme.accent,
              }}
            >
              ❤
            </span>

            <span>by eventApp</span>

          </div>

        </div>

        {/* Derecha */}

        <div className="flex items-center gap-6">

          <button
            className="
              transition-all
              duration-300
              px-3
              py-2
              rounded-xl
            "
            style={{
              color: "#64748b",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.glass;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Privacy
          </button>

          <button
            className="
              transition-all
              duration-300
              px-3
              py-2
              rounded-xl
            "
            style={{
              color: "#64748b",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.glass;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Help
          </button>

        </div>

      </div>
    </footer>
  );
}
