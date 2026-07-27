import { useState } from "react";
import { useImageTheme } from "../hooks/useImageTheme";

export default function Footer({ imageUrl }) {
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
      <footer
        className="relative overflow-hidden border-t mt-auto"
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
                color: "#ef4444",
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
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.glass;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              onClick={() =>
                openModal(
                  "Privacy Policy",
                  "We do not store any personal information about any of the participants or event owners."
                )
              }
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
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.glass;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              onClick={() =>
                openModal(
                  "Help",
                  "if you encounter any issue regarding the application or your data please contact support"
                )
              }
            >
              Help
            </button>
          </div>
        </div>
      </footer>

      {/* Modal */}

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
              <p className="leading-7 text-slate-600">
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