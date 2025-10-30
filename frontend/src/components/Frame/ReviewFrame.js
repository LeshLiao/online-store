import React, { useState, useEffect } from 'react'
import classes from './review.frame.module.css'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { redoWaitingItem, deleteWaitingAndItem, reviewWaitingItem } from '../../services/itemService'
import { toast } from 'react-toastify'

export default function ReviewFrame ({ item, index }) {
  const imgUrl = item.url
  const [sourceImage, setSourceImage] = useState(imgUrl)
  const [previewImage, setPreviewImage] = useState(item.itemUrl)
  const [isReviewing, setIsReviewing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showRedoConfirm, setShowRedoConfirm] = useState(false)
  const [isReviewed, setIsReviewed] = useState(item.review || false)
  const [elapsedTime, setElapsedTime] = useState('')

  // Function to calculate elapsed time
  const calculateElapsedTime = (updatedAt) => {
    if (!updatedAt) return ''

    const now = new Date()
    const updated = new Date(updatedAt)
    const diffMs = now - updated
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 1) {
      return 'Just now'
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m`
    } else if (diffHours < 24) {
      return `${diffHours}h`
    } else {
      return `${diffDays}d`
    }
  }

  useEffect(() => {
    setSourceImage(imgUrl)
    setPreviewImage(item.itemUrl)
    setIsReviewed(item.review || false)

    // Calculate initial elapsed time
    setElapsedTime(calculateElapsedTime(item.updatedAt))

    // Update elapsed time every minute
    const interval = setInterval(() => {
      setElapsedTime(calculateElapsedTime(item.updatedAt))
    }, 60000) // Update every 60 seconds

    return () => clearInterval(interval)
  }, [imgUrl, item.itemUrl, item.review, item.updatedAt])

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
    if (isReviewed || isReviewing) return

    setIsReviewing(true)
    setErrorMessage('')

    try {
      const result = await reviewWaitingItem(item._id)

      if (result.success) {
        toast.success('Item marked as reviewed')
        setIsReviewed(true)
        setTimeout(() => navigate('/review'), 1000)
      } else {
        setErrorMessage(result.message)

        if (result.status === 400) {
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

  const reviewIcon = isReviewed
    ? '/images/icon/checked.png'
    : '/images/icon/unchecked.png'

  // Determine status text and class based on item.status
  const getStatusDisplay = () => {
    if (item.status === 'in_process') {
      return {
        text: `In Progress${elapsedTime ? ` (${elapsedTime})` : ''}`,
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

  const reviewButtonClasses = `${classes.add_cart} ${isReviewing ? classes.disabled : ''}`

  return (
    <div className={classes.frame}>
      <div className={classes.main_container}>
        <div className={classes.images_container}>
          <div className={classes.image_wrapper}>
            <img
              className={classes.image}
              src={sourceImage}
              alt="source"
            />
          </div>

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

        {errorMessage && (
          <div className={classes.error_message}>
            {errorMessage}
          </div>
        )}

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
              className={reviewButtonClasses}
              onClick={!isReviewing && !isReviewed ? handleReview : undefined}
              src={reviewIcon}
              alt={isReviewed ? 'checked' : 'unchecked'}
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
              onClick={confirmRedo}
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
    review: PropTypes.bool,
    updatedAt: PropTypes.string
  }).isRequired,
  index: PropTypes.number
}
