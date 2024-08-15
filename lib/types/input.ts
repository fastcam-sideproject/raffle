export type InputProps = {
  type: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  required: boolean;
  width: string;
  fontSize: string;
  register: {
    ref: {
      current: HTMLInputElement | null;
    };
  };
  errors: {
    message: string;
  };
};
