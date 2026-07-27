import { useImageTheme } from "../hooks/useImageTheme";
import { useNavigate } from "react-router-dom";


const BRAND_ACCENT = "#ef4444";

export default function EventHero({ event }) {
  if (!event) return null;

  const theme = useImageTheme(event.coverImageUrl);
  const navigate = useNavigate();

  return (
    <section
      className="
        relative
        w-full
        min-h-screen
        flex
        flex-col
        justify-end
        overflow-hidden
      "
    >
      {/* Imagen */}
      <img
        src={event.coverImageUrl}
        alt={event.eventName}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
        style={{
          objectPosition: "center 20%",
          filter: "brightness(.96) saturate(1.15) contrast(1.05)",
        }}
      />

      {/* Oscurecimiento general y difuminado progresivo a blanco */}
      <div
        className="
          absolute
          inset-0
        "
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,.25) 0%,
              rgba(0,0,0,.10) 40%,
              rgba(0,0,0,.40) 70%,
              rgba(255,255,255,.85) 90%,
              rgba(255,255,255,1) 100%
            )
          `,
        }}
      />

      {/* Contenido empujado hacia abajo de forma natural */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          w-full
          px-12
          pb-24
          pt-32
        "
      >
        <button
          onClick={() => navigate(`/${event.slug}/write-message`)}
          className="
          mb-6
          px-5
          py-2.5
          rounded-lg
          text-sm
          font-semibold
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-105
          active:scale-95
          "
          style={{
            background: "rgba(0,0,0,.35)",
            border: "1px solid rgba(255,255,255,.25)",
            color: "#fff",
          }}
        >
          Write a Message
        </button>

        <h1
          className="
            text-6xl
            md:text-7xl
            lg:text-8xl
            font-black
            tracking-tight
            leading-none
            text-white
          "
          style={{
            textShadow: "0 6px 25px rgba(0,0,0,.45)",
          }}
        >
          {event.eventName}
        </h1>

        <div
          className="mt-6 mb-6 h-1 rounded-full"
          style={{
            width: 140,
            background: BRAND_ACCENT,
          }}
        />

        {event.eventDate && (
          <p className="mb-2 text-xl font-medium text-white/90">
            {event.eventDate}
          </p>
        )}

        {/* Descripción del evento (event_description) soportando saltos de línea */}
        {event.eventDescription && (
          <p
            className="
              max-w-2xl
              text-lg
              leading-8
              text-black/85
            "
            style={{
              whiteSpace: "pre-line"
            }}
          >
            {event.eventDescription}
          </p>
        )}
      </div>
    </section>
  );
}