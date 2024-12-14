import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Table() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5001/getProduct');
                setProducts(response.data);
                setSelectedProduct(response.data);
                setLoading(false);
            }
            catch {
                console.error("Error fetching products.");
                setErrorMessage("Error fetching products");
                setMessage("Please try again later");
                setLoading(true);
            }
        };
        fetchProducts();
    }, []);

    const ProductDetailsText = () => {
        return(
            <>
                <p className='flex justify-center mt-10 font-bold my-8'>Click on the product to view more details</p>
            </>
        )
    }

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="overflow-x-auto mx-2 mt-10">
            {loading ? ( 
                <div className="flex justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <table className="table md:w-auto mb-5">
                    {errorMessage ? <p>{errorMessage}</p> : (
                        <React.Fragment>
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>Product Id</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>In Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length > 0 ? products.map((product, index) => (
                                        <React.Fragment>
                                            <tr className='bg-base-200 hover:cursor-pointer md:w-auto' key={index}>
                                                <th className='productId' onClick={() => openModal(product)}>
                                                    {product.product_id}
                                                </th>
                                                <td className='productName' onClick={() => openModal(product)}>
                                                    {product.product_name}
                                                </td>
                                                <td className='productPrice'onClick={() => openModal(product)}>
                                                    {product.price}
                                                </td>
                                                <td className='productInStock'onClick={() => openModal(product)}>
                                                    {product.in_stock}
                                                </td>
                                                <button className='btn btn-xs sm:btn-sm md:btn-md sm:w-auto lg:btn-md btn-neutral my-2 mx-2 rounded-lg'>
                                                    Edit
                                                </button>
                                            </tr>
                                        </React.Fragment>
                                    )) : (
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2 text-center" colSpan="3">
                                                No products available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </React.Fragment>
                    )}
                </table>
            )}

            {!loading ? <ProductDetailsText />
            :<p className='justify-center'>
                <span className='flex justify-center'>Loading Data...</span><br />
            </p>}

            {isModalOpen && selectedProduct && (
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{selectedProduct.product_name}</h3>
                        <p className="py-4">
                            Product Id: {selectedProduct.product_id} <br />
                            Price: ${selectedProduct.price} <br />
                            In Stock: {selectedProduct.in_stock} <br />
                            Description: {selectedProduct.description} <br />
                            Brand: {selectedProduct.brand}
                        </p>
                        <div className="modal-action">
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default Table;
