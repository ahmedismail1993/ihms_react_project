import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { ReactComponent as Share } from '../../../assets/images/share.svg';
const Product = ({ product, t }) => {
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          height="200rem"
          src={product.main_image.path}
          alt="Card image cap"
        />
        <div className="sale-share">
          {product.sale > 0 ? (
            <span className="sale">{product.sale}%</span>
          ) : (
            <span></span>
          )}

          <Share className="share-button" />
        </div>
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle className="mb-3">
            <span className="new-price">
              {product.new_price} {t('labels.sar')}{' '}
            </span>
            {product.sale > 0 && (
              <span className="old-price">
                {product.old_price} {t('labels.sar')}{' '}
              </span>
            )}
          </CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
};
export default Product;
