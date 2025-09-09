import { useState } from "react";
import type { FormStatus } from "../types/form.types";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** HTML id for input and accessible label */
  id: string;

  /** Input label */
  label: string;

  /** Error message for input */
  error?: string;

  /** True if the form has been submitted */
  formStatus: FormStatus;
}

/** Input with label and logic for tracking touched */
export default function Input({
  label,
  error,
  id,
  onBlur,
  formStatus,
  ...inputProps
}: InputProps) {
  const [touched, setTouched] = useState(false);

  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        className="border border-gray-300"
        id={id}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        {...inputProps}
      />
      {(touched || formStatus === "submitted-with-errors") && error && (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
}
