export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-6">
      <div className="text-center text-slate-300">

        Made with

        <span
            className="
            inline-block
            mx-2
            text-red-500
            transition-transform
            duration-300
            hover:scale-125
            hover:animate-pulse
            "
        >
            ❤️
        </span>

        by eventApp

      </div>
    </footer>
  );
}