import { InputProps } from '../types/input';

const Input = ({
  type,
  label,
  value,
  onChange,
  name,
  placeholder,
  required = false,
  disabled = false,
  width,
  fontSize,
  ariaLabel,
  ariaDescribedBy,
  className,
  errors,
}: InputProps) => {
  const widthClass = `w-${width}`;
  const fontSizeClass = `text-${fontSize}`;
  const errorId = `${name}-error`;

  return (
        <div className={`${widthClass} flex flex-col gap-1 mb-6`}>
    <label htmlFor={name} className={`block text-gray-700 font-bold mb-2 ${fontSizeClass}`}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={errors ? errorId : ariaDescribedBy}
        className={`shadow appearance-none border rounded w-full py-2 px-2 text-gray-700  ${
          errors ? 'border-red-500' : 'border-gray-300'
        } ${fontSizeClass} ${className}`}
      />
      {errors && (
        <p id={errorId} className="text-xs italic text-red-500">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default Input;
