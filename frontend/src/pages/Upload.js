import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.onload = function (event) {
            const dataURL = event.target.result;
            console.log(dataURL);
        };
        reader.readAsDataURL(selectedFile);

        reader.onloadend = async () => {
            const result = await uploadImage(reader.result);
            if (result) {
                Swal.fire({
                    icon: 'success',
                    title: 'Image Uploaded',
                    text: 'Your image has been uploaded successfully.',
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                });
                setPreviewSource('')
                setFileInputState('')
            }
        };

        reader.onerror = () => {
            console.log('ERROR');
        }
    }

    const uploadImage = async (base64EncodeImage) => {
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodeImage }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <div className='container'>

            <form onSubmit={handleSubmitFile} className="form">
                <div className='row'>
                    <input type="file" className="form-control" id="fileInput" name="image" onChange={handleFileInputChange} value={fileInputState} />
                    <button type="submit" className="btn btn-primary btn-block mb-4 mt-2">Send</button>
                </div>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    )
}

export default Upload
