import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import { useSelector, useDispatch } from 'react-redux';
import { updatedProducts } from '../features/productsSlice';  
import { removedFromCart, updatedProductQuantityInCart, addedToCart } from '../features/cartSlice';

import Cart from '../components/Cart';

import { idbPromise } from '../utils/helpers';

function Detail() {
  const { products } = useSelector(state => state.products);
  const { cart } = useSelector(state => state.cart);
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (data) {
      dispatch(updatedProducts(data.products));

      data.products.forEach(product => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then(products => {
        dispatch(updatedProducts(products));
      });
    }
  }, [products, data, dispatch, id, loading]);

  const addToCart = () => {
    const itemInCart = cart.find(cartItem => cartItem._id === id);

    if (itemInCart) {
      dispatch(updatedProductQuantityInCart({
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }));

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addedToCart({ ...currentProduct, purchaseQuantity: 1 }));

      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch(removedFromCart(currentProduct._id));

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button 
				disabled={!cart.find(p => p._id === currentProduct._id)}
				onClick={removeFromCart}
			>
				Remove from Cart
			</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
	  <Cart />
    </>
  );
}

export default Detail;
