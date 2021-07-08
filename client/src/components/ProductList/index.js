import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from '../../utils/helpers';

import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../../features/productsSlice';

function ProductList() {
  const { currentCategory } = useSelector(state => state.categories);
  const { products } = useSelector(state => state.products);
  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);

  const dispatch = useDispatch();

  useEffect(() => {
	  if (productData) {
      console.log(productData.products);
		  dispatch(updateProducts(productData.products));
      console.log("Dispatched", products);

		  // but let's go also take each product and save it to IndexedDB using the helper function
		  productData.products.forEach(product => {
			  idbPromise('products', 'put', product);
		  });
	  } else if (!loading) {
		// since we are offline, get all of the data from the 'products' store
		idbPromise('products', 'get').then(products => {
			//use received data t oset global state for offline browsing
			dispatch(updateProducts(products));
		});
	  }
  }, [productData, loading, dispatch]);

  function filterProducts() {
	  if (!currentCategory) {
		  return products;
	  }

	  return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
