import { Link } from "react-router-dom";
import billOne from "assets/images/billOne.png";
import billTwo from "assets/images/billTwo.png";
import billThree from "assets/darklogo.png";
import billFour from "assets/images/billFour.png";
import phones from "assets/images/phones.png";
import phone from "assets/images/phone.png";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandSparkles,
  faRocket,
  faSwimmer,
  faTh,
} from "@fortawesome/free-solid-svg-icons";

import { Dialog, Transition } from "@headlessui/react";
import { userType } from "libs/isAuth";
import FeatureCard from "../components/FeatureCard/FeatureCard";
import Metrices from "./Metrices/Metrices";
import StayUpdatedSection from "./StayUpdatedSection/StayUpdatedSection";
import Features from "./FeatureCard/Features/Features";
import Contact from "./Contact/Contact";
import RecruiterFeature from "./FeatureCard/RecruiterFeature/RecruiterFeature";
import StudentFeature from "./FeatureCard/StudentFeature/StudentFeature";
import MainHomePage from "../components/MainHomePage/MainHomePage"


export default function Jumbotron() {
  let [isOpen, setIsOpen] = useState(false);
  const type = userType();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {type === "recruiter" ? (
        <main className="bg-gradient-to-br from-[#191714] to-[#2234AE]">
          <div className="w-11/12 flex flex-wrap mx-auto">
            <div className="lg:text-left text-center lg:w-7/12 w-12/12 lg:pt-24 pt-12 lg:pb-40 pb-16 mx-auto">
              <h1 className="text-white lg:text-6xl text-4xl sm:mt-5 font-bold sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                Welcome to Recruiter home
                <br />
              </h1>
              <p className="mt-3 text-xl text-white sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                With profound knowledge in the IT field and specialized skills,
                we can assist you in accessing and recruiting the best IT
                candidates.
              </p>
              <div className="mt-4 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <Link
                  onClick={() => openModal()}
                  className="transform ease-in duration-100 md:mx-0 text-black  font-semibold rounded-xl items-center justify-center py-3 border-2  hover:bg-black hover:text-primary  text-base  bg-primary md:py-4 md:text-lg px-8"
                >
                  See Companies board
                </Link>
              </div>
            </div>

            <div className="md:w-5/12 w-12/12 md:pt-12 md:pl-10 pl-0 pt-0 md:pb-12 pb-20 mx-auto">
              <img
                className="md:mt-28 mt-0 w-full lg:float-right float-none mx-auto"
                src={phones}
                alt="phones"
              />
            </div>
          </div>
          <RecruiterFeature />
          {/* <Contact /> */}
        </main>
      ) : type === "applicant" ? (
        <main className="bg-gradient-to-br from-[#191714] to-[#2234AE]">
        <div className="w-11/12 flex flex-wrap mx-auto">
          <div className="lg:text-left text-center lg:w-7/12 w-12/12 lg:pt-24 pt-12 lg:pb-40 pb-16 mx-auto">
            <h1 className="text-white lg:text-6xl text-4xl sm:mt-5 font-bold sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
              Welcome to Applicant Home
              <br />
            </h1>
            <p className="mt-3 text-xl text-white sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
              With profound knowledge in the IT field and specialized skills,
              we can assist you in accessing and targeting the best IT
              Roles.
            </p>
          </div>

          <div className="md:w-5/12 w-12/12 md:pt-12 md:pl-10 pl-0 pt-0 md:pb-12 pb-20 mx-auto">
            <img
              className="md:mt-28 mt-0 w-full lg:float-right float-none mx-auto"
              src={phones}
              alt="phones"
            />
          </div>
        </div>
        <StudentFeature/>
        {/* <RecruiterFeature /> */}
        {/* <Contact /> */}
      </main>
      ) : (
        <main className="bg-gradient-to-br from-[#191714] to-[#2234AE]">
          {/* <div className="text-center lg:w-7/12 w-12/12 ld:pt-52 md:pt-40 pt-32 pb-52 mx-auto h-2/3">
            <div className="relative w-full bg-light h-2/3 md:block hidden ">
              <img
                src={billThree}
                className="w-32 absolute -top-12 -right-20 md:block hidden"
                alt=""
              />
              <img
                src={billOne}
                className="w-32 absolute md:-top-20 md:-left-20 left-4 top-96"
                alt=""
              />
              <img
                src={billTwo}
                className="w-32 absolute bottom-0 top-52 -left-20 md:block hidden"
                alt=""
              />
              <img
                src={billFour}
                className="w-32 absolute md:bottom-0 md:top-40 md:-right-20 top-96 right-6"
                alt=""
              />
            </div>
            <h1 className="text-black text-6xl md:w-11/12 w-12/12 mx-auto sm:mt-5 font-bold md:mt-5 px-5">
              The best tools for your job application journey
            </h1>
            <p className="mt-3 text-2xl text-black sm:mt-5 md:mt-5 w-10/12 mx-auto">
              Assert yourself through a "quality" profile with valuable tools
              and knowledge from the Job Portal.
            </p>
            <div className="mt-8 sm:mt-12 mx-auto flex gap-3 justify-center">
              <button
                onClick={() => openModal()}
                className="transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg md:mx-0  text-white shadow font-semibold rounded-full items-center justify-center py-3 border border-transparent text-base  bg-[#8f5bfd] md:py-4 md:text-lg px-8"
              >
                Search for a favorite job
              </button>

              <Link
                to="/sign-up"
                className="transform ease-in duration-100 md:mx-0 text-black  font-semibold rounded-full items-center justify-center py-3 border-2  hover:bg-black hover:text-primary  text-base  bg-primary md:py-4 md:text-lg px-8"
              >
                Sign up for free
              </Link>
            </div>

            <div className="relative w-full md:hidden block mt-12">
              <img src={billOne} className="w-32 absolute left-4" />

              <img src={billFour} className="w-32 absolute right-6" />
            </div>
          </div> */}

          <div className="text-center w-[90%] pt-32 pb-52 mx-auto space-y-20 flex flex-col items-center">
            {/* Hero Section */}
            <div className="relative w-[80%] flex flex-col md:flex-row items-center bg-gradient-to-r from-[#f7d4d8] via-[#ffffff] to-[#9ae3f4] text-white p-12 rounded-3xl shadow-2xl transform transition duration-500 hover:scale-105">
              <div className="md:w-1/2 w-full text-left space-y-6">
                <h1 className="text-5xl font-extrabold leading-tight text-violet-500" >
                  Your Career, Your Future
                </h1>
                <p className="text-lg text-black opacity-90">
                  Unlock the best job opportunities with personalized
                  recommendations and expert insights.
                </p>
                <div className="mt-6 flex gap-4">
                  <Link to={"/jobs"}>
                    <button className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-500 transform transition hover:-translate-y-1">
                      Explore Jobs
                    </button>
                  </Link>
                  <Link to={"/sign-up"}>
                    <button className="border-2 border-blue-800 text-black font-semibold py-3 px-6 rounded-full hover:bg-pink-400 hover:text-white transform transition hover:-translate-y-1">
                      Sign Up Free
                    </button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 w-full flex justify-center mt-6 md:mt-0">
                <img
                  src={billThree}
                  className="w-80 rounded-2xl shadow-xl"
                  alt="Carousel"
                />
              </div>
            </div>

            {/* Features Section */}
            {/* <div className="bg-gray-100 py-16 rounded-3xl shadow-lg">
              <h2 className="text-gray-800 text-4xl font-bold mb-8">Features</h2>
              <div className="flex flex-col md:flex-row justify-center gap-10">
                <div className="p-8 bg-white rounded-2xl shadow-xl w-72 transform transition hover:scale-105">
                  <h3 className="text-2xl font-semibold">For Students 🎓</h3>
                  <p className="text-gray-600 mt-3">Internships, career advice, and skill-building to boost your career.</p>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-xl w-72 transform transition hover:scale-105">
                  <h3 className="text-2xl font-semibold">For Companies 🏢</h3>
                  <p className="text-gray-600 mt-3">Find top talent effortlessly with our smart hiring solutions.</p>
                </div>
              </div>
            </div> */}
            {/* ------------------------------------------------------------------------------------------------------------------- */}
            {/* <div className="bg-gray-100 py-16 rounded-3xl shadow-lg">
              <h2 className="text-gray-800 text-4xl font-bold mb-8">
                Features
              </h2>
              <div className="flex flex-col md:flex-row justify-center gap-[16rem]">
                <FeatureCard
                  title="For Students"
                  features={[
                    "Internships to kickstart your career.",
                    "Career advice tailored to your goals.",
                    "Skill-building workshops and events.",
                  ]}
                  bgColor="bg-blue-100"
                  icon="🎓"
                />
                <FeatureCard
                  title="For Companies"
                  features={[
                    "Access to top talent from diverse fields.",
                    "Smart recruitment solutions to simplify hiring.",
                    "Streamlined candidate matching process.",
                  ]}
                  bgColor="bg-green-100"
                  icon="🏢"
                />
              </div>
            </div> */}
              {/* ------------------------------------------------------------------------------------------------------------------------ */}
            {/* Metrics Section */}
            {/* <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-14 rounded-3xl shadow-2xl text-white transform transition hover:scale-105"> */}
            {/* <h2 className="text-4xl font-bold">Our Impact</h2>
            <p className="mt-4 text-xl opacity-90">Trusted by 50,000+ users & 1,000+ companies worldwide.</p> */}
            {/* </div> */}
            {/* ----------------------------------------------------------------------------------------------------------------------- */}
            {/* <Metrices
              title={"Our Impact"}
              desc={"Trusted by 50,000+ users & 1,000+ companies worldwide."}
            /> */}
            {/* --------------------------------------------------------------------------------------------------------------------------- */}

              {/* ----------------------------------------------------------------------------------------------------------------------- */}
            {/* News Subscription Section */}
            {/* <StayUpdatedSection
              title="Stay Updated 📩"
              description="Subscribe for exclusive job alerts and career tips."
              buttonText="Subscribe"
              bgColor="bg-gray-900"
            /> */}
            {/* -------------------------------------------------------------------------------------------------------------- */}
              <MainHomePage/>

          </div>
        </main>
      )}

      {/* {type === "applicant" ? (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-lg md:p-6 p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <h1 className="text-center text-3xl font-semibold">
                    Search for a favorite job
                  </h1>
                  <div className="relative bg-white p-2 mt-6">
                    <Link
                      to="/jobs"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faTh} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          Browse the job board
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/for-applicant"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faSwimmer} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          For applicant
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      ) : type === "recruiter" ? (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-lg md:p-6 p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <h1 className="text-center text-3xl font-semibold">
                    See recruiter board
                  </h1>
                  <div className="relative bg-white p-2 mt-6">
                    <Link
                      to="/for-recruiter"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faTh} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          For recruiter
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/companies"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faSwimmer} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          Browse the Recruiter board
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      ) : (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-lg md:p-6 p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <h1 className="text-center text-3xl font-semibold">
                    Choose to see
                  </h1>
                  <p className="text-center text-lg">
                    Select the recruiter board to view employers or the job
                    board to see available jobs.
                  </p>

                  <div className="relative bg-white p-2 mt-6">
                    <Link
                      to="/jobs"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faTh} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          Browse the job board
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/companies"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faSwimmer} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          Browse the companies board
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )} */}
    </>
  );
}
