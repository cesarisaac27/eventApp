import { useImageLuminance } from "../hooks/useImageLuminance";

export default function EventHero({ event }) {
  if (!event) return null;

  const isDark = useImageLuminance(event.coverImageUrl);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* Background */}
      <img
        src={event.coverImageUrl}
        alt={event.eventName}
        className="absolute inset-0 w-full h-full object-cover object-[50%_25%] scale-105"
      />

      {/* Overlay suave (NO oscuro fuerte) */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Gradiente PRINCIPAL (clave de tu diseño) */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-transparent
          via-white/10
          to-white/90
        "
      />

      {/* BOTÓN (zona media como tu rectángulo rojo) */}
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 z-10">

        <button
          className="
            px-12 py-5
            rounded-full
            text-lg font-semibold
            shadow-2xl
            backdrop-blur-md
            bg-white/70
            text-black
            border border-black/10
            hover:bg-white
            transition
            transform hover:scale-105
          "
        >
          Write a Message
        </button>
      </div>

      {/* TÍTULO (zona baja como tu recuadro negro/gris) */}
      <div className="absolute bottom-16 left-6 md:left-12 z-10 max-w-2xl">

        <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
          {event.eventName}
        </h1>

        {event.eventDate && (
          <p className="mt-4 text-lg md:text-xl text-black/70">
            {event.eventDate}
          </p>
        )}

        {event.eventDescription && (
          <p className="mt-5 text-sm md:text-base text-black/60">
            {event.eventDescription}
          </p>
        )}

      </div>

    </section>
  );
}