export type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  width: string;
  fontSize: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  backgroundColor?: string;
  className?: string;
};
