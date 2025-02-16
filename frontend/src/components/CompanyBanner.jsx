import { Link } from "react-router-dom";
import { userType } from "libs/isAuth";
import icon from "assets/icon.jpg";
import introduce from "assets/introduce.png";
import cooperate from "assets/coop.png";

export function CompanyBanner() {
  const type = userType();
  return (
    <>
      {type === "recruiter" ? (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#0892d0] to-[#4b0082] text-white py-12">
          {/* Section 1 */}
          {/* <div className="md:w-10/12 w-11/12 flex flex-wrap mx-auto items-center gap-8">
            <div className="lg:w-5/12 w-full text-left space-y-6 p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-200">
                We help you help your friends
              </h1>
              <p className="text-lg text-gray-300">
                Anyone can refer a friend on Greet. But if you are serious about
                helping your friends, you should sign up for a Greeter account.
                A Greeter account lets you track referrals and speeds up the
                process.
              </p>
              <Link
                to="/for-applicant"
                className="bg-[#ff5733] hover:bg-[#ff8f66] transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
              >
                Read more
              </Link>
            </div>
            <div className="md:w-7/12 w-full flex justify-center">
              <img
                className="w-4/5 lg:w-3/5 rounded-2xl shadow-lg"
                src={introduce}
                alt="Company"
              />
            </div>
          </div> */}

          {/* Section 2 */}
          {/* <div className="md:w-10/12 w-11/12 flex flex-wrap mx-auto items-center gap-8 mt-12">
            <div className="md:w-7/12 w-full flex justify-center">
              <img
                className="w-4/5 lg:w-3/5 rounded-2xl shadow-lg"
                src={icon}
                alt="Company"
              />
            </div>
            <div className="lg:w-5/12 w-full text-left space-y-6 p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-200">
                Not sure where to refer your friend?
              </h1>
              <p className="text-lg text-gray-300">
                Don't worry! Submit a wild card to add your friend to a talent
                pool companies can pick from. You get paid if your referral
                results in an interview or hire.
              </p>
              <Link
                to="/sign-up"
                className="bg-[#1abc9c] hover:bg-[#48c9b0] transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
              >
                Submit a wild card
              </Link>
            </div>
          </div> */}

          {/* Section 3 */}
          <div className="md:w-10/12 w-11/12 flex flex-wrap mx-auto text-center gap-8 mt-12">
            <div className="w-full space-y-6 p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-200">
                We help tech companies reach their full potential
              </h1>
              <p className="text-lg text-gray-300">
                Post jobs for free and decide how much you are willing to pay
                for an interview or hire. Make your recruitment process
                crowdsourced and remove expensive headhunters.
              </p>
              <div className="flex justify-center mt-6 gap-3">
                <Link
                  to="/create-new-job"
                  className="bg-[#3498db] hover:bg-[#5dade2] transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
                >
                  Request a demo
                </Link>
                <Link
                  to="/for-recruiter"
                  className="bg-gray-700 hover:bg-gray-600 transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
                >
                  Read more
                </Link>
              </div>
            </div>
            {/* <div className="md:w-5/12 w-full flex justify-center">
              <img
                className="w-4/5 lg:w-3/5 rounded-2xl shadow-lg"
                src={cooperate}
                alt="Company"
              />
            </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
