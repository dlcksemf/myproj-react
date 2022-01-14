import { useContext } from 'react';
import { InputContext } from './emojis/EmojisForm';

function Input({ type, name, className }) {
  const { handleFieldChange, fieldValues } = useContext(InputContext);

  return (
    <input
      type={type ? type : 'text'}
      name={name}
      value={type !== 'file' ? fieldValues[name] : ''}
      placeholder={name}
      accept={type === 'file' && '.png, .jpg, .jpeg'}
      onChange={handleFieldChange}
      className={
        className
          ? className
          : 'py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
      }
    />
  );
}

export default Input;
