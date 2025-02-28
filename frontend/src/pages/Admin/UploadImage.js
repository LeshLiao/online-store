import React, { useState, useEffect, useRef } from 'react'
import classes from './upload_image.module.css'
import { storage } from './firebaseConfig'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { add } from '../../services/itemService'
import AlertTitle from '@mui/material/AlertTitle'
import Alert from '@mui/material/Alert'
import withAdminAuth from './withAdminAuth'

function UploadImage () {
  const isMounted = useRef(false) // Ref to track if component is mounted
  const isAdded = useRef(false)
  const [thumbnailImage, setThumbnailImage] = useState(null)
  const [downloadImage, setDownloadImage] = useState(null)
  const [downloadVideo, setDownloadVideo] = useState(null)
  const [dimensions, setDimensions] = useState('1440x2560')
  const imageListRef = ref(storage, 'images/')
  const [msg, setMsg] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [allValues, setAllValues] = useState({
    itemId: '',
    name: '',
    price: 2.8,
    freeDownload: false,
    stars: 5,
    photoType: 'static',
    tags: [],
    thumbnail: '',
    preview: '',
    imageList: [
      { type: 'small', name: 'small.jpg' },
      { type: 'large', name: 'large.jpg' }],
    downloadList: []
  })

  const changeHandler = e => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  function refreshPage () {
    window.location.reload(false)
  }

  const setTagsToList = e => {
    const tagsString = e.target.value
    const array = tagsString.split(',') // Split the input string by comma
    const trimmedArray = array.map(item => item.trim())
    setAllValues(prevState => ({ ...prevState, tags: trimmedArray }))
  }

  const validateInputs = () => {
    let errorsMsg = ''
    if (!thumbnailImage) {
      errorsMsg += 'thumbnailImage is invalid!\n'
    }
    if (!downloadImage) {
      errorsMsg += 'downloadImage is invalid!\n'
    }
    if (allValues.photoType === 'live' && !downloadVideo) {
      errorsMsg += 'downloadVideo is invalid!\n'
    }
    if (!allValues.itemId.trim()) {
      errorsMsg += 'itemId is invalid!\n'
    }
    if (!allValues.name.trim()) {
      errorsMsg += 'name is invalid!\n'
    }
    if (!allValues.price) {
      errorsMsg += 'price is invalid!\n'
    }
    if (allValues.tags.length === 0) {
      errorsMsg += 'tags is invalid!\n'
    }
    if (!dimensions.trim()) {
      errorsMsg += 'dimensions is invalid!\n'
    }
    return errorsMsg
  }

  const startUpload = () => {
    const errorMsg = validateInputs()
    if (errorMsg !== '') {
      setMsg(errorMsg)
      return
    }
    uploadDownloadImage()
  }

  const uploadDownloadImage = () => {
    const imageRef = ref(storage, `images/items/${allValues.itemId}/${v4() + downloadImage.name}`)
    setMsg('upload Download image...')
    uploadBytes(imageRef, downloadImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAllValues(prevState => ({
          ...prevState,
          downloadList: [...prevState.downloadList,
            { dimensions, name: downloadImage.name, link: url }]
        }))
        if (allValues.photoType === 'live') { uploadDownloadVideo() } else uploadThumbnail()
      })
    })
  }

  const uploadDownloadVideo = () => {
    if (allValues.photoType === 'static') { return }

    const imageRef = ref(storage, `images/items/${allValues.itemId}/${v4() + downloadVideo.name}`)
    setMsg('upload Download video...')
    uploadBytes(imageRef, downloadVideo).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAllValues(prevState => ({
          ...prevState,
          downloadList: [...prevState.downloadList,
            { dimensions, name: downloadImage.name, link: url }]
        }))
        uploadThumbnail()
      })
    })
  }

  const uploadThumbnail = () => {
    const imageRef = ref(storage, `images/items/${allValues.itemId}/${v4() + thumbnailImage.name}`)
    setMsg('upload thumbnail...')
    uploadBytes(imageRef, thumbnailImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAllValues(prevState => ({ ...prevState, thumbnail: url }))
      })
    })
  }

  useEffect(() => {
    if (!isAdded.current && allValues.thumbnail) {
      setMsg('saveToDb...')
      console.log(allValues)
      add(allValues).then((response) => {
        console.log(response)
        isAdded.current = true
        setMsg('Done: ' + response)
        setUploadSuccess(true)
      }, (error) => {
        console.log(error)
        setMsg('Error: ' + error.response.data)
        setUploadSuccess(false)
        setAllValues(prevState => ({ ...prevState, thumbnail: '' }))
      })
    }
  }, [allValues.thumbnail])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      listAll(imageListRef)
        .then((response) => {
          return Promise.all(
            response.items.map(async (item) => {
              const url = await getDownloadURL(item)
              return { url, name: item.name }
            })
          )
        })
        .then((urls) => {
          // setShowImageList(urls)
        })
        .catch((error) => {
          console.error('Error fetching images:', error)
        })
    }
  }, [imageListRef])

  return (
    <>
      <div className={classes.top_container}></div>

      <div className={classes.container}>
        <div className={classes.form_container}>

          <h2>Upload Item</h2>
          <div className={classes.row}>
            <label>Type:</label>
            <select name="photoType" value={allValues.photoType} onChange={changeHandler} style={{ width: '143px' }}>
              <option value="static">Static</option>
              <option value="live">Live</option>
            </select>
          </div>

          <div className={classes.file}>
            <label>Thumbnail</label>
            <input type="file" onChange={(event) => setThumbnailImage(event.target.files[0])} />
          </div>

          <div className={classes.file}>
            <label>Download Image</label>
            {/* Dimensions */}
            <input name="dimensions" value={dimensions} onChange={e => setDimensions(e.target.value)} />
            <input type="file" onChange={(event) => setDownloadImage(event.target.files[0])} />
          </div>

          {allValues.photoType === 'live' && (
            <div className={classes.file}>
              <label>Download Video (For Live Photo)</label>
              <input type="file" onChange={(event) => setDownloadVideo(event.target.files[0])} />
            </div>
          )}

          <div className={classes.row}>
            <label>itemId</label>
            <input name="itemId" onChange={changeHandler} />
          </div>

          <div className={classes.row}>
            <label>name</label>
            <input name="name" onChange={changeHandler} />
          </div>

          <div className={classes.row}>
            <label>price</label>
            <input name="price" value={allValues.price} onChange={changeHandler} />
          </div>

          <div className={classes.row}>
            <label>freeDownload</label>
            <select name="freeDownload" value={allValues.freeDownload} onChange={changeHandler} style={{ width: '143px' }}>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>

          <div className={classes.row}>
            <label>tags</label>EX: Landscape,Anime
            <input name="tags" value={allValues.tags} onChange={setTagsToList} />
          </div>

          <div className={classes.row}>
            <div className={classes.info_container}>
              {msg && <div className={classes.info_msg}>
                <Alert severity="info"><AlertTitle>Status</AlertTitle>{msg}</Alert>
              </div>}
              {uploadSuccess && <div className={classes.info_msg}>
                <button className={classes.reload_button} onClick={refreshPage}>Add Another Item</button>
              </div>}
            </div>
            {uploadSuccess
              ? <button disabled className={classes.uploadButton} onClick={refreshPage}>Upload image</button>
              : <button className={classes.uploadButton} onClick={startUpload}>Upload image</button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

// Export the component wrapped with the HOC
export default withAdminAuth(UploadImage)
