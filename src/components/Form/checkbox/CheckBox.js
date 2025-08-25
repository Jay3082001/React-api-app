import { StyledCheckbox } from "./styled";

const Checkbox = ({ name, checked, onChange, label, required, style, className }) => (
  <label style={{ display: "flex", alignItems: "center", gap: "6px", ...style }}>
    <StyledCheckbox
      name={name}
      checked={checked}
      onChange={onChange}
      required={required}
      className={className}
    />
    {label && <span>{label}</span>}
  </label>
);

export default Checkbox;
