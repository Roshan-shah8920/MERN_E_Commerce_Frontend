import React from 'react'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const ShowProduct = () => {
    const { product,addToCart } = useContext(AppContext)  
    return (
        <>
        <div className="container d-flex justify-content-center align-item-center">
        <div className='row d-flex justify-content-center align-item-center'>
            {product.map((product) => <div key={product._id} className='container my-3 col-md-4 '>
                <Link to={`/product/${product._id}`} className="card  shadow-lg" style={{width: '18rem'}}>
                    <div className='d-flex justify-content-center align-item-center p-3'>
                    <img src={product.imgSrc} className="card-img-top" alt="..." style={{width:"200px",height:"200px",borderRadius:"10px",border:"2px solid yellow"}}/>
                    </div>
                        <div className="card-body" >
                            <h5 className="card-title"style={{ textDecoration: "none" }}>{product.title}</h5>
                            <h1 className='price'>₹{product.price} </h1>
                            <button href="#" className="btn btn-primary" onClick={()=>addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>Add To Cart</button>
                        </div>                     
                </Link>
            </div>)}
        </div>
        </div>
        </>
    )
}
export default ShowProduct