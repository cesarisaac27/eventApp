import { useEffect, useState } from "react";
import { getMyEvent } from "../services/eventApi";

export default function DashboardPage() {

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadEvent = async () => {

            try {

                const data = await getMyEvent();

                setEvent(data);

            } catch (error) {

                console.error("Error loading event:", error);

            } finally {

                setLoading(false);
            }
        };

        loadEvent();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div>
            <h1>{event.eventName}</h1>

            <p>{event.eventDescription}</p>

            <p>{event.slug}</p>
        </div>
    );
}