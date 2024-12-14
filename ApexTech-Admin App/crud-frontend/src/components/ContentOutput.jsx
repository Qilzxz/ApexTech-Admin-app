import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorImg from './assets/warning (2).png';

function ContentOutput() {
    const [contents, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [troubleShootMessage, setTroubleShootMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [save, setSave] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);

            try {
                const response = await axios.get("http://localhost:5001/getContent");
                setContent(response.data);
                setLoading(false);
            }
            catch (err) {
                setErrorMessage(`Error fetching content: ${err.message}`);
                setLoading(true);
                setTimeout(() => {
                    if (loading) {
                        setMessage("Content takes too long too load?");
                        setTroubleShootMessage("Try these things");
                    }
                }, 15500);
            }
        };
        fetchContent();
    }, []);

    const handlePublishContent = async (content_id) => {

        try {
            const response = await axios.post("http://localhost:5001/publishContent", {
                content_id
            });

            if (response.data.success) {
                window.alert("Draft content successfully published!");
                window.location.reload();
            } else {
                window.alert("Failed to publish draft content: " + response.data.message);
            }
        }
        catch (error) {
            window.alert('Error publishing draft: ' + error.message);
        };
    };

    const handleDeleteContent = async () => {
        try {
            const response = await axios.post("http://localhost:5001/deleteContent", { content_id: selectedContentId });
            if (response.data.success) {
                window.alert(`Post number ${selectedContentId} has been deleted!`);
                window.location.reload();
            } else {
                window.alert("Failed to delete content.");
            }
            setIsModalOpen(false);
        }
        catch (error) {
            window.alert('Error deleting content: ' + error.message);
            setIsModalOpen(false);
        }
    };

    /*const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kuala_Lumpur',
        });
    };*/

    const handleContentChange = (contentId, field, value) => {
        setContent(prevContents =>
          prevContents.map(content =>
            content.content_id === contentId ? { ...content, [field]: value } : content
          )
        );
      };

    const handleSaveContent = async (title, text, content_id) => {
         try {
            const response = await axios.post("http://localhost:5001/saveContent", {title, text, content_id});

            if (response.data.success) {
                setSave(true);
                setMessage("Content saved successfully! You can now continue editing or close this edit box");
                setTimeout(() => {
                    setMessage("");
                }, 10000);
            }
         }
         catch(error) {
            console.log('Error saving content: ' + error.message);
            setErrorMessage("Failed to save changes: " + error.message);
            setIsContentModalOpen(true);
         }
    }

    const checkEdited = async (edited, content_id) => {
        if (edited === 'true') {
            setSelectedContentId(content_id);
            return (
                <p className='text-xs text-neutral-500 italic'>Edited</p>
            )
        } else {
            return null;
        };
    };
      
    const renderStatusBadge = (status, content_id) => {

        if (status === 'published') {
            return (
                <>
                    <div className='badge badge-success'>Published</div>
                    <div className='badge badge-secondary ml-3'
                        onClick={() => {
                            setSelectedContentId(content_id);
                            setIsContentModalOpen(true)
                        }}>
                        Edit
                    </div>
                    <div className='badge badge-error pointer-events-auto hover:cursor-pointer ml-3'
                        onClick={() => {
                            setSelectedContentId(content_id);
                            setIsModalOpen(true);
                        }}>
                        Delete
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash-fill ml-1" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                        
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='badge badge-neutral pointer-events-auto'>Draft</div>
                    <div className='badge badge-secondary ml-3'
                        onClick={() => {
                            setSelectedContentId(content_id);
                            setIsContentModalOpen(true)
                        }}>
                        Edit
                    </div>
                    <div className='badge badge-primary mx-3 hover:cursor-pointer' onClick={() => handlePublishContent(content_id)}>
                        Click here to publish
                    </div>
                    <div className='badge badge-error pointer-events-auto hover:cursor-pointer'
                        onClick={() => {
                            setSelectedContentId(content_id);
                            setIsModalOpen(true);
                        }}>
                        Delete
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash-fill ml-1" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                    </div>
                </>
            )
        }
    };

    return (
        <div className='contentOutputBody font-bold text-3xl flex justify-center items-center min-h-screen'>
            {loading ? (
                <div className='loadingElement fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                    <span className="loading loading-dots loading-lg"></span>
                    <p className='mt-2 ml-2'>
                        <span className='flex text-sm -mt-2 ml-2'>Loading Content Data...</span>
                        <p className='flex text-xs ml-2'>
                            {message}
                            <span className='underline ml-1 text-blue-500 hover:cursor-pointer'>{troubleShootMessage}</span>
                        </p>
                    </p>
                </div>
            ) : (
                <React.Fragment>
                    <div className='contentData flex flex-wrap gap-4 justify-start'>
                        {errorMessage ?
                            <>
                                <p className='text-red-500 text-lg font-bold'>
                                    <img src={ErrorImg} className='ml-[120px] w-20 mb-2' />
                                    {errorMessage}
                                    <br />
                                    <span className='flex justify-center'>Try again later</span>
                                </p>
                            </>
                            : (
                                <>
                                    {contents.length > 0 ? contents.map((content, index) => (
                                        <div className="card bg-base-100 w-auto shadow-xl my-5 flex" key={index}>
                                            <div className="card-body flex whitespace-pre-wrap">
                                                <div className='divider divider-horizontal'></div>
                                                <p className='font-bold text-lg w-4/4'>
                                                    {content.content_id}.
                                                    <span className=''> {content.text}</span>
                                                </p>
                                                <div className='divider'></div>
                                                <p className='text-base'>{content.title}</p>
                                                
                                                <div className='badge-container'>{renderStatusBadge(content.status, content.content_id)}</div>
                                                
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
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Content</h3>
                        <p className="py-4" onClick={() => setIsContentModalOpen(false)}>
                            Are you sure you want to delete content with ID {selectedContentId}?
                        </p>
                        <div className="modal-action">
                            <button className="btn btn-primary btn-sm" onClick={() => handleDeleteContent()}>Yes, Delete</button>
                            <button className="btn btn-sm btn-neutral" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {isContentModalOpen && (
              <div id="my_modal_1" className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Edit Content Id: {selectedContentId}</h3>
                {contents.length > 0 ? (
                contents
                  .filter(content => content.content_id === selectedContentId)
                  .map(content => (
                      <div key={content.content_id}>
                          <input type='text' className='input text-lg my-2 p-2 rounded-md' value={content.text}
                            onChange={(e) => handleContentChange(content.content_id, 'text', e.target.value)}
                          />
                          <textarea className='textarea textarea-bordered min-h-48 w-full mb-3 whitespace-pre-wrap' value={content.title}
                            onChange={(e) => handleContentChange(content.content_id, 'title', e.target.value)}
                          />
                          {save ? (<p className='text-xs text-neutral-500'>{message}</p>)
                          : <p className='text-xs text-red-500'>{errorMessage}</p>}
                            <div className="modal-action">
                            <button className="btn btn-sm" onClick={() => {setIsContentModalOpen(false); setMessage("");}}>
                                Close
                            </button>
                            <button className='btn btn-secondary btn-sm rounded-md'
                            onClick={() => handleSaveContent(content.title, content.text, selectedContentId)}>
                                Save
                            </button>
                          </div>
                      </div>
                  ))
                ) : (
                  <p>Can't Fetch Content!</p>
                )}
                </div>
              </div>
            )}
        </div>
    );
}

export default ContentOutput;
