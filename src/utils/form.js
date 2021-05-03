import { useState } from "react";

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    setValue,
    onChange: handleChange,
  };
};

export const useFormFileInput = (initialValue) => {
  const [file, setFile] = useState(initialValue);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return {
    file,
    setFile,
    onChange: handleChange,
  };
};

export const useFormSwitch = (initialValue) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return {
    isChecked,
    setIsChecked,
    onChange: handleChange,
  };
};

export const useFormTogglePassword = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleTooglePassword = () => {
    setValue(!value);
  };

  return {
    value,
    onClick: handleTooglePassword,
  };
};
