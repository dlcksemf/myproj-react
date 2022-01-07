import { useState } from 'react';

function useFieldValues(initialState) {
  const [fieldValues, setFieldValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const emptyFieldValues = () => {
    setFieldValues(initialState);
  };

  return [fieldValues, handleChange, emptyFieldValues, setFieldValues];
}

export default useFieldValues;
