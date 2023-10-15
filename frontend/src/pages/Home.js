import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react';
import { Puff } from 'react-loader-spinner';

function Home() {
  const [imageIds, setImageIds] = useState();
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImageIds(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <Puff
            color="#00BFFF"
            height={50}
            width={50}
            timeout={3000}
          /></div>
      ) : (
        <>
          <div className="container">
            <div className="row">
              {imageIds &&
                imageIds.map((imageId, index) => (
                  <div key={index} className="col-lg-4 col-md-6 mb-4">
                    <Image
                      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                      publicId={imageId}
                      width="300"
                      height="300"
                      crop="scale"
                    />
                  </div>
                ))}
            </div>
          </div>
        </>)}

    </div>
  )
}

export default Home
