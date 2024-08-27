export type InputProps = {
  type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'; // 지원하는 input 타입
  label: string;
  value: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  width?: string;
  fontSize?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
  errors?: { message?: string };
};
