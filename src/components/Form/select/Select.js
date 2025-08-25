import { StyledSelect } from "./Style";

const Select = ({ name, value, onChange, options = [], className = "", style, required, ...props }) => {
  return (
    <StyledSelect
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      style={style}
      required={required}
      {...props}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
