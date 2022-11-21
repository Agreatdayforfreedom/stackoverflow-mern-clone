import React from "react";
import { Link } from "react-router-dom";
import { Tag as ITag } from "../interfaces/interfaces";

interface Props {
  tag: ITag;
  className?: string;
}

const Tag = ({ tag, className = "" }: Props) => {
  return (
    <Link
      to={`/questions/tagged/${tag.name}`}
      className={`${className} m-2 py-0.5 items-center  px-2 text-sm bg-[#d0dee9] rounded opacity-95 text-[#39739d] hover:bg-[#d0e3f1] hover:cursor-pointer transition-colors`}
    >
      {tag.name}
    </Link>
  );
};

export default Tag;
