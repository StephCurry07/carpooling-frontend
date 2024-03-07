import React from "react";

const PrimaryButton = (props) => {
  const { type, children, ...rest } = props;

  if (type === "link") {
    return (
      <a {...rest}>
        {children}
      </a>
    );
  } else {
    return (
      <button {...rest} >
        {children}
      </button>
    );
  }
};

export default PrimaryButton;
