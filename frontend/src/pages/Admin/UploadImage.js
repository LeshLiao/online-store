import React, { useState, useEffect, useRef } from 'react'
import classes from './upload_image.module.css'
import { storage } from './firebaseConfig'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { add } from '../../services/itemService'

export default function UploadImage () {
  const isMounted = useRef(false) // Ref to track if component is mounted
  const isAdded = useRef(false)
  const [thumbnailImage, setThumbnailImage] = useState(null)
  const [downloadImage, setDownloadImage] = useState(null)
  const [dimensions, setDimensions] = useState('1440x2560')
  const imageListRef = ref(storage, 'images/')

  const [allValues, setAllValues] = useState({
    itemId: '',
    name: '',
    price: 2.8,
    freeDownload: true,
    stars: 5,
    photoType: 'static',
    tags: [],
    thumbnail: '',
    preview: '',
    imageList: [
      { type: 'small', name: 'small.jpg' },
      { type: 'large', name: 'large.jpg' }],
    downloadList: [{ dimensions: '', name: '', link: '' }]
  })

  const changeHandler = e => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  const setTagsToList = e => {
    const tagsString = e.target.value
    // Split the input string by comma
    const array = tagsString.split(',')
    const trimmedArray = array.map(item => item.trim())
    setAllValues(prevState => ({ ...prevState, tags: trimmedArray }))
  }

  const uploadImage = () => {
    if (thumbnailImage == null || downloadImage == null) {
      alert('Please choose thumbnail image and download image')
      return
    }
    const imageRef = ref(storage, `images/items/${allValues.itemId}/${v4() + thumbnailImage.name}`)
    console.log('upload thumbnail...')
    uploadBytes(imageRef, thumbnailImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAllValues(prevState => ({ ...prevState, thumbnail: url }))
        uploadDownloadImage()
      })
    })
  }

  const uploadDownloadImage = () => {
    const imageRef = ref(storage, `images/items/${allValues.itemId}/${v4() + downloadImage.name}`)
    console.log('upload Download image...')
    uploadBytes(imageRef, downloadImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAllValues(prevState => ({ ...prevState, downloadList: [{ dimensions, name: downloadImage.name, link: url }] }))
      })
    })
  }

  useEffect(() => {
    if (!isAdded.current && allValues.thumbnail !== '' && allValues.downloadList[0].link !== '') {
      console.log('thumbnail=', allValues.thumbnail)
      console.log(allValues)

      add(allValues).then((response) => {
        console.log('add item response:')
        console.log(response)
        isAdded.current = true
      }, (error) => {
        console.log('add item error:')
        console.log(error)
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
        <h1>UploadImage</h1>

        Thumbnail
        <input type="file" onChange={(event) => setThumbnailImage(event.target.files[0])} /><br/>
        Download Image
        <input type="file" onChange={(event) => setDownloadImage(event.target.files[0])} />
        Dimensions <input name="itemId" value={dimensions} onChange={e => setDimensions(e.target.value)}/><br/>

        itemId
        <input name="itemId" onChange={changeHandler}/>
        <br/>
        name
        <input name="name" onChange={changeHandler}/>
        <br/>
        price
        <input name="price" value={allValues.price} onChange={changeHandler}/>
        <br/>
        freeDownload
        <input name="freeDownload" value={allValues.freeDownload} onChange={changeHandler}/>
        EX: true or false
        <br/>
        photoType
        <input name="photoType" value={allValues.photoType} onChange={changeHandler}/>
        EX: static  or  live
        <br/>
        tags
        <input name="tags" value={allValues.tags} onChange={setTagsToList}/>
        EX: Landscape,Anime
        <br/><br/>
        <button onClick={uploadImage}>Upload image</button><br/><br/>
      </div>
  </>
  )
}
