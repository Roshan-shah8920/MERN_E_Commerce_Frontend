import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RealatedProduct from './RealatedProduct';

const ProductDetails = () => {

    const { id } = useParams();
    let url = "http://localhost:3000/api"
    const [product, setpPoduct] = useState()
    useEffect(() => {
        const fetchproduct = async (req, res) => {
            const api = await axios.get(`${url}/product/${id}`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            })
            console.log(api.data.products);
            setpPoduct(api.data.products)

        }
        fetchproduct()
    }, [id])

    return (
        <>
            <div className="container d-flex flex-md-row flex-column align-items-center justify-content-center my-5 p-4 border rounded shadow-lg">

                <div className="left text-center me-md-5">
                    <img
                        src={product?.imgSrc}
                        alt={product?.title}
                        className="img-fluid rounded border border-2 p-1"
                        style={{ width: "300px", height: "300px", objectFit: "cover" }}
                    />
                </div>


                <div className="right p-4 text-md-start text-center">
                    <h2 className="fw-bold text-primary">{product?.title}</h2>
                    <p className="text-muted">{product?.description}</p>
                    <h4 className="text-success fw-bold">₹{product?.price}</h4>
                    <p className="text-danger fw-bold">{product?.category}</p>


                    <div className="mt-3">
                        <button className="btn btn-danger mx-2 px-4 py-2 fw-bold shadow">Buy Now</button>
                        <button className="btn btn-warning px-4 py-2 fw-bold shadow">Add To Cart</button>
                    </div>
                </div>
            </div>
            <RealatedProduct category={product?.category} />
        </>

    )
}

export default ProductDetails