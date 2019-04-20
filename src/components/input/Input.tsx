import React, { Fragment } from 'react';

import './Input.scss';

interface IInputProps {
  value?: string;
  name: string;
  onChange?: () => void;
}

export default function Input(props: IInputProps) {
  const { value = '', name, onChange = () => {} } = props;

  return (
    <div className="input">
      <label htmlFor={name} className={`${name}Label`}>Leita:</label>
      <input className={`${name}Input`} autoComplete="off" id={name} type="text" name={name} onChange={onChange} value={value}/>
    </div>
  );
}