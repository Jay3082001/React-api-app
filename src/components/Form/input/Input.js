import React, { useState, useEffect } from "react";
import { StyledInput } from "./styled"; 

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
  errorMessage, 
  className = "",
  style,
  validate = false,  
  ...props
}) => {
  const [error, setError] = useState("");

  const runValidation = (val) => {
    if (required && !val.trim()) {
      setError("This field is required");
      return false;
    } else if (pattern && !pattern.test(val)) {
      setError(errorMessage || "Invalid format");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  useEffect(() => {
    if (validate) {
      runValidation(value || "");
    }
  }, [validate]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (error) setError(""); // clear error on typing
        }}
        placeholder={placeholder}
        required={required}
        className={className}
        style={style}
        {...props}
      />
      {error && (
        <span style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;