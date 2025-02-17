import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import codecollaboration from "../assets/interviewroom.png";
export function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center backdrop-blur-md bg-gray-900/80 sticky top-0 z-50">
        <a className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6 text-emerald-400" />
          <span className="text-emerald-400 font-bold text-2xl pl-2 hover:text-emerald-300 transition-colors">
            CodeAlong
          </span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {["Features", "About", "Contact"].map((item) => (
            <a
              key={item}
              className="pt-1 text-lg font-medium text-gray-300 hover:text-emerald-400 transition-all hover:underline underline-offset-4"
              href={`#${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
          <Button
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white hover:scale-105 transition-transform shadow-lg shadow-emerald-900/30"
            onClick={() => navigate("/join-interview")}
          >
            Create/Join Room
          </Button>
        </nav>
      </header> */}

      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="flex flex-col items-center justify-center  max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-6">
              <div className="animate-fadeInUp flex items-center justify-center">
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Real-Time Coding Interview 
                </h1>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <div>
                  <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl text-center">
                  CodeHireX revolutionizes technical interviews by offering real-time code collaboration, integrated video calls, live code editor synchronization, and seamless execution with Judge0 integration. Experience an immersive, interactive environment where candidates can showcase their skills, and recruiters can conduct fair and dynamic evaluations. The auto full-screen mode ensures an uninterrupted experience, while attempting to exit full-screen will prompt a confirmation to stay in the interview.
                  </p>
                </div>

                <div className="space-x-4 flex flex-col items-center justify-center">
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white hover:scale-105 transition-transform shadow-lg shadow-emerald-900/30"
                    onClick={() => navigate("/join-interview")}
                  >
                    Create/Join Room
                  </Button>
                </div>
              </div>
            </div>

            <img
              alt="Hero"
              className="mx-auto overflow-hidden rounded-xl object-cover animate-float shadow-2xl shadow-emerald-900/30 border-2 border-emerald-900/50 max-w-[90%] h-auto"
              height="450"
              src={codecollaboration}
              width="900"
            />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div
            className=" space-y-12 px-4 md:px-6"
            style={{ backgroundColor: "transparent" }}
          >
            <div className="mx-auto grid max-w-4xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-gradient-to-br from-gray-500 to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-800 cursor-pointer"
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-pink-600 to-red-600 flex items-center justify-center group-hover:from-pink-500 group-hover:to-red-500 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
}

const features = [
  {
    title: "Real-time Code Sharing",
    description:
      "Work together on the same codefile in real-time, with simultaneous editing and instant updates.",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Video and Voice Calls",
    description:
      "Enhance collaboration with face-to-face communication through seamless video and voice.",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Integrated Chat",
    description:
      "Built-in chat feature ensuring quick communication during coding sessions.",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    title: "Code Execution",
    description:
      "Real-time code execution with Judge0 integration for instant feedback.",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Collaborative Editing",
    description: "Seamless team collaboration with simultaneous code updates.",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
  },
  {
    title: "Secure & Scalable",
    description: "Enterprise-grade security and scalability for your projects.",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
