import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import HomeComponent from '../../components/InterviewHome/HomeComponent';

const HomeInterview = () => {
    const createId = useCallback(() => uuidv4(), []);
  
    return <HomeComponent createId={createId} />;
  };
  
  export default HomeInterview;