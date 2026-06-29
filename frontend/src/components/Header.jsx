import { Link } from "react-router-dom";

export default function Header({ slug }) {
  return (
    <header className="bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to={`/${slug}`}
          className="
            flex
            items-center
            gap-2
            group
          "
        >
          <span
            className="
              text-3xl
              font-black
              text-pink-500
              group-hover:scale-110
              transition-transform
            "
          >
            e
          </span>

          <span
            className="
              text-white
              text-2xl
              font-bold
              tracking-wide
              group-hover:text-pink-400
              transition-colors
            "
          >
            ventApp
          </span>
        </Link>

        {/* Botones */}
        <div className="flex items-center gap-3">

          <button
            className="
              bg-pink-600
              hover:bg-pink-700
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              transition
            "
          >
            Sign In
          </button>

          <button
            className="
              bg-slate-800
              hover:bg-slate-700
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              transition
            "
          >
            About
          </button>

          <button
            className="
              w-10
              h-10
              bg-slate-800
              hover:bg-slate-700
              text-white
              rounded-full
              transition
            "
          >
            ?
          </button>

        </div>

      </div>
    </header>
  );
}