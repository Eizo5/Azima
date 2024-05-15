import React from "react";
import "../Styles/ourbutton.css";

interface OurButtonProps {
  label: string;
  variant?: string;
  position?: string;
  thin?: boolean;
  onClick?: (e: any) => void;
  disabled?: boolean;
  id?: string;
  type?: "reset" | "submit" | "button";
}

const OurButton: React.FC<OurButtonProps> = ({
  label,
  variant,
  position,
  thin,
  onClick,
  disabled,
  id,
  type = "button",
}) => {
  return (
    <div className={`${position}`}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`button ${variant} ${thin && "thin"}`}
        id={id}
        type={type}
      >
        {label}
      </button>
    </div>
  );
};

export default OurButton;
