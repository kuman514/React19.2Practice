import { useState } from 'react';

export default function TextInput() {
  const [value, setValue] = useState<string>('');
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
    />
  );
}
