import { Link } from "react-router-dom";
import { useImageTheme } from "../hooks/useImageTheme";
import { useState } from "react";

export default function Header({ slug, imageUrl }) {
  const theme = useImageTheme(imageUrl);

  const [modal, setModal] = useState({
    open: false,
    title: "",
    text: "",
  });

  const openModal = (title, text) => {
    setModal({
      open: true,
      title,
      text,
    });
  };

  const closeModal = () => {
    setModal({
      open: false,
      title: "",
      text: "",
    });
  };

  return (
    <>
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
            onClick={() =>
            openModal(
              "About EventApp",
              `Purpose of this app.

              This application allows guests to leave messages, photos and videos for a special event.

              Everything is saved securely and can later be transformed into unforgettable memories.`
            )
            }
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
            onClick={() =>
            openModal(
              "Contact",
              `Need help?

              Email:
              cesarisaac27@gmail.com


              We'll be happy to assist you.`
            )
            }
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
              background: "rgba(255,255,255,0.05)",
            }}
            onClick={() =>
              openModal(
              "How it works",
              `1. Write your message.

              2. Upload photos or videos.

              3. Submit your memory.

              The event owner can later view all contributions in one place.`
              )
            }
          >
            ?
          </button>


        </div>

      </div>

    </header>

    {modal.open && (
      <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={closeModal}
      >
      <div
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2
            className="text-xl font-bold"
            style={{ color: theme.accent }}
          >
            {modal.title}
          </h2>

          <button
            onClick={closeModal}
            className="text-2xl text-slate-400 hover:text-slate-700 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-6">
          <p
            className="leading-7 text-slate-600 whitespace-pre-line"
          >
            {modal.text}
          </p>
        </div>

        <div className="flex justify-end px-6 pb-6">
          <button
            onClick={closeModal}
            className="rounded-xl px-5 py-2 text-white transition-transform hover:scale-105"
            style={{
              background: theme.accent,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}

</>

  );
}