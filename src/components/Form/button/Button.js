import { StyledButton } from "./styled";

const Button = ({
  children,
  onClick,
  type = "button",
  style,
  className = "",
  disabled = false,
  variant = "primary", 
}) => {
  return (
    <StyledButton
      type={type} 
      onClick={onClick}
      style={style}
      className={className}
      disabled={disabled}
      variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
