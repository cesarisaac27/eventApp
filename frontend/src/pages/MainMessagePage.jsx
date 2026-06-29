import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import EventHero from "../components/EventHero";

const API_URL = import.meta.env.VITE_API_URL;

export default function MainMessagePage() {
  const { slug } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvent();
  }, [slug]);

  async function loadEvent() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/public/events/${slug}`);

      if (!response.ok) {
        throw new Error("Event not found");
      }

      const data = await response.json();
      setEvent(data);

    } catch (error) {
      setError(error.message);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading event...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="h-screen flex items-center justify-center">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header slug={slug} />
      <EventHero event={event} />

      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* aquí luego irá el editor de mensajes */}
        </div>
      </main>

      <Footer />
    </div>
  );
}