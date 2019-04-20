import React, { Fragment } from 'react';

import './Input.scss';

interface IInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
}

export default function Input(props: IInputProps) {
  const { label, value = '', name, onChange = () => {} } = props;

  return (
    <div className={"input"}>
      <label htmlFor={name} className={`${name}Label`}>{label}</label>
      <input className={`${name}Input`} autoComplete="off" id={name} type="text" name={name} onChange={onChange} value={value}/>
    </div>
  );
}