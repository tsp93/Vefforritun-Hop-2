import React from 'react';

import { IError } from '../../api/types';

import './Errors.scss';

export default function Errors(props : any) {
  const { errors } = props;

  function showErrors(errors : IError[]) {
    const array : any = [];
    for (let i = 0; i < errors.length; i += 1) {
      array.push(
        <li className="error">
          <p className="errorMessage">{errors[i].field}, {errors[i].message}</p>
        </li>
      );
    }
    return array;
  }

  return (
    <ul className="errorList">
      {showErrors(errors)}
    </ul>
  );
}
