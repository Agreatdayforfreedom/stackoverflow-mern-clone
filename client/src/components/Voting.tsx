import React from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const Voting = ({ vote }: any) => {
  return (
    <div className="text-center">
      <TiArrowSortedUp size={36} className="fit-content" />
      <span className="text-2xl block m-auto">10</span>
      <TiArrowSortedDown size={36} className="fit-content" />
    </div>
  );
};

export default Voting;
