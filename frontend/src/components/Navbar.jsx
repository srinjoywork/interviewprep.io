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
    <Disclosure as="nav" className="bg-[#d4f1f7] w-full">
      <div className="flex justify-between items-center h-16 py-3 px-4 md:px-6 lg:px-12 mx-auto max-w-[1400px]">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link
            className="flex items-center hover:no-underline"
            to={linkUrl.pathname.startsWith("/blog") ? "/blog" : "/"}
          >
            <img className="h-8 w-auto md:h-10" src={logo} alt="logo" />
            <h1 className="ml-2 text-lg md:text-xl lg:text-2xl text-[#8f5bfd] font-semibold hover:opacity-60 hover:no-underline font-[JetBrains+Mono]">
  CODE-HIRE-X{linkUrl.pathname.startsWith("/blog") && ".io"}
</h1>



            {linkUrl.pathname.startsWith("/blog") && (
              <FontAwesomeIcon icon={faBlog} className="ml-2 text-lg" />
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-4">
          <HowIt />
          <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline " to="/jobs">
            Jobs
          </Link>

          {isAuth() ? (
            userType() === "recruiter" ? (
              <>
                <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="/interviewhome">
                  Interview Room
                </Link>
                <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="/recruiter-tools">
                  Resume Summarizer
                </Link>
                <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="https://code-hire-x-question-generator.onrender.com/">
                  QGenAi
                </Link>
                <Link to="/create-new-job" className="flex items-center font-semibold text-xs md:text-sm bg-black text-white px-3 py-1 rounded-lg hover:opacity-80">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create job
                </Link>
              </>
            ) : userType() === "applicant" ? (
              <>
                <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="/codecollab">
                  Code Collaborators
                </Link>
                <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="/build-resume">
                  Resume Builder
                </Link>
                <Blog />
              </>
            ) : null
          ) : (
            <>
              <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="/codecollablanding">
                Code Collaborators
              </Link>
              <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="/interviewlanding">
                Interview Room
              </Link>
              <Link className="text-[#333] text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="/build-resume">
                Resume Builder
              </Link>
              <Blog />
            </>
          )}
        </div>

        {/* Profile or Authentication Links */}
        <div className="hidden lg:flex items-center space-x-3">
          {isAuth() ? (
            <ProfileMenu type={userType} />
          ) : (
            <>
              <Link className="text-black text-sm md:text-base font-semibold hover:opacity-60 hover:no-underline" to="/sign-in">
                Sign in
              </Link>
              <Link className="bg-[#8f5bfd] text-white text-sm md:text-base font-semibold px-4 py-2 rounded-full hover:bg-[#9b2ab8] hover:scale-105 transition-transform hover:no-underline" to="/sign-up">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </Disclosure>
  );
}
