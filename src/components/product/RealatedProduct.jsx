import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { data } from 'react-router-dom'
import { Link } from 'react-router-dom'

const RealatedProduct = ({category}) => {
    const {product} = useContext(AppContext)
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        if (category && product) {
          setRelatedProduct(
            product.filter((data) => 
              (data?.category || "").toLowerCase() === (category || "").toLowerCase()
            )
          );
        }
      }, [category, product]);
      
    
  return (
    <>
    <div className="container text-center">
    <h1  style={{fontSize:"50px"}}>Realated Product</h1>
     <>
            <div className="container d-flex justify-content-center align-item-center">
            <div className='row d-flex justify-content-center align-item-center'>
                {relatedProduct.map((product) => <div key={product._id} className='container my-3 col-md-4 '>
                    <Link to={`/product/${product._id}`} className="card  shadow-lg" style={{width: '18rem'}}>
                        <div className='d-flex justify-content-center align-item-center p-3'>
                        <img src={product.imgSrc} className="card-img-top" alt="..." style={{width:"200px",height:"200px",borderRadius:"10px",border:"2px solid yellow"}}/>
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <h1 className='price'>₹{product.price} </h1>
                                <button href="#" className="btn btn-primary">Add To Cart</button>
                            </div>                     
                    </Link>
                </div>)}
            </div>
            </div>
            </>
    </div>
    </>
  )
}

export default RealatedProduct