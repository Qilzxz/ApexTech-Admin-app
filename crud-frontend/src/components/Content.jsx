import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Content() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !text) {
            setErrorMessage("Please fill in the required details first to publish your post.");
            return;
        };

        try {
            const response = await axios.post('http://localhost:5001/publishedContent', { title, text });

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

    const handleSaveAsDraft = async (event) => {
        event.preventDefault();

        if (!title.trim() || !text.trim()) {
            setErrorMessage("Please fill in the required details first to save as a draft.");
            return;
        };

        try {
            const response = await axios.post("http://localhost:5001/draftContent", {title,text});

            if (response.data.success) {
                setSuccessMessage("Your Blog/Post has been saved as a draft.");
            } else {
                setErrorMessage("Failed to save your Blog/Post as a draft.");
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

    useEffect(() => {
        const fetchContentInfo = async () => {
            setLoading(true)
            try {
                const response = await axios.get("http://localhost:5001/getContent");
                setContents(response.data);
                setLoading(false);
            }
            catch(err) {
                console.error("Error fetching contents information.", err)
                setLoading(false);
            }
        }
        fetchContentInfo();
    }, []);

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
        <div className="stats shadow ml-6 mt-10 w-auto sm:w-2/4">
            <div className="stat">
                {loading ? (
                    <>
                        <span className="loading loading-dots loading-lg"></span>
                        <p>Loading Content Information...</p>
                    </>
                ) : (
                    <>
                        {contents.length > 0 ? (
                            <div>
                                <div className='stat-title font-bold'>Total Created Blog/Post</div>
                                <div className='stat-value ml-2'>{contents[contents.length - 1].content_id}</div>
                            </div>
                        ) : (
                            <div>
                                <div className='stat-title font-bold'>Total Created Blog/Post</div>
                                <div className='stat-value mt-3'>
                                    0
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
        <div className="content flex-grow flex items-center mx-6 -mt-20" style={{userSelect: "none"}}>
          <div className="hero justify-center bg-base-200 w-auto md:w-3/4">
              <div className="hero-content flex-row lg:flex-row-reverse">
                <img src="" className="max-w-sm rounded-lg shadow-2xl" />
                  <div>
                    <h1 className="text-5xl font-bold">Add Blog/Post</h1>
                    <p className="my-4 min-w-64">
                    Use this section to create and publish new blog posts or updates. Fill out the necessary details,
                    including the content to ensure your post is ready for publication.
                    Once you're satisfied with the content, hit the "Publish" button to publish the blog/post.
                    </p>
                    <input
                    type="text"
                    placeholder="Title here"
                    className="input w-full max-w-xs mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                    <textarea
                    className="textarea textarea-bordered w-full mb-3 whitespace-pre-wrap"
                    placeholder="Text here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    />
                    <button className="btn btn-success btn-sm rounded-md" type="submit" onClick={handleSubmit}>
                        Publish
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-send mt-[2px]" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                        </svg>
                    </button>
                    <button className='btn btn-secondary btn-sm rounded-md mx-3' onClick={handleSaveAsDraft}>
                        Save as drafts
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-archive " viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                    <Link to={'/contentOutput'} className='btn btn-neutral btn-sm rounded-md'>Check Blog/Post</Link>
                    {successMessage && <p className='text-lime-400 font-bold w-auto my-5'>{successMessage}</p>}
                    {errorMessage && <p className='text-red-600 font-bold w-auto my-5'>{errorMessage}</p>}
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}
   
export default Content;