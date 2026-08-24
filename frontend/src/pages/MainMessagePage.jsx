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

      const response = await fetch(
        `${API_URL}/public/events/${slug}`
      );

      if (!response.ok) {
        throw new Error("Event not found");
      }

      const data = await response.json();
      setEvent(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-xl font-medium">
          Loading event...
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-xl font-medium">
          Event not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">

      {/* Header flotante */}
      <Header
        slug={slug}
        imageUrl={event.coverImageUrl}
      />

      {/* Hero */}
      <EventHero event={event} />

      {/* Footer */}
      <Footer imageUrl={event.coverImageUrl} />

    </div>
  );
}
