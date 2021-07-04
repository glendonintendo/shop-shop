import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
	  if (productData) {
		  dispatch({
			  type: UPDATE_PRODUCTS,
			  products: productData.products
		  });

		  // but let's go also take each product and save it to IndexedDB using the helper function
		  productData.products.forEach(product => {
			  idbPromise('products', 'put', product);
		  });
	  } else if (!loading) {
		// since we are offline, get all of the data from the 'products' store
		idbPromise('products', 'get').then(products => {
			//use received data t oset global state for offline browsing
			dispatch({
				type: UPDATE_PRODUCTS,
				products: products
			});
		});
	  }
  }, [productData, loading, dispatch]);

  function filterProducts() {
	  if (!currentCategory) {
		  return state.products;
	  }

	  return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
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
