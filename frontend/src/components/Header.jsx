import { Link } from "react-router-dom";
import { useImageTheme } from "../hooks/useImageTheme";

export default function Header({ slug, imageUrl }) {
  const theme = useImageTheme(imageUrl);

  return (
    <header
      className="
        absolute
        top-0
        left-0
        w-full
        h-[68px]
        z-50
      "
    >

      {/* Glass */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          background: theme.glass,
          borderBottom: `1px solid ${theme.glassBorder}`,
        }}
      />

      {/* Capa de contraste - independiente del theme dinámico */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      <div
        className="
          relative
          h-full
          flex
          items-center
          pl-28
          pr-20
        "
      >

        {/* Logo */}
        <Link
          to={`/${slug}`}
          className="
            flex
            items-center
            gap-1
            shrink-0
          "
        >

          <span
            className="
              text-[34px]
              font-black
              leading-none
              drop-shadow-sm
            "
            style={{
              color: "#ef4444",
            }}
          >
            e
          </span>


          <span
            className="
              text-[28px]
              font-bold
              tracking-tight
              text-white
              drop-shadow-sm
            "
          >
            ventApp
          </span>

        </Link>



        {/* Empuja todo a la derecha */}
        <div className="flex-1" />



        {/* Navegación derecha */}
        <nav
          className="
            hidden
            md:flex
            items-center
            h-full
            gap-5
          "
        >

          <button
            className="
              h-full
              px-6
              text-white
              transition-all
              duration-300
              hover:bg-white/10
              backdrop-blur-md
            "
          >
            About
          </button>


          <button
            className="
              h-full
              px-6
              text-white
              transition-all
              duration-300
              hover:bg-white/10
              backdrop-blur-md
            "
          >
            Contact
          </button>


        </nav>




        {/* Separación Contact - Sign In */}
        <div className="w-8" />



        {/* Acciones */}
        <div
          className="
            flex
            items-center
            h-full
            gap-7
          "
        >

          <button
            className="
              h-full
              px-6
              text-white
              font-semibold
              transition-all
              duration-300
              hover:bg-white/10
              backdrop-blur-md
            "
          >
            Sign In
          </button>



          {/* Botón ? */}
          <button
            className="
              h-[44px]
              w-[44px]
              rounded-md
              flex
              items-center
              justify-center
              text-xl
              font-bold
              border
              transition-all
              duration-300
              hover:bg-white/10
              backdrop-blur-md
            "
            style={{
              color: "#ef4444",
              borderColor: "rgba(255,255,255,0.18)",
              background:
                "rgba(255,255,255,0.05)",
            }}
          >
            ?
          </button>


        </div>

      </div>

    </header>
  );
}