import React, { useState } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('Choose file');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">File Upload</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            className="form-input"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload
        </button>
        <p className="mt-2">{fileName}</p>
      </form>
    </div>
  );
};

export default FileUploadForm;