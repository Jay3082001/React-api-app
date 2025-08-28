import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper, StyledInput } from "./Styled";

const PasswordInput = ({
  name = "password",
  placeholder = "Password",
  value,
  onChange,
  pattern,
  errorMessage,
  validate,
  variant = "default" 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
    <Wrapper>
      <StyledInput
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        pattern={pattern}
        // errorMessage={errorMessage}
        // validate={validate}
        variant={variant} 
      />
      <FontAwesomeIcon
        icon={showPassword ? "eye" : "eye-slash"}
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#666", 
        }} 
      />
    </Wrapper>
    {validate && errorMessage && (
        <div style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
          {errorMessage}
        </div>
      )}
      </>
  );
};

export default PasswordInput;
