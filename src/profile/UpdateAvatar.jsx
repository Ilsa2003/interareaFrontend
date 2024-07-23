import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateAvatar({ onClose, onUpdate }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axios.post('https://internareaback.onrender.com/api/avatar/upload', formData);
      const avatarUrl = `https://internareaback.onrender.com/${response.data.file}`;
      onUpdate(avatarUrl);
      setMessage('File uploaded successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setMessage('Error uploading avatar. Please try again.');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} className="mb-4" />
          <div className="flex justify-between">
            <button type="submit" className="bt3">Upload</button>
            <button type="button" onClick={onClose} className="bt4">Cancel</button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default UpdateAvatar;
