import React from "react";
import Button from "../../../components/UI/Button/Button";
import ExploreImg from "./../../../assets/awardbooks.png";
function AwardSection() {
  return (
    <>
      <div className="flex gap-2 flex-col">
        <h2 className="font-bold break-words w-50% text-[1.5rem]">
          2023 National Book Awards for Fiction Shortlist{" "}
        </h2>
        <Button className="w-[10rem] bg-orange-500">Explore Noew</Button>
      </div>

      <div className="w-[20rem] md:w-[15rem] h-[15rem]">
        <img
          src={ExploreImg}
          className=" w-full h-full object-contain"
          alt="explore"
        />
      </div>
    </>
  );
}

export default AwardSection;
