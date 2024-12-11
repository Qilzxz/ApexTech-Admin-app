import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import Table from './Table';

function ProductPage() {
  return (
    <div className='ProductPage flex flex-col min-h-screen'>
      <NavBar />
      <h1 className='font-bold text-3xl ml-10 mt-10'>
        Product
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-cart -mt-8" viewBox="0 0 16 16"
        style={{ marginLeft: '116.5px' }}>
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>
      </h1>
      <div className='content flex-grow flex justify-center items-center'>
        <Table />
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
