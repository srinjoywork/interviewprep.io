import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState, useEffect, useRef } from "react";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import apiList from "../../libs/apiList";
import FilterPopup from "../filterPopup";
import Myjob from "./Myjob";
import unorm from "unorm";

export default function JobBoard({ title, props }) {
  const searchRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Type (/) search");
  const [maxJobsToShow, setMaxJobsToShow] = useState(6);
  const [searchValue, setSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
      if (event.key === "Escape") {
        setSearchValue("");
        if (searchRef.current) {
          searchRef.current.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    setSearchOptions({
      ...searchOptions,
      query: event.target.value,
    });
  };

  const sortedJob = [...jobs].sort((a, b) => {
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }

    return new Date(b.dateOfPosting) - new Date(a.dateOfPosting);
  });

  const currentDate = new Date();

  const limitedJobs = sortedJob
    .filter((job) => {
      const postingDate = new Date(job.dateOfPosting);
      const differenceInDays =
        (currentDate - postingDate) / (1000 * 60 * 60 * 24);
      return differenceInDays <= 7;
    })
    .slice(0, maxJobsToShow);

  useEffect(() => {
    getData();
  }, [searchOptions]);

  const normalizeText = (text) => {
    return unorm
      .nfkd(text)
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [
        ...searchParams,
        `jobType=Full%20Time` || `jobType=Full%20time`,
      ];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [
        ...searchParams,
        `jobType=Part%20Time` || `jobType=Part%20time`,
      ];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    if (searchOptions.salary[0] !== 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] !== 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration !== "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");

    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const newData = response.data.filter((job) => {
          const normalizedTitle = normalizeText(job.title);
          const normalizedQuery = normalizeText(searchOptions.query);
          return normalizedTitle.includes(normalizedQuery);
        });
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJobTypeChange = (type) => {
    setSearchOptions({
      ...searchOptions,
      jobType: {
        ...searchOptions.jobType,
        [type]: !searchOptions.jobType[type],
      },
    });
  };

  return <></>;
}
