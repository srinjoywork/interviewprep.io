import { Link, useLocation } from "react-router-dom";
import logo from "assets/images/logo.png";
import LinkedIn from "assets/LinkedIn.png";
import instagram from "assets/Instagram.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";

export default function Footer() {
  const linkUrl = useLocation();
  return (
    <div className="bg-[#FFF5EC] text-whblackite text-left">
      {!linkUrl.pathname.startsWith("/blog") && (
        <div className="w-10/12 mx-auto pt-20 pb-8 flex flex-col md:flex-row sm:flex-row space-y-2 justify-start">
          <div className="w-full sm:w-2/5 md:w-3/5 pr-6 flex flex-col space-y-2 pb-6 cursor-default">
            <Link className="flex pt-1" to="/">
              <img className="h-12 pb-2 " src={logo} alt="logo" />
              <h1 className="md:pl-2 pl-2 text-4xl text-black font-medium hover:opacity-60">
                InterviewPrep
              </h1>
            </Link>
            <p className="md:w-80 w-full text-lg font-medium -mt-2 ">
              Ai SAAS
            </p>

            <a
              className="w-[220px] text-lg font-medium border-b-2 border-black hover:opacity-60"
              href="mailto:codex@gmail.com"
            >
              codex@gmail.com
            </a>
            <span className="font-light">
              Copyright © 2025 <span className="font-normal"> Team CodeX</span>{" "}
              Design.
            </span>
          </div>
          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6 cursor-default">
            <h1 className="text-2xl font-semibold">Students</h1>
            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/for-applicant"
            >
              How it works
            </Link>

            
            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-in"
            >
              Code Collab
            </Link>

            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-up/new-applicant"
            >
              Ai Voice Agent
            </Link>
            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-up/new-applicant"
            >
              Code Optimizer
            </Link>
            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-up/new-applicant"
            >
              Code Reviewer
            </Link>
            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-up/new-applicant"
            >
              NoteDigitizer
            </Link>
          </div>

          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Companies</h1>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/for-recruiter"
            >
              How it works
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/create-new-job"
            >
              Schedule Interview
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-in"
            >
                Plagiarism Checker
            </Link>

            
          </div>

          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">InterviewPrep</h1>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/about"
            >
              About us
            </Link>

            <Link
              className="opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/privacy-policy"
            >
              Privacy policy
            </Link>

            <Link
              className="opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/cookie-policy"
            >
              Cookie policy
            </Link>
          </div>

          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Follow us</h1>
            <a
              className="w-28 font-semibold text-lg"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} alt="Instagram logo" className="w-12 h-12" />
            </a>
            <a
              className="w-28 opacity-80 hover:opacity-100 font-semibold text-lg"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <img src={LinkedIn} alt="LinkedIn logo" className="w-12 h-12" />
            </a>
          </div>
        </div>
      )}
      {" "}
    </div>
  );
}
