import React from "react";

const Button = ({ children, empty, loading, onClick }) => {
  if (empty) return null;

  return (
    <button disabled={loading} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
