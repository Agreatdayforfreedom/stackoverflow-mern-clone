import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Blank from "./Blank";

interface Props {
  to: string;
  name: string;
  className?: string;
}
const AuthLink = ({ to, name, className }: Props) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return <Blank />;
  if (!user) {
    return (
      <Link to="/login" className={className}>
        {name}
      </Link>
    );
  }
  return (
    <Link to={to} className={className}>
      {name}
    </Link>
  );
};

export default AuthLink;
