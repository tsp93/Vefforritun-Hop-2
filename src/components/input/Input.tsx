import React, { Fragment } from 'react';

import './Input.scss';

interface IInputProps {
  label: string;
  value: string;
  name: string;
  type?: string;
  small?: boolean;
  onChange: (e: any) => void;
}

export default function Input(props: IInputProps) {
  const { label, value = '', name, type = 'text', onChange = () => {}, small = false } = props;

  const classes = [
    'input',
    small ? 'input--small' : null
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <label htmlFor={name} className={`${name}Label`}>{label}</label>
      <input className={`${name}Input`} autoComplete="off" id={name} type={type} name={name} onChange={onChange} value={value}/>
    </div>
  );
}