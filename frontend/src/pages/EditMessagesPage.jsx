import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {getEventMessages, getMyEvent, toggleMessageApproval, deleteEventMessage,} from "../services/eventApi";

import { useImageTheme } from "../hooks/useImageTheme";

import Header from "../components/Header";
import Footer from "../components/Footer";


export default function EditMessagesPage() {

    const { slug } = useParams();

    const [event, setEvent] = useState(null);
    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [processingId, setProcessingId] = useState(null);


    /*
     * EVENT THEME
     */

    const theme = useImageTheme(
        event?.coverImageUrl
    );


    /*
     
     * LOAD DATA
     
     */

    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);
                setError(false);


                /*
                 * Get event
                 */

                const eventData = await getMyEvent();

                setEvent(eventData);


                /*
                 * Get ALL messages
                 *
                 * This endpoint returns both:
                 *
                 * approved = true
                 * approved = false
                 */

                const messagesData =
                    await getEventMessages(slug);

                setMessages(messagesData);

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
     * ========================================
     * SHOW / HIDE MESSAGE
     * ========================================
     */

    const handleToggleApproval = async (messageId) => {

        try {

            setProcessingId(messageId);

            const updatedMessage = await toggleMessageApproval(slug, messageId);

            setMessages((currentMessages) =>
                currentMessages.map((message) => {

                    if (message.id !== messageId) {
                        return message;
                    }

                /*
                 * If the backend returns the complete
                 * updated message, use it.
                 */
                    if (updatedMessage && typeof updatedMessage === "object" && updatedMessage.id) {
                        return updatedMessage;
                    }

                /*
                 * Otherwise just toggle the local
                 * approved state.
                 */
                    return {...message, approved: !message.approved,};

                })
            );  

        } catch (error) {

            console.error("Error updating message:", error);

        } finally {

            setProcessingId(null);

        }

    };


    /*
     * ========================================
     * DELETE MESSAGE
     * ========================================
     */

    const handleDelete = async (messageId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this message?\n\n"+
            "This message will be permanently deleted"
        );


        if (!confirmed) {
            return;
        }


        try {

            setProcessingId(messageId);


            await deleteEventMessage(
                slug,
                messageId
            );


            /*
             * Remove the deleted message
             * from the current list.
             */

            setMessages((currentMessages) =>
                currentMessages.filter(
                    (message) =>
                        message.id !== messageId
                )
            );

        } catch (error) {

            console.error(
                "Error deleting message:",
                error
            );

        } finally {

            setProcessingId(null);

        }

    };


    /*
     * ========================================
     * LOADING
     * ========================================
     */

    if (loading) {

        return (
            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-slate-950
                    text-white
                "
            >

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
     * ========================================
     * ERROR
     * ========================================
     */

    if (error || !event) {

        return (
            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-slate-950
                    text-white
                "
            >

                <div className="text-center">

                    <h1
                        className="
                            text-2xl
                            font-bold
                            mb-2
                        "
                    >
                        Something went wrong
                    </h1>

                    <p className="text-white/60">
                        We couldn't load the messages.
                    </p>

                </div>

            </div>
        );

    }


    return (

        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-black
            "
        >


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
                    backgroundImage:
                        `url(${event.coverImageUrl})`,
                }}
            />


            {/* =================================
                DARK OVERLAY
            ================================== */}

            <div
                className="
                    fixed
                    inset-0
                    bg-black/60
                "
            />


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
                            rgba(0,0,0,0.20) 40%,
                            rgba(0,0,0,0.80) 100%
                        )
                    `,
                }}
            />


            {/* =================================
                PAGE
            ================================== */}

            <div
                className="
                    relative
                    z-10
                    min-h-screen
                    flex
                    flex-col
                "
            >


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

                <main
                    className="
                        flex-1
                        px-5
                        md:px-10
                        pt-28
                        pb-12
                    "
                >

                    <div
                        className="
                            max-w-6xl
                            mx-auto
                        "
                    >


                        {/* =================================
                            PAGE TITLE
                        ================================== */}

                        <div className="mb-8">

                            <div
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
                                    mb-4
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
                                Message Management
                            </div>


                            <h1
                                className="
                                    text-4xl
                                    md:text-5xl
                                    font-black
                                    text-white
                                    tracking-tight
                                "
                            >
                                Messages for{" "}
                                {event.eventName}
                            </h1>


                            <p
                                className="
                                    text-white/60
                                    mt-3
                                "
                            >
                                Manage the messages shared by
                                your guests.
                            </p>


                            {/* MESSAGE COUNT */}

                            <p
                                className="
                                    text-white/40
                                    text-sm
                                    mt-2
                                "
                            >
                                {messages.length}{" "}
                                {messages.length === 1
                                    ? "message"
                                    : "messages"}
                            </p>

                        </div>


                        {/* =================================
                            NO MESSAGES
                        ================================== */}

                        {messages.length === 0 ? (

                            <div
                                className="
                                    rounded-3xl
                                    p-12
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
                                        text-4xl
                                        mb-4
                                    "
                                    style={{
                                        color:
                                            theme?.accent ||
                                            "#ef4444",
                                    }}
                                >
                                    ♡
                                </div>


                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        text-white
                                    "
                                >
                                    No messages
                                </h2>


                                <p
                                    className="
                                        text-white/60
                                        mt-2
                                    "
                                >
                                    There are no messages
                                    to manage yet.
                                </p>

                            </div>

                        ) : (

                            /* =================================
                                MESSAGE LIST
                            ================================== */

                            <div className="space-y-4">

                                {messages.map((message) => (

                                    <MessageRow
                                        key={message.id}
                                        message={message}
                                        theme={theme}
                                        processing={
                                            processingId ===
                                            message.id
                                        }
                                        onToggleApproval={
                                            handleToggleApproval
                                        }
                                        onDelete={
                                            handleDelete
                                        }
                                    />

                                ))}

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
 * MESSAGE ROW
 * ========================================
 */

function MessageRow({
    message,
    theme,
    processing,
    onToggleApproval,
    onDelete,
}) {

    return (

        <article
            className="
                rounded-2xl
                p-4
                md:p-5
                backdrop-blur-2xl
                border
                shadow-xl
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
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    gap-5
                "
            >


                {/* =================================
                    MEDIA
                ================================== */}

                <div className="shrink-0">

                    {message.photoUrl ? (

                        <img
                            src={message.photoUrl}
                            alt={`${message.firstName}'s memory`}
                            className="
                                w-24
                                h-24
                                md:w-28
                                md:h-28
                                rounded-xl
                                object-cover
                            "
                        />

                    ) : message.videoUrl ? (

                        <video
                            src={message.videoUrl}
                            className="
                                w-24
                                h-24
                                md:w-28
                                md:h-28
                                rounded-xl
                                object-cover
                                bg-black/30
                            "
                        />

                    ) : (

                        <div
                            className="
                                w-24
                                h-24
                                md:w-28
                                md:h-28
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-white/10
                                text-2xl
                            "
                            style={{
                                color:
                                    theme?.accent ||
                                    "#ef4444",
                            }}
                        >
                            ♥
                        </div>

                    )}

                </div>


                {/* =================================
                    MESSAGE INFORMATION
                ================================== */}

                <div
                    className="
                        flex-1
                        min-w-0
                    "
                >

                    {/* NAME + STATUS */}

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                            mb-1
                        "
                    >

                        <h2
                            className="
                                text-lg
                                font-bold
                                text-white
                            "
                        >
                            {message.firstName}{" "}
                            {message.lastName}
                        </h2>


                        {message.approved ? (

                            <span
                                className="
                                    px-2.5
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                    bg-green-400/15
                                    text-green-300
                                    border
                                    border-green-300/20
                                "
                            >
                                Showed
                            </span>

                        ) : (

                            <span
                                className="
                                    px-2.5
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                    bg-yellow-400/15
                                    text-yellow-300
                                    border
                                    border-yellow-300/20
                                "
                            >
                                Hidden
                            </span>

                        )}

                    </div>


                    {/* RELATIONSHIP */}

                    {message.relationship && (

                        <p
                            className="
                                text-sm
                                text-white/45
                                mb-2
                            "
                        >
                            {message.relationship}
                        </p>

                    )}


                    {/* MESSAGE */}

                    <p
                        className="
                            text-sm
                            md:text-base
                            text-white/75
                            leading-6
                            line-clamp-2
                        "
                    >
                        {message.message}
                    </p>


                    {/* DATE */}

                    {message.createdAt && (

                        <p
                            className="
                                text-xs
                                text-white/35
                                mt-2
                            "
                        >
                            {formatDate(
                                message.createdAt
                            )}
                        </p>

                    )}

                </div>


                {/* =================================
                    ACTIONS
                ================================== */}

                <div
                    className="
                        flex
                        flex-row
                        md:flex-col
                        gap-2
                        shrink-0
                    "
                >

                    {/* SHOW / HIDE */}

                    <button
                        disabled={processing}
                        onClick={() =>
                            onToggleApproval(
                                message.id
                            )
                        }
                        className="
                            px-4
                            py-2.5
                            rounded-xl
                            text-sm
                            font-semibold
                            text-white
                            border
                            transition-all
                            duration-300
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            hover:bg-white/10
                        "
                        style={{
                            borderColor:
                                theme?.glassBorder ||
                                "rgba(255,255,255,0.18)",
                        }}
                    >

                        {processing
                            ? "..."
                            : message.approved
                                ? "Hide message"
                                : "Show message"
                        }

                    </button>


                    {/* DELETE */}

                    <button
                        disabled={processing}
                        onClick={() =>
                            onDelete(message.id)
                        }
                        className="
                            px-4
                            py-2.5
                            rounded-xl
                            text-sm
                            font-semibold
                            text-red-300
                            border
                            border-red-300/20
                            bg-red-400/5
                            transition-all
                            duration-300
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            hover:bg-red-400/15
                        "
                    >
                        Delete message
                    </button>

                </div>

            </div>

        </article>
    );
}


/*
 * DATE FORMAT 
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