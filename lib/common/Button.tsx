import React from 'react';
import { ButtonProps } from '../types/button';

const Button = ({
  type,
  onClick,
  label,
  disabled = false,
  width,
  fontSize,
  ariaLabel,
  ariaDescribedBy,
  className = '',
}: ButtonProps) => {
  const widthClass = `w-${width}`;
  const fontSizeClass = `text-${fontSize}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`bg-blue-400  text-white font-bold py-2 px-2 rounded 
        ${widthClass} ${fontSizeClass} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
