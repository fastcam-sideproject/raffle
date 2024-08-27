import React from 'react';
import { ButtonProps } from '../types/button';

export default function Button({
  type,
  onClick,
  label,
  disabled = false,
  width,
  fontSize,
  ariaLabel,
  ariaDescribedBy,
  className,
  backgroundColor,
  children,
}: ButtonProps) {
  const widthClass = `w-${width}`;
  const fontSizeClass = `text-${fontSize}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`${backgroundColor} text-white font-bold py-2 px-2 rounded 
        ${widthClass} ${fontSizeClass} ${className}`}
    >
      {label}
      {children}
    </button>
  );
}
