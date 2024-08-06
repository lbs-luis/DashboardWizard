import { useState } from 'react';

function useCurrencyInput() {
  const [value, setValue] = useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;
    val = val.replace(/[^0-9]/g, '');
    val = (Number(val) / 100).toFixed(2);
    setValue(val);
  }

  function getValue() {
    return Number(value)
  }

  return {
    value,
    handleChange,
    getValue,
  };
}

export default useCurrencyInput;
