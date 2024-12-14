import React, { useState } from 'react';
import axios from 'axios';

function Footer() {
    
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
    <div className='Footer-div'>
        <footer className="footer bg-base-200 text-base-content rounded=lg p-10">
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            <form onSubmit={handleSubscribe}>
                <h6 className="footer-title">Newsletter</h6>
                <fieldset className="form-control w-80">
                <label className="label">
                    <span className="label-text">Enter your email address to keep updated</span>
                </label>
                <div className="join">
                    <input
                    type="text"
                    placeholder="username@site.com"
                    className="input input-bordered join-item"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn btn-primary join-item">Subscribe</button>
                </div>
                </fieldset>
                {message && <p className="text-lime-400 ml-1">{message}</p>}
            </form>
        </footer>
    </div>
  )
}

export default Footer