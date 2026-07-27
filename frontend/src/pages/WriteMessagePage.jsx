import { useMemo, useState, useEffect, useRef} from "react";
import { useParams, useNavigate  } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventHero from "../components/EventHero";
import { useImageTheme } from "../hooks/useImageTheme";

export default function WriteMessagePage() {
  
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const firstNameRef = useRef(null);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {

  fetch(`${API_URL}/api/public/events/${slug}`)
    .then(r => r.json())
    .then(setEvent);

  }, [slug]);

  useEffect(() => {
    if (event && firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, [event]);


  const theme = useImageTheme(event?.coverImageUrl);

  const [step, setStep] = useState(1);
  

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    message: "",
    files: [],
  });

  const canContinue = useMemo(() => {
    return (
      form.firstName.trim() !== "" &&
      form.message.trim() !== ""
    );
  }, [form]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (!canContinue) return;
    setStep(2);
  };

  const previousStep = () => {
    setStep(1);
  };

    const uploadFile = async () => {

        if (form.files.length === 0) {
            return null;
        }


        const file = form.files[0];

        const formData = new FormData();

        formData.append("file", file);


        const response = await fetch(
            `${API_URL}/api/upload`,
            {
                method: "POST",
                body: formData,
            }
        );


        if (!response.ok) {
            throw new Error("File upload failed");
        }

        const data = await response.json();

        return {
            url: data.url,
            type: file.type
            };
    };

    const shareMemory = async () => {

        setError("");
        setSuccess("");

        try {

            const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB

            const file = form.files[0];

            if(file && !file.type.startsWith("image") && !file.type.startsWith("video")) {
                setError("Only images and videos are allowed.");
                return;
            }

            if (file && file.size > MAX_FILE_SIZE) {
                setError("Files larger than 500 MB are not supported.");
                return;
            }
            
            setUploading(true);
            setError("");


            let uploadedFile = null;


            // 1. Subir archivo si existe
            uploadedFile = await uploadFile();



            let photoUrl = null;
            let videoUrl = null;


            if (uploadedFile) {

                if (uploadedFile.type.startsWith("image")) {
                    photoUrl = uploadedFile.url;
                }


                if (uploadedFile.type.startsWith("video")) {
                    videoUrl = uploadedFile.url;
                }

            }



            // 2. Guardar mensaje
            const response = await fetch(
                `${API_URL}/api/public/events/${slug}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    relationship: form.relationship,
                    message: form.message,
                    photoUrl,
                    videoUrl,
                    }),
                }
            );


            if (!response.ok) {
                throw new Error("Message creation failed");
            }


            const result = await response.json();


            console.log(
                "Saved message:",
                result
            );


            setSuccess("Your memory has been shared successfully!");

            setTimeout(() => {
                navigate(`/${slug}`, { replace: true });
            }, 2000);



        } catch (error) {

            console.error(error);

            setSuccess("");

            setError(
                "Something went wrong. Please try again."
            );


        } finally {

            setUploading(false);

        }

    };




  if (!event) {
    return <div className="min-h-screen flex items-center justify-center">
    Loading...
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <Header
        slug={slug}
        imageUrl={event?.coverImageUrl}
      />

      <EventHero event={event} />

      <main className="relative z-20 flex-1 -mt-24 pb-24">

        <div className="max-w-4xl mx-auto px-6">

          <div
            className="overflow-hidden rounded-[34px] bg-white shadow-2xl"
            style={{
              border: `1px solid ${theme.glassBorder}`,
            }}
          >

            {/* ---------- HEADER ---------- */}

            <div className="px-10 pt-10">

              <h1 className="text-4xl font-bold text-slate-900">
                Leave your memory
              </h1>

              <p className="mt-3 text-slate-500 text-lg">
                Tell everyone what this person means to you.
              </p>

            </div>

            {/* ---------- STEPPER ---------- */}

            <div className="px-10 mt-10 mb-8">

              <div className="flex items-center">

                <div className="flex flex-col items-center">

                  <div
                    className="flex items-center justify-center rounded-full text-white font-bold transition-all"
                    style={{
                      width: 46,
                      height: 46,
                      background:
                        step >= 1
                          ? theme.accent
                          : "#cbd5e1",
                    }}
                  >
                    {step === 1 ? "1" : "✓"}
                  </div>

                  <span className="mt-3 text-sm font-semibold text-slate-600">
                    Details
                  </span>

                </div>

                <div
                  className="mx-5 h-[4px] flex-1 rounded-full transition-all duration-500"
                  style={{
                    background:
                      step === 2
                        ? theme.accent
                        : "#e2e8f0",
                  }}
                />

                <div className="flex flex-col items-center">

                  <div
                    className="flex items-center justify-center rounded-full text-white font-bold transition-all"
                    style={{
                      width: 46,
                      height: 46,
                      background:
                        step === 2
                          ? theme.accent
                          : "#cbd5e1",
                    }}
                  >
                    2
                  </div>

                  <span className="mt-3 text-sm font-semibold text-slate-600">
                    Media
                  </span>

                </div>

              </div>

            </div>

            {/* ---------- SLIDER ---------- */}

            <div className="overflow-hidden">

              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  width: "200%",
                  transform:
                    step === 1
                      ? "translateX(0%)"
                      : "translateX(-50%)",
                }}
              >

                {/* =================================================== */}
                {/* STEP 1 */}
                {/* =================================================== */}

                <section className="w-1/2 px-10 pb-10">

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* First Name */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>

                      <input
                        ref={firstNameRef}
                        type="text"
                        value={form.firstName}
                        onChange={(e) =>
                          updateField("firstName", e.target.value)
                        }
                        placeholder="John"
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-white
                          px-5
                          py-4
                          outline-none
                          transition-all
                          duration-300
                          focus:border-transparent
                          focus:shadow-lg
                        "
                        style={{
                          boxShadow: "0 0 0 0px transparent",
                        }}
                        onFocus={(e) => {
                          e.target.style.boxShadow = `0 0 0 4px ${theme.accent}22`;
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = "0 0 0 0 transparent";
                        }}
                      />

                    </div>

                    {/* Last Name */}

                    <div>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Last Name
                      </label>

                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) =>
                          updateField("lastName", e.target.value)
                        }
                        placeholder="Doe"
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-white
                          px-5
                          py-4
                          outline-none
                          transition-all
                          duration-300
                          focus:border-transparent
                          focus:shadow-lg
                        "
                        onFocus={(e) => {
                          e.target.style.boxShadow = `0 0 0 4px ${theme.accent}22`;
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = "0 0 0 0 transparent";
                        }}
                      />

                    </div>

                  </div>

                  {/* Relationship */}

                  <div className="mt-7">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Relationship
                    </label>

                    <input
                      type="text"
                      value={form.relationship}
                      onChange={(e) =>
                        updateField("relationship", e.target.value)
                      }
                      placeholder="Friend, Brother, Sister..."
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-4
                        outline-none
                        transition-all
                        duration-300
                      "
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 0 4px ${theme.accent}22`;
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "0 0 0 0 transparent";
                      }}
                    />

                  </div>

                  {/* Message */}

                  <div className="mt-7">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      rows={8}
                      maxLength={500}
                      value={form.message}
                      onChange={(e) =>
                        updateField("message", e.target.value)
                      }
                      placeholder="Write something unforgettable..."
                      className="
                        w-full
                        resize-none
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-4
                        outline-none
                        transition-all
                        duration-300
                      "
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 0 4px ${theme.accent}22`;
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "0 0 0 0 transparent";
                      }}
                    />

                    <div className="flex justify-between mt-3">

                      <span className="text-sm text-slate-400">
                        Share a memory that will last forever.
                      </span>

                      <span
                        className={`text-sm ${
                          form.message.length > 450
                            ? "text-red-500"
                            : "text-slate-400"
                        }`}
                      >
                        {form.message.length}/500
                      </span>

                    </div>

                  </div>                    

                  {/* Next Button */}

                  <div className="flex justify-end mt-10">

                    <button
                      onClick={nextStep}
                      disabled={!canContinue}
                      className="
                        rounded-2xl
                        px-8
                        py-4
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:scale-105
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                      style={{
                        background: theme.accent,
                      }}
                    >
                      Next →
                    </button>

                  </div>

                </section>

                                {/* =================================================== */}
                {/* STEP 2 */}
                {/* =================================================== */}

                <section className="w-1/2 px-10 pb-10">

                  <div className="text-center">

                    <div
                      className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                      style={{
                        background: `${theme.accent}15`,
                        color: theme.accent,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900">
                      Upload your memories
                    </h2>

                    <p className="mt-3 text-slate-500">
                      Share photos or videos related to this special moment.
                    </p>

                  </div>

                  <div
                    className="
                      mt-10
                      rounded-3xl
                      border-2
                      border-dashed
                      p-12
                      transition-all
                      duration-300
                      hover:scale-[1.01]
                    "
                    style={{
                      borderColor: theme.accent,
                      background: `${theme.accent}08`,
                    }}
                  >

                    <div className="text-center">

                      <div className="text-6xl mb-4">
                        📷
                      </div>

                      <h3 className="text-xl font-semibold text-slate-800">
                        Drag & Drop your files
                      </h3>

                      <p className="mt-2 text-slate-500">
                        or click below to browse your device
                      </p>
                      <input
                        id="media-upload"
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) =>
                            updateField(
                                "files",
                                Array.from(e.target.files || []).slice(0,1)
                                )
                            }
                      />
                      <label
                        htmlFor="media-upload"
                        className="
                          mt-8
                          inline-flex
                          cursor-pointer
                          rounded-2xl
                          px-8
                          py-4
                          font-semibold
                          text-white
                          transition-all
                          duration-300
                          hover:scale-105
                        "
                        style={{
                          background: theme.accent,
                        }}
                      >
                        Browse Files
                      </label>

                    </div>

                  </div>

                  {form.files.length > 0 && (

                    <div className="mt-8">

                      <h3 className="mb-5 text-lg font-semibold text-slate-800">
                        Selected files
                      </h3>

                      <div className="space-y-3">

                        {form.files.map((file, index) => (

                          <div
                            key={index}
                            className="
                              flex
                              items-center
                              justify-between
                              rounded-2xl
                              border
                              border-slate-200
                              bg-slate-50
                              px-5
                              py-4
                            "
                          >

                            <div className="flex items-center gap-4">

                              <span className="text-2xl">
                                {file.type.startsWith("image")
                                  ? "🖼️"
                                  : "🎥"}
                              </span>

                              <div>

                                <p className="font-medium text-slate-800">
                                  {file.name}
                                </p>

                                <p className="text-sm text-slate-400">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>

                              </div>

                            </div>

                            <button
                              onClick={() =>
                                updateField(
                                  "files",
                                  form.files.filter((_, i) => i !== index)
                                )
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>

                          </div>

                        ))}

                      </div>

                    </div>

                  )}

                  {success && (
                      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                        {success}
                      </div>
                   )}

                  {error && (
                    <div className="mt-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">
                        {error}
                    </div>
                  )}

                  <div className="mt-12 flex justify-between">

                    <button
                      onClick={previousStep}
                      className="
                        rounded-2xl
                        border
                        border-slate-300
                        px-8
                        py-4
                        font-semibold
                        transition-all
                        hover:bg-slate-100
                      "
                    >
                      ← Back
                    </button>

                    <button
                        onClick={shareMemory}
                        disabled={uploading}
                        className="
                        rounded-2xl
                        px-8
                        py-4
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:scale-105
                        disabled:opacity-50
                        "
                        style={{
                            background: theme.accent,
                        }}
                    >
                        {uploading
                        ? "Uploading..."
                        : "Share Memory"}
                    </button>

                  </div>

                </section>
                              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer
        imageUrl={event?.coverImageUrl}
      />

    </div>
  );
}                
                
                
                
                