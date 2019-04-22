import React, { Fragment } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';

import './Product.scss';

export default function Product(props : any) {
  const { image, title, description, category, price, loggedIn, productAmount, onChange, onClick, added, addLoading } = props;

  return (
    <div className="product">
      <div className="productImg">
        <img src={image}></img>
      </div>
      <div className="productInfo">
        <h3>{title}</h3>
        <div className="productTitPri">
          <p>Flokkur: {category.title}</p>
          <p className="productPri">Verð: {price} kr.</p>
        </div>
        <div className="productDes">
          {description && (
            description.split('\n').map((desc : any, i : number) => {
              return (
                <p className="productDesParagraph" key={i}>{desc}</p>
            )}
          ))}
        </div>
        {loggedIn && (
          <Fragment>
            {addLoading && (
              <p>Bætir við körfu...</p>
            )}
            {!addLoading && (
              <div className="productAddToCart">
              <Input
                label={'Fjöldi'}
                name={'amount'}
                value={productAmount.toString()}
                onChange={onChange}
                type={'number'}
                small={true}
              />
              <Button
                className={'productAddToCartButton'}
                children={'Bæta við körfu'}
                onClick={onClick}
                small={true}
                disabled={added}
              />
              {added && (
                <p>Bætt við körfu!</p>
              )}
            </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}
