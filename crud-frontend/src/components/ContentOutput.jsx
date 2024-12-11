import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorImg from './assets/warning (2).png';

function ContentOutput() {

    const [contents, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);

            try {
                const response = await axios.get("http://localhost:5001/getContent");
                setContent(response.data);
                setLoading(false);
            }
            catch(err) {
                setErrorMessage(`Error fetching content: ${err.message}`);
                setLoading(true)
            }
        };
        fetchContent();
    }, []);

  return (
    <div className='font-bold text-3xl flex justify-center items-center h-screen'>
        {loading ? (
            <div className='flex'>
                <span className="loading loading-dots loading-lg"></span>
                <div className='divider divider-horizontal'></div>
                <p className='mt-2 ml-2'>
                    <span className='flex text-sm'>Loading Content Data...</span>
                </p>
            </div>
        ) : (
            <React.Fragment>
                <div className='contentData flex flex-wrap gap-4 justify-center'>
                    {errorMessage ?
                    <>
                        
                        <p className='text-red-500 text-lg font-bold'>
                            <img src={ErrorImg} className='ml-[120px] w-20 mb-2'/>
                            {errorMessage}
                            <br />
                            <span className='flex justify-center'>Try again later</span>
                        </p>
                    </>
                    : (
                        <>
                        {contents.length > 0 ? contents.map((content, index) => (
                            <div className="card bg-base-100 w-96 shadow-xl my-5" key={index}>
                                <div className="card-body">
                                    <div className='divider divider-horizontal'></div>
                                    <p className='font-bold text-lg w-4/4'>
                                        {content.content_id}.
                                        <span className=''> {content.text}</span>
                                    </p>
                                    <div className='divider'></div>
                                    <p className='text-base'>{content.title}</p>
                                    <div className="card-actions justify-end">
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className='text-lg'>
                                <span className='flex justify-center'>No content available</span>
                                Upload a blog/post at 
                                <Link className='font-bold text-blue-500' to='/content'> Content </Link>
                                page in order to appear
                            </div>
                        )}
                        </>
                    )}
                </div>
            </React.Fragment>
        )}
    </div>
  )
}

export default ContentOutput;