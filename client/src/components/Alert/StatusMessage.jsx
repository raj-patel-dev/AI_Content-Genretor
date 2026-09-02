import React from "react";
import { Banner } from "../once-ui";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";

const StatusMessage = ({ type, message }) => {
  let icon;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="text-rose-400 text-xl shrink-0" />;
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="text-emerald-400 text-xl shrink-0" />;
      break;
    case "loading":
      icon = <AiOutlineLoading3Quarters className="animate-spin text-indigo-400 text-xl shrink-0" />;
      break;
    default:
      icon = null;
  }

  return (
    <Banner type={type}>
      <div className="flex items-center gap-2.5">
        {icon}
        <span>{message}</span>
      </div>
    </Banner>
  );
};

export default StatusMessage;