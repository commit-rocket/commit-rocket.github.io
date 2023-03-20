import { ErrorMessage, FieldValuesFromFieldErrors } from "@hookform/error-message";
import { FieldErrors, FieldName, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface ErrorProps<Name extends string, FieldValues extends Record<Name, any>> {
  className?: string;
  state: UseFormReturn<FieldValues, any>["formState"];
  name: Name;
}

const Error = <Name extends string, FieldValues extends Record<Name, any>>({ className, state, name }: ErrorProps<Name, FieldValues>) => {
  const errors = state.errors;

  return (
    <ErrorMessage
      errors={errors}
      name={name as unknown as FieldName<FieldValuesFromFieldErrors<FieldErrors<FieldValues>>>}
      render={({ message }) => (
        <p role="alert" className={twMerge("text-red-600 font-semibold", className)}>
          {message}
        </p>
      )}
    />
  );
};

export default Error;