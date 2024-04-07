import React from 'react'
import PropTypes from 'prop-types'

const AdsArticle = (props) => {
  const { dataAdSlot } = props

  window.onload = function () {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  return (
    <>
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-2358475138249813"
          data-ad-slot={dataAdSlot}></ins>
    </>
  )
}

AdsArticle.propTypes = {
  dataAdSlot: PropTypes.string.isRequired
}

export default AdsArticle
