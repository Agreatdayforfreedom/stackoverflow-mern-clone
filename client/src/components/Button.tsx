import React from "react";

interface Props {
  name: string;
}

const Button = ({ name }: Props) => {
  return (
    <button type="submit" className="button primary whitespace-nowrap">
      {name}
    </button>
  );
};

export default Button;
