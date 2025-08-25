// components/Form/datetime/DateTimePicker.jsx
import React, { useState, useEffect } from "react";
import { StyledDateTimePicker } from "./Styled";

const DateTimePicker = ({
  name,
  value,
  onChange,
  required = false,
  pattern,
  errorMessage,
  validate = false, // 🔹 trigger validation externally
  className = "",
  style,
  ...props
}) => {
  const [error, setError] = useState("");

  const validateValue = (val) => {
    if (required && !val.trim()) {
      setError("This field is required");
    } else if (pattern && !pattern.test(val)) {
      setError(errorMessage || "Invalid date format");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (validate) {
      validateValue(value);
    }
  }, [validate, value]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <StyledDateTimePicker
        type="datetime-local"
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (error) setError("");
        }}
        required={required}
        className={className}
        style={style}
        {...props}
      />
      {error && (
        <span style={{ color: "red", fontSize: "0.8rem", marginTop: "4px"}}>
          {error}
        </span>
      )}
    </div>
  );
};

export default DateTimePicker;
