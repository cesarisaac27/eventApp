import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvent } from "../services/eventApi";
import { useImageTheme } from "../hooks/useImageTheme";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DashboardPage() {

    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const theme = useImageTheme(event?.coverImageUrl);


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


    /*
     * ============================
     * LOADING
     * ============================
     */

    if (loading) {

        return (
            <div className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-950
                text-white
            ">

                <div className="text-center">

                    <div
                        className="
                            w-10
                            h-10
                            border-4
                            border-white/20
                            border-t-white
                            rounded-full
                            animate-spin
                            mx-auto
                            mb-4
                        "
                    />

                    <p className="text-white/70">
                        Loading event...
                    </p>

                </div>

            </div>
        );
    }


    /*
     * ============================
     * EVENT NOT FOUND
     * ============================
     */

    if (!event) {

        return (
            <div className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-slate-950
                text-white
            ">

                <div className="text-center">

                    <h1 className="
                        text-2xl
                        font-bold
                        mb-2
                    ">
                        Event not found
                    </h1>

                    <p className="text-white/60">
                        We couldn't load your event.
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="
            relative
            min-h-screen
            overflow-hidden
            bg-black
        ">


            {/* =================================
                EVENT BACKGROUND
            ================================== */}

            <div
                className="
                    absolute
                    inset-0
                    bg-cover
                    bg-center
                    bg-fixed
                "
                style={{
                    backgroundImage: `url(${event.coverImageUrl})`,
                }}
            />


            {/* Dark overlay */}

            <div className="
                absolute
                inset-0
                bg-black/40
            " />


            {/* Gradient */}

            <div
                className="
                    absolute
                    inset-0
                "
                style={{
                    background: `
                        linear-gradient(
                            180deg,
                            rgba(0,0,0,0.55) 0%,
                            rgba(0,0,0,0.10) 35%,
                            rgba(0,0,0,0.70) 100%
                        )
                    `,
                }}
            />


            {/* =================================
                PAGE CONTENT
            ================================== */}

            <div className="
                relative
                z-10
                min-h-screen
                flex
                flex-col
            ">


                {/* =================================
                    EXISTING HEADER
                ================================== */}

                <Header
                    slug={event.slug}
                    imageUrl={event.coverImageUrl}
                />


                {/* =================================
                    MAIN
                ================================== */}

                <main className="
                    flex-1
                    flex
                    flex-col
                    justify-end
                    px-5
                    md:px-12
                    pt-28
                    pb-12
                ">

                    <div className="
                        w-full
                        max-w-5xl
                        mx-auto
                    ">


                        {/* =================================
                            EVENT OWNER LABEL
                        ================================== */}

                        <div className="mb-5">

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-medium
                                    text-white
                                    backdrop-blur-xl
                                    border
                                "
                                style={{
                                    background:
                                        theme?.glass ||
                                        "rgba(255,255,255,0.10)",

                                    borderColor:
                                        theme?.glassBorder ||
                                        "rgba(255,255,255,0.20)",
                                }}
                            >

                                Event Owner

                            </span>

                        </div>


                        {/* =================================
                            EVENT NAME
                        ================================== */}

                        <h1 className="
                            text-4xl
                            md:text-6xl
                            lg:text-7xl
                            font-black
                            text-white
                            tracking-tight
                            drop-shadow-2xl
                            mb-3
                        ">

                            {event.eventName}

                        </h1>


                        {/* =================================
                            DESCRIPTION
                        ================================== */}

                        {event.eventDescription && (

                            <p className="
                                max-w-2xl
                                text-white/75
                                text-sm
                                md:text-base
                                mb-8
                            ">

                                {event.eventDescription}

                            </p>

                        )}


                        {/* =================================
                            ACTION PANEL
                        ================================== */}

                        <div
                            className="
                                rounded-3xl
                                p-4
                                md:p-6
                                backdrop-blur-2xl
                                border
                                shadow-2xl
                            "
                            style={{
                                background:
                                    theme?.glass ||
                                    "rgba(255,255,255,0.10)",

                                borderColor:
                                    theme?.glassBorder ||
                                    "rgba(255,255,255,0.18)",
                            }}
                        >


                            {/* =================================
                                SHOW MESSAGES
                            ================================== */}

                            <button
                                onClick={() =>
                                    navigate(
                                        `/dashboard/${event.slug}/messages`
                                    )
                                }
                                className="
                                    group
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    px-6
                                    py-5
                                    md:px-8
                                    md:py-6
                                    rounded-2xl
                                    text-left
                                    transition-all
                                    duration-300
                                    hover:scale-[1.01]
                                    active:scale-[0.99]
                                    shadow-lg
                                "
                                style={{
                                    background:
                                        theme?.accent ||
                                        "#ef4444",

                                    color: "#ffffff",
                                }}
                            >

                                <div>

                                    <p className="
                                        text-xs
                                        md:text-sm
                                        uppercase
                                        tracking-widest
                                        opacity-80
                                        mb-1
                                    ">
                                        Memories
                                    </p>

                                    <p className="
                                        text-2xl
                                        md:text-3xl
                                        font-bold
                                    ">
                                        Show Messages
                                    </p>

                                    <p className="
                                        text-sm
                                        opacity-80
                                        mt-1
                                    ">
                                        View all the memories shared
                                        by your guests
                                    </p>

                                </div>


                                <div className="
                                    h-12
                                    w-12
                                    md:h-14
                                    md:w-14
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    bg-white/15
                                    text-2xl
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                    shrink-0
                                ">
                                    →
                                </div>

                            </button>


                            {/* =================================
                                SECONDARY ACTIONS
                            ================================== */}

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-3
                                mt-3
                            ">


                                {/* EDIT MESSAGES */}

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/${event.slug}/edit-messages`
                                        )
                                    }
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-4
                                        px-5
                                        py-4
                                        rounded-2xl
                                        text-white
                                        text-left
                                        border
                                        transition-all
                                        duration-300
                                        hover:bg-white/10
                                        hover:-translate-y-0.5
                                    "
                                    style={{
                                        borderColor:
                                            theme?.glassBorder ||
                                            "rgba(255,255,255,0.18)",
                                    }}
                                >

                                    <div className="
                                        h-10
                                        w-10
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                        bg-white/10
                                        text-lg
                                        shrink-0
                                    ">
                                        ✎
                                    </div>


                                    <div>

                                        <p className="font-semibold">
                                            Edit Messages
                                        </p>

                                        <p className="
                                            text-xs
                                            text-white/55
                                            mt-0.5
                                        ">
                                            Manage your event messages
                                        </p>

                                    </div>

                                </button>


                                {/* PROFILE */}

                                <button
                                    onClick={() =>
                                        navigate("/profile")
                                    }
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-4
                                        px-5
                                        py-4
                                        rounded-2xl
                                        text-white
                                        text-left
                                        border
                                        transition-all
                                        duration-300
                                        hover:bg-white/10
                                        hover:-translate-y-0.5
                                    "
                                    style={{
                                        borderColor:
                                            theme?.glassBorder ||
                                            "rgba(255,255,255,0.18)",
                                    }}
                                >

                                    <div className="
                                        h-10
                                        w-10
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                        bg-white/10
                                        text-lg
                                        shrink-0
                                    ">
                                        ♙
                                    </div>


                                    <div>

                                        <p className="font-semibold">
                                            Profile Edit
                                        </p>

                                        <p className="
                                            text-xs
                                            text-white/55
                                            mt-0.5
                                        ">
                                            Update your account information
                                        </p>

                                    </div>

                                </button>

                            </div>

                        </div>

                    </div>

                </main>


                {/* =================================
                    EXISTING FOOTER
                ================================== */}

                <Footer />

            </div>

        </div>
    );
}