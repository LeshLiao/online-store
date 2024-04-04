import React, { useState, useEffect, useRef } from 'react'
import classes from './upload_image.module.css'
import { storage } from './firebaseConfig'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { add } from '../../services/itemService'
import AlertTitle from '@mui/material/AlertTitle'
import Alert from '@mui/material/Alert'

export default function UploadImage () {
  const isMounted = useRef(false) // Ref to track if component is mounted
  const isAdded = useRef(false)

  const [thumbnailImage, setThumbnailImage] = useState(null)
  const [downloadImage, setDownloadImage] = useState(null)
  const [downloadVideo, setDownloadVideo] = useState(null)

  const [dimensions, setDimensions] = useState('1440x2560')
  const imageListRef = ref(storage, 'images/')
  const [msg, setMsg] = useState('')

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
    // Split the input string by comma
    const array = tagsString.split(',')
    const trimmedArray = array.map(item => item.trim())
    setAllValues(prevState => ({ ...prevState, tags: trimmedArray }))
  }

  const uploadImage = () => {
    if (!thumbnailImage || !downloadImage) {
      alert('Please choose thumbnail image and download image')
      return
    }

    if (allValues.photoType === 'live' && !downloadVideo) {
      alert('Please choose live photo video')
      return
    }
    const imageRef = ref(storage, `images/items/${allValues.itemId}/${v4() + thumbnailImage.name}`)
    setMsg('upload thumbnail...')
    uploadBytes(imageRef, thumbnailImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAllValues(prevState => ({ ...prevState, thumbnail: url }))
        uploadDownloadImage()
      })
    })
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
        uploadDownloadVideo()
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
      })
    })
  }

  useEffect(() => {
    if (!isAdded.current && allValues.thumbnail && allValues.downloadList.length > 0) {
      if (allValues.photoType === 'live' && allValues.downloadList.length < 2) {
        setMsg('live image or photo...')
        return
      }
      setMsg('saveToDb...')
      console.log(allValues)
      add(allValues).then((response) => {
        console.log('add item response:')
        console.log(response)
        isAdded.current = true
        setMsg('Done:' + response)
      }, (error) => {
        console.log('add item error:')
        console.log(error)
        setMsg('Error:' + error.response.data)
      })
    }
  }, [allValues.thumbnail, allValues.downloadList])

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
        <h1>Upload Item</h1>

        Type:<select name="photoType" value={allValues.photoType} onChange={changeHandler}>
          <option value="static">Static</option>
          <option value="live">Live</option>
        </select><br/><br/>

        Thumbnail
        <input type="file" onChange={(event) => setThumbnailImage(event.target.files[0])} /><br/>
        Download Image
        <input type="file" onChange={(event) => setDownloadImage(event.target.files[0])} />
        Dimensions <input name="itemId" value={dimensions} onChange={e => setDimensions(e.target.value)}/><br/>

        {allValues.photoType === 'live' && (
          <>
            Download Video (For Live Photo)
            <input type="file" onChange={(event) => setDownloadVideo(event.target.files[0])} />
          </>
        )}

        <br/><br/>
        itemId
        <input name="itemId" onChange={changeHandler}/>
        <br/>
        name
        <input name="name" onChange={changeHandler}/>
        <br/>
        price
        <input name="price" value={allValues.price} onChange={changeHandler}/>
        <br/>
        freeDownload:<select name="freeDownload" value={allValues.freeDownload} onChange={changeHandler}>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
        <br/>
        tags
        <input name="tags" value={allValues.tags} onChange={setTagsToList}/>
        EX: Landscape,Anime
        <br/><br/>
        <button onClick={uploadImage}>Upload image</button><br/><br/>

        {msg && <div className={classes.info_msg}>
            <Alert severity="info"><AlertTitle>Status</AlertTitle>{msg}</Alert>
            <button className={classes.reload_button} onClick={refreshPage}>Add Another Item</button>
        </div>}
      </div>
  </>
  )
}
