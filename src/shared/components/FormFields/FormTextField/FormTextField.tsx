import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormTextFieldProps = {
  name: string;
  label: string;
} & TextFieldProps;

export const FormTextField: FC<FormTextFieldProps> = ({
  name,
  label,
  ...fieldProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...fieldProps}
          {...field}
          value={
            (typeof field.value === "number" && field.value === 0) ||
            field.value === null
              ? ""
              : field.value
          }
          label={label}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
