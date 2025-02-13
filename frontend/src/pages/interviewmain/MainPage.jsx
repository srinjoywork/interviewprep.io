import React from "react";
import AudioVideoScreen from "../../components/interview/AudioVideoScreen";

import bgImage1 from "../../assets/bg1.jpg"
const MainPage = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage1})` }}
    >
      <AudioVideoScreen />
    </div>
  );
};
export default MainPage;