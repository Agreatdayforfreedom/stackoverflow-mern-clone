import { useNavigate } from "react-router-dom";
import { Config } from "../interfaces/interfaces";

export const configAxios = (token: string): Config => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
