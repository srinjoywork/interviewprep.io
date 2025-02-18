import FAQ from "components/FAQ";
import Banner from "components/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import icon from "assets/images/help.jpg";
import Cards from "../../../components/Cards/Cards";
import project_img1 from "../../../assets/CardImages/project_img1.jpeg";
import codecollaboratorforapplicant from "../../../assets/codecollaboratorforapplicant.jpg";
import codeideforapplicant from "../../../assets/codeideforapplicant.jpg";
import resumebuilderforapplicant from "../../../assets/resumecreatorforapplicant.jpg";
import codeoptimizerforapplicant from "../../../assets/codeoptimizerforapplicant.jpg";
import codereviewforapplicant from "../../../assets/codereviewforapplicant.jpg";
import dsatrackerforapplicant from "../../../assets/dsatrckerforapplicant.jpg";
import notedigitizerforapplicant from "../../../assets/notedigitizerforapplicant.jpg";
import isAuth from "libs/isAuth";
import {
  faHandPeace,
  faSearch,
  faMoneyBillWave,
  faLaptopCode,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { userType } from "libs/isAuth";

export default function ForApplicant() {
  return (
    <>
      <div
        className="md:pt-32 pt-16 bg-gradient-to-br from-[#191714] to-[#2234AE]"
        // style={{
        //   backgroundColor: "transparent",
        //   backgroundImage: "radial-gradient(#000000 1px, #e5e5f7 1px)",
        //   backgroundSize: "30px 30px",
        //   width: "100%",
        //   height: "100%",
        // }}
      >
        {/* <div className="container md:pt-32 pt-16"> */}
        <h1 className="max-w-2xl mx-auto text-center md:text-6xl text-4xl font-bold text-white">
          Welcome, Future Talents—Your Journey Starts Here
        </h1>
        <div
          className="grid lg:grid-cols-4 grid-cols-1 gap-14 md:py-32 py-12
          md:text-center text-center md:w-10/12 w-11/12 mx-auto "
        >
          {/* Step 1: Find a Job */}
          <div className="text-center p-6 shadow-lg rounded-2xl bg-white">
            <FontAwesomeIcon
              className="text-5xl mb-6 text-indigo-500"
              icon={faSearch}
            />
            <div className="text-gray-900 text-md uppercase font-semibold">
              Step 1:
            </div>
            <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
              Find a Job
            </h1>
            <p className="text-xl font-light">
              Explore exciting tech jobs on our job board.
            </p>
          </div>

          {/* Step 2: Apply for a Job */}
          <div className="text-center p-6 shadow-lg rounded-2xl bg-white">
            <FontAwesomeIcon
              className="text-5xl mb-6 text-yellow-400"
              icon={faHandPeace}
            />
            <div className="text-gray-900 text-md uppercase font-semibold">
              Step 2:
            </div>
            <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
              Apply with Confidence
            </h1>
            <p className="text-xl font-light">
              Submit applications seamlessly for roles you love.
            </p>
          </div>

          {/* Step 3: Prepare & Collaborate */}
          <div className="text-center p-6 shadow-lg rounded-2xl bg-white">
            <FontAwesomeIcon
              className="text-5xl mb-6 text-blue-500"
              icon={faLaptopCode}
            />
            <div className="text-gray-900 text-md uppercase font-semibold">
              Step 3:
            </div>
            <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
              Prepare & Collaborate
            </h1>
            <p className="text-xl font-light">
              Use tools like Code Collab, DSA Tracker, and more.
            </p>
          </div>

          {/* Step 4: Optimize & Succeed */}
          <div className="text-center p-6 shadow-lg rounded-2xl bg-white">
            <FontAwesomeIcon
              className="text-5xl mb-6 text-green-500"
              icon={faClipboardCheck}
            />
            <div className="text-gray-900 text-md uppercase font-semibold">
              Step 4:
            </div>
            <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
              Optimize & Succeed
            </h1>
            <p className="text-xl font-light">
              Use Resume Builder, Code IDE, and AI Review Assistant.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-14 md:py-32 py-12 
          md:text-center text-center md:w-10/12 w-11/12 mx-auto">
        <Cards
          link={(isAuth() && userType() === 'applicant') ? "https://ai-code-converter-live.vercel.app/" : "/sign-in"}
          img={codeoptimizerforapplicant}
          title={"Apply Job"}
          desc={
            "Find and apply for jobs seamlessly with our intuitive job application platform."
          }
        />

        <Cards
          link={(isAuth() && userType() === 'applicant') ? "/codecollab" : "/sign-in"}
          img={codecollaboratorforapplicant}
          title={"Code Collaboration"}
          desc={
            "Work together with teammates in real-time using our collaborative coding environment."
          }
        />

        <Cards
          link={(isAuth() && userType() === 'applicant') ? "/code-ide" : "/sign-in"}
          img={codeideforapplicant}
          title={"Code IDE"}
          desc={
            "Write, debug, and execute your code instantly with our feature-rich online IDE."
          }
        />

        <Cards
          link={(isAuth() && userType() === 'applicant') ? "/build-resume" : "/sign-in"}
          img={resumebuilderforapplicant}
          title={"Resume Builder"}
          desc={
            "Create a professional ATS resume with our easy-to-use resume-building tool."
          }
        />

        <Cards
          link={(isAuth() && userType() === 'applicant') ? "/https://codehirex-ai-code-review.netlify.app/" : "/sign-in"}
          img={codereviewforapplicant}
          title={"AI Interview"}
          desc={
            "Practice mock interviews with our AI-powered interview preparation tool."
          }
        />
        <Cards
          link={(isAuth() && userType() === 'applicant') ? "/dsa-basics" : "/sign-in"}
          img={dsatrackerforapplicant}
          title={"DSA Tracker"}
          desc={
            "Track your progress in Data Structures and Algorithms with our dedicated tracker."
          }
        />
        <Cards
          link={(isAuth() && userType() === 'applicant') ? "https://handwritten-digitalization-ocmct9vcwiwrrued5pdaqx.streamlit.app/" : "/sign-in"}
          img={notedigitizerforapplicant}
          title={"Note Digitizer"}
          desc={
            "Convert your handwritten notes into digital format with our OCR-powered tool."
          }
        />
      </div>
      </div>

      {/* <div className="bg-white md:pt-0 mt-20 mb-20 md:w-10/12 w-11/12 mx-auto">
        <div className=<div>
            <FontAwesomeIcon
              className="text-5xl mb-6 text-green-500"
              icon={faMoneyBillWave}
            />

            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 3:
            </div>
            <h1 className="text-3xl  text-gray-900 pb-3 font-semibold">
              Await approval
            </h1>
            <p className="text-xl font-light">
              Waiting for your job application to be approved by the employer.
            </p>
          </div>"grid lg:grid-cols-12 md:gap-6 gap-24 grid-cols-1 md:mt-20 mt-0 mx-auto">
          <div className="md:col-span-6 col-span-1 mt-0 md:text-left text-center">
            <h1 className="mx-auto md:text-left text-center md:text-6xl text-4xl font-bold text-gray-900">
              We will help you find the job you want
            </h1>
            <p className="text-xl mx-auto md:text-left text-center pt-4 md:pr-16 pr-0 mb-12">
              You need to create an account to apply for jobs. Become part of
              our Job Portal community to keep track of new and exciting job
              opportunities.
            </p>

            {userType() === "" ? (
              <Link
                to="/sign-up/new-applicant"
                className="mx-auto w-46 hover:opacity-80 cursor-pointer items-center font-semibold text-md justify-center px-8 py-4 bg-primary rounded-xl text-black"
              >
                Sign up
              </Link>
            ) : null}
          </div>
          <img
            alt="pricing example chart"
            className="md:col-span-6 col-span-1 rounded-xl"
            src={icon}
          />
        </div>
      </div> */}
      <FAQ
        questionOne="Do I have a limitation on the number of job applications?"
        answerOne="You can submit as many applications as you like, but when one is accepted, the others will be canceled."
        questionTwo="When and how much do I get paid?"
        answerTwo="It varies. On each job ad you can find the specified hiring bonus and the interview bonus. You get paid when your candidate get an interview or get hired."
        questionThree="Do I have to sign up for a Greeter account to refer my friends?"
        answerThree=" You do not have to create a Greeter account to refer your friends
        but it makes the referral process smoother. For example you do not have to add your own personal information each time you submit a referral."
      />
      <Banner
        title="Ready to refer someone?"
        button="See available jobs"
        link="/jobs"
      />
    </>
  );
}
