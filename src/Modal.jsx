import React, { useEffect, useRef } from 'react'
import {FaWindowClose , FaArrowLeft, FaArrowRight} from "react-icons/fa"

const Modal = ({images, selectedId, setSelectedId, setModal}) => {
    const timerId = useRef(null)

    useEffect(() => {
        if (timerId.current){
            clearInterval(timerId.current)
        }

        timerId.current = setInterval(() => {
            // console.log("pic chages")
            if (selectedId === images.length-1){
                setSelectedId(0)
            } else {
                setSelectedId(p => p+1)
            }
        }, 5000)

        return () => {
            clearInterval(timerId.current)
        }
    }, [selectedId])

    const handleClose = () => {
    setModal(false)
    setSelectedId(null)
  }

    const handlePrev = () => {
    if (selectedId === 0){
      setSelectedId(images.length-1)
    } else {
      setSelectedId(p => p-1)
    }
  }

  const handleNext = () => {
    if (selectedId === images.length-1){
      setSelectedId(0)
    } else {
      setSelectedId(p => p+1)
    }
  }

  return (
    (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50"
        >
          {/* Close (Cancel) Button */}
          <button
            className="absolute top-4 right-4 text-white text-3xl p-2 bg-black/40 rounded-full"
            onClick={(e) => {
              handleClose();
            }}
          >
            <FaWindowClose  />
          </button>

          {/* Selected Image */}
          <img
            src={images[selectedId]?.download_url}
            alt={images[selectedId]?.author}
            className="rounded-xl max-h-[90%] shadow-lg"
          />

          {/* Left Nav */}
          {selectedId > 0 && (
            <button
              className="absolute left-4 text-white text-3xl p-2 bg-black/40 rounded-full"
              onClick={(e) => {
                handlePrev();
              }}
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Right Nav */}
          {selectedId < images.length - 1 && (
            <button
              className="absolute right-4 text-white text-3xl p-2 bg-black/40 rounded-full"
              onClick={(e) => {
                handleNext();
              }}
            >
              <FaArrowRight />
            </button>
          )}
        </div>
      )
  )
}

export default Modal