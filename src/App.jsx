import React, { useEffect, useState } from 'react'

import Modal from './Modal'

const App = () => {
  const [images, setImages] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=10")
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => {
        console.log(err.message)
        alert(err.message)
      })
  }, []) 

  const handleOpen = (id) => {
    setModal(true)
    setSelectedId(id)
  }

  

  

if (!images){
  return <h1>Loading...</h1>
}

if (images.length === 0){
  return <h1>No images to show</h1>
}

  return (
    <div className="p-4">
      {/* Horizontal Scrollable Story List */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {images?.map((image, index) => (
          <img
            key={image?.id}
            src={image?.download_url}
            alt={image?.author}
            className="rounded-lg w-[120px] h-[200px] object-cover cursor-pointer flex-shrink-0"
            onClick={() => handleOpen(index)}
          />
        ))}
      </div>

      {/* Modal */}
      {modal && <Modal images={images} selectedId={selectedId} setSelectedId={setSelectedId} setModal={setModal}/>}
    </div>
  );
}

export default App