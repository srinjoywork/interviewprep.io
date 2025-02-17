import React from "react";
import { Button } from "../components/ui/button"; // Import the Button component
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle navigation
import codecollaboration from "../assets/codecollablanding.jpg"; // Ensure you provide the correct path for the image

const Codecollablanding = () => {
  const navigate = useNavigate(); // Initialize useNavigate for page navigation

  return (
    <div>
      <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-gradient-to-br from-[#191714] to-[#2234AE] pb-20">
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="flex flex-col items-center justify-center max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-6">
            <div className="animate-fadeInUp flex items-center justify-center">
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Code-Collaborator
              </h1>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
              <div>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl text-center">
                  CodeHireX revolutionizes technical interviews by offering
                  real-time code collaboration, integrated video calls, live code
                  editor synchronization, and seamless execution with Judge0
                  integration. Experience an immersive, interactive environment
                  where candidates can showcase their skills, and recruiters can
                  conduct fair and dynamic evaluations. The auto full-screen mode
                  ensures an uninterrupted experience, while attempting to exit
                  full-screen will prompt a confirmation to stay in the interview.
                </p>
              </div>

              <div className="space-x-4 flex flex-col items-center justify-center">
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white hover:scale-105 transition-transform shadow-lg shadow-emerald-900/30"
                  onClick={() => navigate("/sign-in")}
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
            src={codecollaboration} // Make sure to provide the correct image path
            width="900"
          />
        </div>
      </section>
    </div>
  );
};

export default Codecollablanding;
