import React from "react";
import { Tag as ITag } from "../interfaces/interfaces";

interface Props {
  tag: ITag;
}

const Tag = ({ tag }: Props) => {
  return (
    <p className="m-2 py-0.5 items-center  px-2 text-sm bg-[#d0dee9] rounded opacity-95 text-[#39739d] hover:bg-blue-200 hover:cursor-pointer transition-colors">
      {tag.name}
    </p>
  );
};

export default Tag;
