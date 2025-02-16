import axios from "axios";
import JobAd from "../../components/JobAd";
import apiList from "../../libs/apiList";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import { userType } from "../../libs/isAuth";
import { SetPopupContext } from "App";

export default function Job(props) {
  let history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const { id } = useParams();
  const [job, setJob] = useState();
  const [allJob, setAllJob] = useState([]);
  const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedPage, setSelectedPage] = useState(1);

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const userApply = () => {
    return (
      (job && job.status === "accepted") || (job && job.status === "finished")
    );
  };

  const handleApply = () => {
    console.log(job._id);
    console.log(sop);

    if (userApply()) {
      setPopup({
        open: true,
        icon: "success",
        message:
          "You already have an accepted job. Cannot apply for another job.",
      });
      return;
    }

    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        {
          sop: sop,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  /* const handleClickJob = () => {
    history(`/${}`);
  }; */

  useEffect(() => {
    const checkAcceptedJob = async () => {
      try {
        const response = await axios.get(
          `${apiList.jobs}/${id}/check-accepted`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHasAcceptedJob(response.data.hasAcceptedJob);
      } catch (error) {
        console.error("The error is: ",error);
      }
    };

    checkAcceptedJob();
  }, []);

  useEffect(() => {
    axios
      .get(`${apiList.jobs}/${id}`)
      .then((response) => {
        setJob(response.data);
        console.log("Result: ",response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const all = apiList.jobs;
    axios.get(all).then((response) => {
      setAllJob(response.data);
      console.log("Response Data: ",response.data);
    });
  }, []);

  function calculateDays(date) {
    let daysAgo = Math.floor((new Date() - date) / (1000 * 3600 * 24));

    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) {
      return daysAgo + " day ago";
    } else if (daysAgo < 7) {
      return daysAgo + " days ago";
    } else if (daysAgo < 14) {
      return "1 week ago";
    } else if (daysAgo < 30) {
      return Math.floor(daysAgo / 7) + " weeks ago";
    } else if (daysAgo < 60) {
      return "1 month ago";
    } else {
      return Math.floor(daysAgo / 30) + " months ago";
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allJob
    .filter((job) => job._id !== id)
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
  };

  return (
    <>
      <div className="flex">
      {console.log("This is job: ", job)}
        {/* LEFT */}
        <div className="lg:w-6/12 w-11/12 h-full ml-44 mr-20 md:mt-20 mt-10 pb-10">
          <JobAd about={job} />
          <div className="text-center mx-auto mt-12 mb-10">
            {userType() === "applicant" && job ? (
              <>
                {job.maxPositions !== undefined &&
                job.acceptedCandidates !== undefined ? (
                  <>
                    {job.maxPositions - job.acceptedCandidates > 0 ? (
                      <Link
                        className={`hover:opacity-80 ease-out duration-300 flex cursor-pointer items-center font-semibold 
                        text-md justify-center px-8 py-3 bg-primary rounded-xl text-black ${
                          hasAcceptedJob ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => handleApply()}
                        title={
                          hasAcceptedJob
                            ? "You already have an accepted job"
                            : ""
                        }
                      >
                        {hasAcceptedJob ? "Job accepted!" : "Apply"}
                      </Link>
                    ) : (
                      <p className="text-md justify-center px-8 py-3 bg-gray-400 rounded-xl cursor-not-allowed text-black">
                        Position Filled
                      </p>
                    )}
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </div>


        {/* RIGHT */}
        <div className="w-full md:w-1/3 2xl:w-2/4 md:mt-20 mt-10 pb-10">
          <p className="text-gray-500 font-semibold text-xl mb-6">Similar Job Posts</p>

          <div className="w-full flex flex-wrap gap-6">
            {currentItems.map(
              (job, index) =>
                job._id !== id && (
                  <a href={`/jobs/${job._id}`} key={index} className="group">
                    <div
                      className="w-full h-full md:w-[22rem] bg-white flex flex-col justify-between shadow-lg hover:shadow-xl 
                      rounded-xl px-4 py-5 text-wrap transition-all duration-300 transform group-hover:-translate-y-2
                      border-l-4 border-blue-100 group-hover:border-blue-500 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 transform rotate-45 translate-x-8 -translate-y-4 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                      
                      <div className="flex gap-4 items-start">
                        <img
                          src={job?.recruiter.profile}
                          alt={job?.recruiter.name}
                          className="w-14 h-14 rounded-xl border-2 border-blue-50 object-cover"
                        />

                        <div className="flex-1">
                          <p className="text-lg font-bold text-gray-800 truncate mb-1">
                            {job.title}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {job.location}
                          </div>
                        </div>
                      </div>

                      <div className="py-4 border-t border-b border-gray-100 my-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {job.recruiter.bio ? (
                            <>
                              {job.recruiter.bio.slice(0, 140) + (job.recruiter.bio.length > 140 ? "..." : "")}
                            </>
                          ) : (
                            <div className="text-gray-400">No description provided</div>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                          {job.jobType}
                        </span>
                        <span className="text-gray-500 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {calculateDays(new Date(job.dateOfPosting))}
                        </span>
                      </div>
                      
                      {/* Skills Container */}
                      <div className="flex flex-wrap gap-2 overflow-hidden">
                        {job.skillsets.map((tag, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full 
                            text-sm text-blue-800 font-medium border border-blue-200"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </a>
                )
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from(
              { length: Math.ceil(allJob.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${selectedPage === i + 1 
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400"}
                    transition-colors duration-200`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <Banner
        title="Looking for something else?"
        button="Explore the job board"
        link="/jobs"
      />
    </>
  );
}




