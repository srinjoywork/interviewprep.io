import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { React, createContext, useEffect, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

// Import components and pages
import Home from "pages/landingPage/Home";
import About from "pages/landingPage/AboutUs/About";
import PrivacyPolicy from "pages/landingPage/AboutUs/PrivacyPolicy";
import Navbar from "components/Navbar";
import InfoBar from "components/InfoBar";
import ScrollToTop from "hooks/ScrollToTop";
import Companies from "pages/landingPage/Companies";
import Footer from "components/Footer";
import SignIn from "pages/landingPage/SignIn/SignIn";
import SignUp from "pages/landingPage/SignUp/SignUp";
import Jobs from "pages/landingPage/Jobs";
import ForRecruiter from "pages/landingPage/For/ForRecruiter";
import ForApplicant from "pages/landingPage/For/ForApplicant";
import Leaderboard from "pages/home/Leaderboard";
import ResetPassword from "pages/landingPage/SignIn/ResetPassword";
import { userType } from "libs/isAuth";
import Referrals from "pages/home/Referrals";
import Settings from "pages/home/Settings";
import Logout from "pages/landingPage/Logout";
import AdminAddJob from "pages/admin/AdminAddJob";
import Recovered from "pages/landingPage/SignIn/EmailVerify/Recovered";
import { Reset } from "pages/landingPage/SignIn/Reset";
import Job from "pages/landingPage/Job";
import Refer from "pages/landingPage/Refer";
import AdminJobs from "pages/admin/AdminJobs";
import AdminSettings from "pages/admin/AdminSettings";
import CookiePolicy from "pages/landingPage/AboutUs/CookiePolicy";
import AdminJob from "pages/admin/AdminJob";
import TalentPool from "pages/admin/TalentPool";
import InfoRecruiter from "pages/landingPage/InfoRecruiter";
import { Dashboard } from "pages/Admin1/Dashboard";
import RecruiterTools from "pages/RecruiterTools";
import ResumeBuilder from "pages/ResumeBuilder";

// CodeCollab Pages
import CodeCollabHome from "pages/CollabHome/CodeCollabHome";
import CollabEditorPage from "pages/CollabHome/CollabEditorPage";

// Additional Imports
import Playground from "pages/Playground";
import ErrorPage from "./pages/Error404/ErrorPage";
import { GlobalStyle } from "./style/global";
import ModalProvider from "./context/ModalContext";
import PlaygroundProvider from "./context/PlaygroundContext";
import CodeIdeHome from "pages/CodeIdeHome/CodeIdeHome";
import InterviewPrepTools from "pages/InterviewPrepTools";
import InterviewLanding from "pages/liveInterview/InterviewLanding";
import InterviewHome from "pages/liveInterview/InterviewHome";
import EditorPage from "pages/liveInterview/EditorPage";

//DSA Imports
import DSAbasics from "./pages/DSA/DSAbasics";
import Blind75List from "./pages/DSA/Blind75List.jsx";

import PricingReact from "../src/pages/subscription";
import Thankyou from "pages/Thankyou";
import Codecollablanding from "pages/Codecollablanding";
import Interviewlandingbeforesignup from "pages/InterviewLanding";

export const SetPopupContext = createContext();

export default function App() {
  const location = useLocation();
  const type = userType();
  const [popup, setPopup] = useState({ open: false, icon: "", message: "" });

  useEffect(() => {
    if (popup.open) {
      toast[popup.icon](popup.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
      setPopup({ ...popup, open: false });
    }
  }, [popup.open, popup.icon, popup.message]);

  const excludeLayoutPaths = [
    "/editor/:roomId",
    "/code-ide",
    "/playground/:folderId/:playgroundId",
    "/interview-home/:id",
    "/editor-room/:roomID",
       

  ];
  const shouldShowLayout = !excludeLayoutPaths.some((path) =>
    new RegExp(`^${path.replace(/:[^/]+/, "[^/]+")}$`).test(location.pathname)
  );

  return (
    <SetPopupContext.Provider value={setPopup}>

        <PlaygroundProvider>
          <ModalProvider>
            <ScrollToTop />
            <GlobalStyle />
            {shouldShowLayout && <InfoBar />}
            {shouldShowLayout && <Navbar />}
            <RecoilRoot>

            <Routes>
              {/* Existing Routes */}
              <Route exact path="/" element={<Home />} />
              <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route exact path="/cookie-policy" element={<CookiePolicy />} />
              <Route exact path="/companies" element={<Companies />} />
              <Route exact path="/companies/:id" element={<InfoRecruiter />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/sign-in" element={<SignIn />} />
              <Route exact path="/password/reset/:token" element={<Reset />} />
              <Route exact path="/reset-recovered" element={<Recovered />} />
              <Route exact path="/jobs" element={<Jobs />} />
              <Route exact path="/for-recruiter" element={<ForRecruiter />} />
              <Route exact path="/for-applicant" element={<ForApplicant />} />
              <Route exact path="/jobs/:id" element={<Job />} />
              <Route
                exact
                path="/recruiter-tools"
                element={<RecruiterTools />}
              />
              <Route exact path="/jobs/:id/refer" element={<Refer />} />
              <Route
                exact
                path="/sign-in/forgot-password"
                element={<ResetPassword />}
              />
              <Route
                exact
                path="/dashboard/*"
                element={<Dashboard />}
                type={type}
              />
              <Route
                exact
                path="/admin"
                element={<AdminJobs />}
                type={type === "recruiter"}
              />
              <Route
                exact
                path="/admin/:id"
                element={<AdminJob />}
                type={type === "recruiter"}
              />
              <Route
                exact
                path="/create-new-job"
                element={<AdminAddJob />}
                type={type}
              />
              <Route
                exact
                path="/talent-pool"
                element={<TalentPool />}
                type={type}
              />
              <Route exact path="/applicant/settings" element={<Settings />} />
              <Route exact path="/admin/settings" element={<AdminSettings />} />
              <Route exact path="/logout" element={<Logout />} />
              {/* <Route exact path="/codecollab" element={<CodeCollabHome />} /> */}
              <Route
                exact
                path="/editor/:roomId"
                element={<CollabEditorPage />}
              />
              <Route exact path="/build-resume" element={<ResumeBuilder />} />
              <Route exact path="/referrals" element={<Referrals/>} />
              <Route
                exact
                path="/interviewpreptools"
                element={<InterviewPrepTools />}
              />
              {/* New Routes */}
              <Route path="/code-ide" element={<CodeIdeHome />} />
              <Route
                path="/playground/:folderId/:playgroundId"
                element={<Playground />}
              />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/PricingReact" element={<PricingReact />} />

              <Route exact path="/leaderboard" element={<Leaderboard />} />
              <Route path="/interviewhome" element={<InterviewLanding />} />
              <Route path="/join-interview" element={<InterviewHome />} />
              <Route path="/editor-room/:roomID" element={<EditorPage />} />
              <Route path="/codecollab" element={<CodeCollabHome />} />

              <Route path="/codecollablanding" element={<Codecollablanding />} />
              <Route path="/interviewlanding" element={<Interviewlandingbeforesignup/>} />
                
              <Route path="/021245" element={<Thankyou />}>
                


              </Route>

              {/* DSA Routes */}
              <Route path="/dsa-basics" element={<DSAbasics />} />
              <Route path="/blind75" element={<Blind75List />} />

              <Route path="/PricingReact" element={<PricingReact />} />
            </Routes>

            </RecoilRoot>
            {shouldShowLayout && <Footer />}
            <ToastContainer limit={2} autoClose={2000} />
          </ModalProvider>
        </PlaygroundProvider>


    </SetPopupContext.Provider>
  );
}