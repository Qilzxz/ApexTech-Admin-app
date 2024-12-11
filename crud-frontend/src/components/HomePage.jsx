import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import conferenceImg from './assets/undraw_conference_re_2yld.svg';

function HomePage() {
    const [email, setEmail] = useState([]);
    const [message, setMessage] = useState(false);

    const handleSubscribe = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5001/newsletter", { email })

            if(response.data.success) {
                setMessage("Subscription successful!");
            } else {
                setMessage("Subscription failed!");
            }
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
        catch(error) {
            console.error('Error subscribing:', error);
            setMessage('An error occurred. Please try again.');
        }
    }
  return (
    <div className='HomePage flex flex-col min-h-screen'>
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
                    <li><Link to={'/'} className='font-bold'>Home</Link></li>
                    <li><Link to={'/product'}>Product</Link></li>
                    <li><Link to={'/content'}>Content</Link></li>
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
                <li><Link to={'/'} className='font-bold'>Home</Link></li>
                <li><Link to={'/product'}>Product</Link></li>
                <li><Link to={'/content'}>Content</Link></li>
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
        <div className='content flex-grow flex items-center mx-6 my-10'>
            <img className='w-2/4 hidden sm:block' src={conferenceImg} alt="Conference" />
            <div className='body-text'>
                <h1 className='text-4xl font-bold w-auto ml-10'>ApexTech Preferences</h1>
                <br />
                <p className='ml-10'>
                    Manage and customize ApexTech's settings and preferences.
                    This admin-only platform allows to make changes efficiently and securely.
                </p>
                <button className='btn btn-primary ml-10 mt-3 rounded-md transition-all duration-300 ease-in-out
                    transform hover:scale-105 hover:bg-blue-600 getStartedBtn'>
                    <Link to={'/product'} className='font-bold'>Get Started</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default HomePage;