import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Content() {

    const [title, setTitle] = useState([]);
    const [text, setText] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/content', { title, text });

            if(response.data.success) {
                setSuccessMessage("Your Blog/Post has been published to the main website.");
            } else {
                setErrorMessage("Failed to publish your Blog/Post to the main website.");
            }

            setTimeout(() => {
                setSuccessMessage('') || setErrorMessage('');
            }, 5500);
        }
        catch(err) {
            console.error("Error Publishing: " + err);
            setErrorMessage("Failed to publish, please try again later.");
        };
    };

  return (
    <div className='ContentPage flex flex-col min-h-screen'>
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/product'}>Product</Link></li>
                    <li><Link to={'/content'} className='font-bold'>Content</Link></li>
                </ul>
                </div>
                <a className="btn btn-ghost text-2xl">
                    ApexTech Admin
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-lines-fill mt-1" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                    </svg>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/product'}>Product</Link></li>
                <li><Link to={'/content'} className='font-bold'>Content</Link></li>
                </ul>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-base">
                </ul>
            </div>
            <div className='navbar-end'>
                <input type="text" placeholder="Search" className="input input-bordered w-24 hidden sm:block md:w-auto" />
                <button className="sm:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search mr-2" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
        </div>
        <h1 className='font-bold text-3xl ml-10 mt-10'>
            Content
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-cart -mt-8" viewBox="0 0 16 16"
                style={{ marginLeft: '116.5px' }}>
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
        </h1>
        <p className='ml-10 mt-3'>Write blog/post here to be displayed in the main website</p>
        <div className="content flex-grow flex items-center mx-6 my-10">
          <div className="hero justify-center bg-base-200 w-auto md:w-3/4">
              <div className="hero-content flex-row lg:flex-row-reverse">
                <img src="" className="max-w-sm rounded-lg shadow-2xl" />
                  <div>
                    <h1 className="text-5xl font-bold">Add Blog/Post</h1>
                    <p className="my-4 min-w-64">
                    Use this section to create and publish new blog posts or updates. Fill out the necessary details,
                    including the content to ensure your post is ready for publication.
                    Once you're satisfied with the content, hit the "Submit" button to publish the blog/post.
                    </p>
                    <input
                    type="text"
                    placeholder="Title here"
                    className="input w-full max-w-xs mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                    className="textarea textarea-bordered w-full mb-3"
                    placeholder="Text here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    ></textarea>
                    <button className="btn btn-success btn-sm rounded-md" type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                    <Link to={'/contentOutput'} className='btn btn-neutral btn-sm rounded-md mx-3'>Check Blog/Post</Link>
                    {successMessage && <p className='text-lime-400 font-bold w-auto my-5'>{successMessage}</p>}
                    {errorMessage && <p className='text-red-600 font-bold'>{errorMessage}</p>}
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}
   
export default Content;