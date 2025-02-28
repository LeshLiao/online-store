import React, { useState, useEffect } from 'react'
import classes from './review.frame.module.css'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { redoWaitingItem, deleteWaitingAndItem, reviewWaitingItem } from '../../services/itemService'
import { toast } from 'react-toastify' // Make sure you have react-toastify installed

export default function ReviewFrame ({ item, index }) {
  // check google drive or firebase url
  const imgUrl = item.url
  const [sourceImage, setSourceImage] = useState(imgUrl)
  const [previewImage, setPreviewImage] = useState(item.itemUrl)
  const [isReviewing, setIsReviewing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showRedoConfirm, setShowRedoConfirm] = useState(false)

  useEffect(() => {
    setSourceImage(imgUrl)
    setPreviewImage(item.itemUrl)
  }, [imgUrl, item.itemUrl])

  const navigate = useNavigate()

  const confirmRedo = () => {
    setShowRedoConfirm(true)
  }

  const cancelRedo = () => {
    setShowRedoConfirm(false)
  }

  const handleRedo = () => {
    setShowRedoConfirm(false)
    redoWaitingItem(item._id)
      .then(() => {
        toast.success('Item has been reset for processing')
        // Sleep for one second (1500 milliseconds) then navigate
        setTimeout(() => {
          navigate('/review')
        }, 1500)
      })
  }

  const confirmDelete = () => {
    setShowDeleteConfirm(true)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  const handleDelete = () => {
    setShowDeleteConfirm(false)
    deleteWaitingAndItem(item._id)
      .then(() => {
        toast.success('Item deleted successfully')
        setTimeout(() => navigate('/review'), 1000)
      })
  }

  const handleReview = async () => {
    setIsReviewing(true)
    setErrorMessage('')

    try {
      const result = await reviewWaitingItem(item._id)

      if (result.success) {
        toast.success('Item marked as reviewed')
        // Update the UI to show item is now reviewed
        setTimeout(() => navigate('/review'), 1000)
      } else {
        // Show error message
        setErrorMessage(result.message)

        if (result.status === 400) {
          // This is the specific error we want to show in the UI
          toast.error('Cannot mark as reviewed: itemId or itemUrl is missing.')
        } else {
          toast.error(result.message || 'Failed to review item')
        }
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred')
      toast.error('Failed to communicate with server')
    } finally {
      setIsReviewing(false)
    }
  }

  const reviewIcon = item.review
    ? '/images/icon/checked.png'
    : '/images/icon/unchecked.png'

  // Determine status text and class based on item.status
  const getStatusDisplay = () => {
    if (item.status === 'in_process') {
      return {
        text: 'In Progress',
        className: classes.status_in_progress
      }
    } else if (!item.status || item.status === '') {
      return {
        text: 'Not Started',
        className: classes.status_not_started
      }
    } else {
      return {
        text: item.status,
        className: ''
      }
    }
  }

  const statusDisplay = getStatusDisplay()

  return (
    <div className={classes.frame}>
      <div className={classes.main_container}>
        <div className={classes.images_container}>
          {/* Source Image - Left Side */}
          <div className={classes.image_wrapper}>
            <img
              className={classes.image}
              src={sourceImage}
              alt="source"
            />
          </div>

          {/* Preview Image - Right Side */}
          <div className={classes.image_wrapper}>
            {previewImage
              ? (
              <img
                className={classes.image}
                src={previewImage}
                alt="preview"
              />
                )
              : (
              <div className={classes.empty_preview}>
                <div className={`${classes.status_text} ${statusDisplay.className}`}>
                  {statusDisplay.text}
                </div>
              </div>
                )}
          </div>
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div className={classes.error_message}>
            {errorMessage}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className={classes.confirm_overlay}>
            <div className={classes.confirm_dialog}>
              <p>Deleting this item will remove its associated image from Firebase Storage and delete its entry from the waiting list. Are you sure you want to proceed?</p>
              <div className={classes.confirm_buttons}>
                <button className={classes.confirm_yes} onClick={handleDelete}>Yes</button>
                <button className={classes.confirm_no} onClick={cancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}

        {/* Redo Confirmation Dialog */}
        {showRedoConfirm && (
          <div className={classes.confirm_overlay}>
            <div className={classes.confirm_dialog}>
              <p>This will reset the item and send it back for processing. Are you sure you want to proceed?</p>
              <div className={classes.confirm_buttons}>
                <button className={classes.confirm_yes} onClick={handleRedo}>Yes</button>
                <button className={classes.confirm_no} onClick={cancelRedo}>No</button>
              </div>
            </div>
          </div>
        )}

        <div className={classes.right_container}>
          <div>
          <div className={classes.free_text}>[ {item.numberId} ]</div>
            <img
              className={`${classes.add_cart} ${isReviewing ? classes.disabled : ''}`}
              onClick={!isReviewing ? handleReview : undefined}
              src={reviewIcon}
              alt={item.review ? 'checked' : 'unchecked'}
            />
          </div>
          <div>
            <div className={classes.free_text}></div>
            <img
              className={classes.download_icon}
              onClick={confirmDelete}
              src="/images/icon/edit-delete-symbolic.256x256.png"
              alt="delete"
            />
          </div>

          <div>
            <div className={classes.price}></div>
            <img
              className={classes.add_cart}
              onClick={confirmRedo} // Changed to confirmRedo instead of handleRedo
              src="/images/icon/reload.256x256.png"
              alt="reload"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

ReviewFrame.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    numberId: PropTypes.number.isRequired,
    source: PropTypes.string,
    note: PropTypes.string,
    url: PropTypes.string,
    priority: PropTypes.number,
    assign: PropTypes.string,
    status: PropTypes.string,
    itemId: PropTypes.string,
    itemUrl: PropTypes.string,
    review: PropTypes.bool
  }).isRequired,
  index: PropTypes.number
}
