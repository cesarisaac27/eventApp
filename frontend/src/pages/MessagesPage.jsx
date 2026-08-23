import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventMessages, getMyEvent } from "../services/eventApi";
import { useImageTheme } from "../hooks/useImageTheme";

import Header from "../components/Header";
import Footer from "../components/Footer";


export default function MessagesPage() {

    const { slug } = useParams();

    const [event, setEvent] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    /*
     * Current message
     */
    const [currentIndex, setCurrentIndex] = useState(0);

    /*
     * Direction of navigation
     *
     *  1  = next
     * -1  = previous
     */
    const [direction, setDirection] = useState(1);


    /*
     * ============================
     * EVENT THEME
     * ============================
     */

    const theme = useImageTheme(event?.coverImageUrl);


    /*
     * ============================
     * LOAD DATA
     * ============================
     */

    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);
                setError(false);


                /*
                 * Get event information
                 */

                const eventData = await getMyEvent();

                setEvent(eventData);


                /*
                 * Get messages
                 */

                const messagesData = await getEventMessages(slug);

                setMessages(messagesData);

                /*
                 * Start at first message
                 */

                setCurrentIndex(0);

            } catch (error) {

                console.error(
                    "Error loading messages:",
                    error
                );

                setError(true);

            } finally {

                setLoading(false);

            }

        };


        loadData();

    }, [slug]);


    /*
     * ============================
     * NAVIGATION
     * ============================
     */

    const goToNext = () => {

        if (currentIndex >= messages.length - 1) {
            return;
        }

        setDirection(1);

        setCurrentIndex((previous) => previous + 1);

    };


    const goToPrevious = () => {

        if (currentIndex <= 0) {
            return;
        }

        setDirection(-1);

        setCurrentIndex((previous) => previous - 1);

    };


    /*
     * ============================
     * KEYBOARD NAVIGATION
     * ============================
     */

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === "ArrowRight") {
                goToNext();
            }

            if (event.key === "ArrowLeft") {
                goToPrevious();
            }

        };


        window.addEventListener(
            "keydown",
            handleKeyDown
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [currentIndex, messages.length]);


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
                        Loading messages...
                    </p>

                </div>

            </div>
        );

    }


    /*
     * ============================
     * ERROR
     * ============================
     */

    if (error || !event) {

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
                        Something went wrong
                    </h1>

                    <p className="text-white/60">
                        We couldn't load the event messages.
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
                BACKGROUND IMAGE
            ================================== */}

            <div
                className="
                    fixed
                    inset-0
                    bg-cover
                    bg-center
                "
                style={{
                    backgroundImage: `url(${event.coverImageUrl})`,
                }}
            />


            {/* =================================
                DARK OVERLAY
            ================================== */}

            <div className="
                fixed
                inset-0
                bg-black/55
            " />


            {/* =================================
                GRADIENT
            ================================== */}

            <div
                className="
                    fixed
                    inset-0
                "
                style={{
                    background: `
                        linear-gradient(
                            180deg,
                            rgba(0,0,0,0.65) 0%,
                            rgba(0,0,0,0.20) 35%,
                            rgba(0,0,0,0.75) 100%
                        )
                    `,
                }}
            />


            {/* =================================
                PAGE
            ================================== */}

            <div className="
                relative
                z-10
                min-h-screen
                flex
                flex-col
            ">


                {/* =================================
                    HEADER
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
                    px-5
                    md:px-10
                    pt-28
                    pb-12
                ">


                    <div className="
                        max-w-5xl
                        mx-auto
                    ">


                        {/* =================================
                            PAGE HEADER
                        ================================== */}

                        <div className="mb-8">

                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-4
                            ">

                                <span
                                    className="
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
                                    Event Memories
                                </span>


                                <span className="
                                    text-white/50
                                    text-sm
                                ">
                                    {messages.length}
                                    {" "}
                                    {messages.length === 1
                                        ? "message"
                                        : "messages"}
                                </span>

                            </div>


                            <h1 className="
                                text-4xl
                                md:text-6xl
                                font-black
                                text-white
                                tracking-tight
                                drop-shadow-2xl
                            ">
                                Messages
                            </h1>


                            <p className="
                                text-white/70
                                mt-3
                                max-w-2xl
                            ">
                                Memories and messages shared by
                                the guests of{" "}
                                <span className="
                                    text-white
                                    font-semibold
                                ">
                                    {event.eventName}
                                </span>
                            </p>

                        </div>


                        {/* =================================
                            NO MESSAGES
                        ================================== */}

                        {messages.length === 0 ? (

                            <div
                                className="
                                    rounded-3xl
                                    p-10
                                    md:p-16
                                    text-center
                                    backdrop-blur-2xl
                                    border
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

                                <div
                                    className="
                                        w-16
                                        h-16
                                        rounded-2xl
                                        mx-auto
                                        mb-5
                                        flex
                                        items-center
                                        justify-center
                                        text-3xl
                                        bg-white/10
                                    "
                                >
                                    ♡
                                </div>


                                <h2 className="
                                    text-2xl
                                    font-bold
                                    text-white
                                    mb-2
                                ">
                                    No messages yet
                                </h2>


                                <p className="
                                    text-white/60
                                    max-w-md
                                    mx-auto
                                ">
                                    Your guests haven't shared
                                    any memories yet. Once they
                                    do, they'll appear here.
                                </p>

                            </div>

                        ) : (

                            /* =================================
                               MESSAGE VIEWER
                            ================================== */

                            <div className="
                                flex
                                items-center
                                justify-center
                                gap-3
                                md:gap-6
                            ">


                                {/* =================================
                                    PREVIOUS BUTTON
                                ================================== */}

                                <NavigationButton
                                    direction="left"
                                    disabled={currentIndex === 0}
                                    onClick={goToPrevious}
                                    theme={theme}
                                />


                                {/* =================================
                                    CARD
                                ================================== */}

                                <div className="
                                    w-full
                                    max-w-2xl
                                    overflow-hidden
                                ">

                                    <div
                                        key={messages[currentIndex].id}
                                        className={
                                            direction === 1
                                                ? "animate-slide-in-right"
                                                : "animate-slide-in-left"
                                        }
                                    >

                                        <MessageCard
                                            message={
                                                messages[currentIndex]
                                            }
                                            theme={theme}
                                        />

                                    </div>

                                </div>


                                {/* =================================
                                    NEXT BUTTON
                                ================================== */}

                                <NavigationButton
                                    direction="right"
                                    disabled={
                                        currentIndex ===
                                        messages.length - 1
                                    }
                                    onClick={goToNext}
                                    theme={theme}
                                />

                            </div>

                        )}


                        {/* =================================
                            COUNTER
                        ================================== */}

                        {messages.length > 0 && (

                            <div className="
                                flex
                                flex-col
                                items-center
                                mt-6
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    mb-3
                                ">

                                    <span className="
                                        text-white
                                        font-semibold
                                    ">
                                        {currentIndex + 1}
                                    </span>

                                    <span className="
                                        text-white/40
                                    ">
                                        /
                                    </span>

                                    <span className="
                                        text-white/50
                                    ">
                                        {messages.length}
                                    </span>

                                </div>


                                {/* =================================
                                    DOTS
                                ================================== */}

                                <div className="
                                    flex
                                    items-center
                                    gap-1.5
                                ">

                                    {messages.map(
                                        (_, index) => (

                                            <button
                                                key={index}
                                                onClick={() => {

                                                    if (
                                                        index >
                                                        currentIndex
                                                    ) {
                                                        setDirection(1);
                                                    } else {
                                                        setDirection(-1);
                                                    }

                                                    setCurrentIndex(index);

                                                }}
                                                className="
                                                    h-1.5
                                                    rounded-full
                                                    transition-all
                                                    duration-300
                                                "
                                                style={{
                                                    width:
                                                        index ===
                                                        currentIndex
                                                            ? "24px"
                                                            : "6px",

                                                    background:
                                                        index ===
                                                        currentIndex
                                                            ? (
                                                                theme?.accent ||
                                                                "#ef4444"
                                                            )
                                                            : "rgba(255,255,255,0.30)",
                                                }}
                                                aria-label={`Go to message ${
                                                    index + 1
                                                }`}
                                            />

                                        )
                                    )}

                                </div>

                            </div>

                        )}

                    </div>

                </main>


                {/* =================================
                    FOOTER
                ================================== */}

                <Footer />

            </div>

        </div>
    );
}


