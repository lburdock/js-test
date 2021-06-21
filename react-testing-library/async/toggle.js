import React, { useState } from "react";

const Button = ({ children, open = false }) => {
  const [show, setShow] = useState(open);

  const onClick = () => {
    // Arbitrary use of setTimeout to force `getByText` to fail
    setTimeout(() => {
      setShow((prev) => !prev);
    }, 1000);
  };

  return (
    <>
      <button onClick={onClick} type="button">
        {show ? "Hide" : "Show"}
      </button>
      {show && <div>{children}</div>}
    </>
  );
};

export default Button;
