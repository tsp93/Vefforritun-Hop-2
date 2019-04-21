import React from 'react';

import './Product.scss';
import Input from '../input/Input';
import Button from '../button/Button';

export default function Product(props : any) {
  const { image, title, description, category, price, loggedIn, productAmount, onChange, onClick, added } = props;

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
            />
            {added && (
              <p>Bætt við körfu!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
