import { useState } from 'react';

function useFieldValues(initialValues) {
  const [fieldValues, setFieldValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const emptyFieldValues = () => {
    setFieldValues(initialValues);
  };

  return [fieldValues, handleChange, emptyFieldValues, setFieldValues];
}

export default useFieldValues;
