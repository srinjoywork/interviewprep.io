import { Disclosure } from "@headlessui/react";
import logo from "assets/inter1.png";
import HowIt from "./HowIt";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProfileMenu from "./ProfileMenu";
import { userType } from "libs/isAuth";
import isAuth from "libs/isAuth";
import Blog from "./blog/Blog";

export default function Navbar() {
  const linkUrl = useLocation();

  return (
    <Disclosure as="nav" className="bg-[#FFF5EC] w-full">
      <div className="flex justify-between h-24 py-6 md:w-10/12 w-11/12 mx-auto">
        <div className="flex">
          <Link
            className="flex pt-1 hover:no-underline"
            to={linkUrl.pathname.startsWith("/blog") ? "/blog" : "/"}
          >
            <img className="md:pl-5 pl-2" src={logo} alt="logo" />
            <h1 className="md:pl-2 pl-2 text-6xl sm:text-3xl md:text-4xl text-[#F2994A] font-medium hover:opacity-60 hover:no-underline">
              InterviewPrep{linkUrl.pathname.startsWith("/blog") && ".io"}
            </h1>
            {linkUrl.pathname.startsWith("/blog") && (
              <FontAwesomeIcon icon={faBlog} />
            )}
          </Link>
        </div>

        <div className="flex pt-0.5 pl-8">
          <HowIt />
          <Link
            className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60 hover:no-underline"
            to="/jobs"
          >
            Jobs
          </Link>
          {isAuth() ? (
            userType() === "recruiter" ? (
              <>
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60 hover:no-underline"
                  to="/interviewhome"
                >
                  Interview Room
                </Link>
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60 hover:no-underline"
                  to="/recruiter-tools"
                >
                  Resume Summarizer
                </Link>
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60 hover:no-underline"
                  to="/recruiter-tools"
                >
                  AutoQuest
                </Link>

                <Link
                  to="/create-new-job"
                  className="hidden sm:flex hover:opacity-80 cursor-pointer items-center font-semibold text-sm justify-center px-6 bg-black rounded-lg mr-8 text-white hover:no-underline"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-3" />
                  Create new job
                </Link>
              </>
            ) : userType() === "applicant" ? (
              <>
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60 hover:no-underline"
                  to="/codecollab"
                >
                  Code Collaborators
                </Link>
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60 hover:no-underline"
                  to="/build-resume"
                >
                  Resume Builder
                </Link>
                <Blog />
              </>
            ) : null
          ) : (
            <>
              <Link
                className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60 hover:no-underline"
                to="/sign-in"
              >
                Code Collaborators
              </Link>
              <Link
                className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60 hover:no-underline"
                to="/sign-in"
              >
                Interview Room
              </Link>
              <Blog />
            </>
          )}
        </div>

        <div className="flex">
          <MobileMenu />
          {isAuth() ? (
            <ProfileMenu type={userType} />
          ) : (
            <>
              <Link
                className="lg:block hidden text-black text-lg font-semibold pr-6 py-2 hover:opacity-60 hover:no-underline"
                to="/sign-in"
              >
                Sign in
              </Link>
              <Link
                className="lg:block hidden hover:no-underline text-center text-lg font-semibold text-white bg-[#F2994A] hover:bg-[#e08a42] px-6 py-3 rounded-full transform ease-in duration-100 hover:scale-105 hover:shadow-lg"
                to="/sign-up"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </Disclosure>
  );
}
