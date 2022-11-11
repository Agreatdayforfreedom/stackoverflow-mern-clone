import { useNavigate } from "react-router-dom";

export interface Config {
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
}

export const getToken = (token: string): Config => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
