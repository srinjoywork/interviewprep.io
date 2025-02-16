import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {
  faMoneyBillWave,
  faMapMarkerAlt,
  faCalendarDays,
  faUsers,
  faHand,
  faAward,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { Rating } from "@material-tailwind/react";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";
import { userType } from "libs/isAuth";

const Myjob = ({ job }, index) => {
  let history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [recruiters, setRecruiters] = useState([]);
  const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
  const [sop, setSop] = useState("");
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

  useEffect(() => {
    if (userType() === "applicant") {
      const checkAcceptedJob = async () => {
        try {
          const response = await axios.get(
            `${apiList.jobs}/${job._id}/check-accepted`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setHasAcceptedJob(response.data.hasAcceptedJob);
        } catch (error) {
          console.error(error);
        }
      };

      checkAcceptedJob();
    }
  }, []);

  useEffect(() => {
    if (job) {
      const userID = job.userId;
      axios.get(`${apiList.allRecruiter}`).then((response) => {
        const filteredRecruiters = response.data.allUser.filter(
          (recruiter) => recruiter.userId === userID
        );
        setRecruiters(filteredRecruiters);
      });
    }
  }, [job]);

  const truncateDescription = (text, limit = 150) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

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

  return (
    <div>
      <div
        className="transform ease-in duration-100 
        hover:-translate-y-2 hover:shadow-xl w-full h-full
        bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 
        text-left cursor-default border-2 border-blue-100
        shadow-md hover:border-blue-200 relative"
      >
        {job.status === "accepted" && (
          <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-tr-2xl rounded-bl-xl text-sm font-bold">
            Accepted
          </div>
        )}

        <div className="flex items-center text-left pb-4">
          {recruiters.map((recruiter, index) => (
            <img
              className="w-14 h-14 rounded-2xl mr-4 border-2 border-blue-200"
              key={index}
              src={recruiter.profile}
              alt="Company logo"
            />
          ))}
          <div>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {job.title}
            </p>
            <p className="text-md text-gray-600">
              Posted By : {job.recruiter.name}
            </p>
          </div>
        </div>

        {job.rating !== -1 && (
          <div className="pl-1 pb-1 flex gap-2">
            <Rating
              className="text-yellow-400"
              value={job.rating || null}
              readonly
            />
            <span className="font-semibold">-</span>
            <h6 className="md:text-xl text-lg font-bold text-gray-500">
              {job.rating}
            </h6>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg flex items-center">
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              className="text-2xl text-green-500 mr-3"
            />
            <div>
              <p className="font-bold text-gray-700">Hiring Reward</p>
              <p className="text-xl text-gray-900">{job.salary} $</p>
            </div>
          </div>

          <div className="bg-orange-50 p-3 rounded-lg flex items-center">
            <FontAwesomeIcon
              icon={faHourglassHalf}
              className="text-2xl text-orange-500 mr-3"
            />
            <div>
              <p className="font-bold text-gray-700">Duration</p>
              <p className="text-xl text-gray-900">
                {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={faHand}
              className="text-xl text-blue-500 mr-2"
            />
            <h3 className="text-lg font-semibold">Description</h3>
          </div>
          <p className="text-gray-600 text-justify">
            {truncateDescription(job.description.replace(/<\/?[^>]+(>|$)/g, ""))}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon
              icon={faAward}
              className="text-xl text-purple-500 mr-2"
            />
            <h3 className="text-lg font-semibold">Required Skills</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {job.skillsets?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
              {job.location}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500">Posted</p>
            <p className="font-semibold flex items-center">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-green-500" />
              {calculateDays(new Date(job.dateOfPosting))}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500">Positions Left</p>
            <p className="font-semibold flex items-center">
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-orange-500" />
              {job.maxPositions - job.acceptedCandidates}
            </p>
          </div>
        </div>

        <div className="flex items-center pt-6">
          {userType() === "applicant" && job ? (
            <>
              {job.maxPositions !== undefined &&
              job.acceptedCandidates !== undefined ? (
                <>
                  {job.maxPositions - job.acceptedCandidates > 0 ? (
                    <Link
                      className={`hover:opacity-80 ease-out duration-300 flex items-center font-semibold 
                        text-md justify-center px-8 py-3 bg-primary rounded-xl text-black ${
                          hasAcceptedJob
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      onClick={() => handleApply()}
                      title={
                        hasAcceptedJob ? "You already have an accepted job" : ""
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
          <Link
            className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black bg-gray-100 hover:bg-gray-200 ease-out duration-300 px-3 py-3 rounded-xl border-none"
            to={`/jobs/${job._id}`}
          >
            About the job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Myjob;