/*
 * ========================================
 * NAVIGATION BUTTON
 * ========================================
 */

function NavigationButton({
    direction,
    disabled,
    onClick,
    theme,
}) {

    const isLeft = direction === "left";


    return (

        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={
                isLeft
                    ? "Previous message"
                    : "Next message"
            }
            className="
                shrink-0
                h-12
                w-12
                md:h-14
                md:w-14
                rounded-full
                flex
                items-center
                justify-center
                text-2xl
                text-white
                border
                backdrop-blur-xl
                transition-all
                duration-300
                disabled:opacity-20
                disabled:cursor-not-allowed
                enabled:hover:scale-110
                enabled:hover:bg-white/10
            "
            style={{
                background:
                    "rgba(255,255,255,0.08)",

                borderColor:
                    theme?.glassBorder ||
                    "rgba(255,255,255,0.18)",
            }}
        >

            {isLeft ? "←" : "→"}

        </button>

    );
}


/*
 * ========================================
 * MESSAGE CARD
 * ========================================
 */

function MessageCard({ message, theme }) {

    const hasPhoto = !!message.photoUrl;
    const hasVideo = !!message.videoUrl;


    return (

        <article
            className="
                group
                overflow-hidden
                rounded-3xl
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
                MEDIA
            ================================== */}

            {(hasPhoto || hasVideo) && (

                <div className="
                    relative
                    w-full
                    aspect-[4/3]
                    overflow-hidden
                    bg-black/30
                ">

                    {hasPhoto && (

                        <img
                            src={message.photoUrl}
                            alt={`${message.firstName}'s memory`}
                            className="
                                w-full
                                h-full
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                        />

                    )}


                    {hasVideo && (

                        <video
                            src={message.videoUrl}
                            controls
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />

                    )}

                </div>

            )}


            {/* =================================
                MESSAGE CONTENT
            ================================== */}

            <div className="p-6">


                {/* NAME */}

                <div className="
                    flex
                    items-start
                    justify-between
                    gap-3
                    mb-4
                ">

                    <div>

                        <h2 className="
                            text-lg
                            font-bold
                            text-white
                        ">
                            {message.firstName}{" "}
                            {message.lastName}
                        </h2>


                        {message.relationship && (

                            <p className="
                                text-sm
                                text-white/50
                                mt-0.5
                            ">
                                {message.relationship}
                            </p>

                        )}

                    </div>


                    {/* HEART */}

                    <div
                        className="
                            w-9
                            h-9
                            rounded-full
                            flex
                            items-center
                            justify-center
                            bg-white/10
                            shrink-0
                        "
                        style={{
                            color:
                                theme?.accent ||
                                "#ef4444",
                        }}
                    >
                        ♥
                    </div>

                </div>


                {/* MESSAGE */}

                <p className="
                    text-white/80
                    leading-7
                    whitespace-pre-line
                ">
                    {message.message}
                </p>


                {/* DATE */}

                {message.createdAt && (

                    <p className="
                        text-xs
                        text-white/40
                        mt-5
                    ">
                        {formatDate(message.createdAt)}
                    </p>

                )}

            </div>

        </article>

    );
}


/*
 * ========================================
 * DATE FORMAT
 * ========================================
 */

function formatDate(date) {

    try {

        return new Intl.DateTimeFormat(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        ).format(new Date(date));

    } catch {

        return "";

    }
}