import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { Link, useParams } from 'react-router-dom';

const SearchProduct = () => {
    const { product } = useContext(AppContext);
    const [searchProduct, setSearchProduct] = useState([]);

    const { term } = useParams();
    
    console.log("Search Term:", term);
    console.log("All Products:", product);

    useEffect(() => {
        if (term && product?.length > 0) {  // Check if term and product exist
            setSearchProduct(
                product.filter((data) =>
                    (data?.title || "").trim().toLowerCase().includes(term.trim().toLowerCase())
                )
            );
        }
    }, [term, product]);

    return (
        <div className="container text-center">
            {searchProduct.length > 0 ? (
                <div className="container d-flex justify-content-center align-item-center">
                    <div className='row d-flex justify-content-center align-item-center'>
                        {searchProduct.map((product) => (
                            <div key={product._id} className='container my-3 col-md-4 '>
                                <Link to={`/product/${product._id}`} className="card shadow-lg" style={{ width: '18rem' }}>
                                    <div className='d-flex justify-content-center align-item-center p-3'>
                                        <img 
                                            src={product.imgSrc} 
                                            className="card-img-top" 
                                            alt={product.title} 
                                            style={{ width: "200px", height: "200px", borderRadius: "10px", border: "2px solid yellow" }} 
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <h1 className='price'>₹{product.price} </h1>
                                        <button className="btn btn-primary">Add To Cart</button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h3>No Products Found</h3>
            )}
        </div>
    );
}

export default SearchProduct;
