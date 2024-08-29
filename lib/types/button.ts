export type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
  width: string;
  fontSize: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  backgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
};
