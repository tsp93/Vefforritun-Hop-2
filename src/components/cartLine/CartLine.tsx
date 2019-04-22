import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { deleteLine, changeLineQuantity } from '../../api';

import Input from '../input/Input';
import Button from '../button/Button';

import './CartLine.scss';

export default function Cart(props : any) {
  const { line, onDeleteLine } = props;

  const [ deleting, setDeleting ] = useState(false);
  const [ updating, setUpdating ] = useState(false);
  const [ quantity, setQuantity ] = useState(line.quantity);

  function onChange(e : any) {
    setQuantity(e.target.value);
  }

  async function onUpdate() {
    setUpdating(true);
    await changeLineQuantity(line.lineId, quantity);
    setUpdating(false);
  }

  async function onDelete() {
    setDeleting(true);
    const result = await deleteLine(line.lineId);
    if (result.length === 0) {
      await onDeleteLine();
    }
    setDeleting(false);
  }

  return (
    <div className="cartLine">
      {deleting && (
        <p>Færsla eyðist...</p>
      )}
      {!deleting && (
        <Fragment>
          <div className="cartLineImage">
            <img src={line.image}></img>
          </div>
          <div className="cartLineInfo">
            <h2><Link className="cartLineInfoTitle" to={`/product/${line.id}`}>{line.title}</Link></h2>
            <p className="cartLineInfoPrice">Verð: {line.price} kr.</p>
          </div>
          <div className="cartLineManagement">
            {updating && (
              <p>Uppfæri færslu... </p>
            )}
            {!updating && (
              <div className="cartLineManagementQuantity">
                <Input
                  label={'Fjöldi:'}
                  name={`amount`}
                  value={quantity}
                  onChange={onChange}
                  type={'number'}
                  small={true}
                />
                <Button
                  children={'Uppfæra'}
                  onClick={onUpdate}
                  small={true}
                />
              </div>
            )}
            <p className="cartLineManagementTotalPrice">Samtals: {line.total} kr.</p>
            <Button
              className={'cartLineManagementDeleteButton'}
              children={'Eyða Línu'}
              onClick={onDelete}
              small={true}
            />
          </div>
        </Fragment>
      )}
      
    </div>
  );
}