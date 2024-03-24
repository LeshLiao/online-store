// import React, { useEffect } from 'react'
import React from 'react'
import PropTypes from 'prop-types'

const AdsComponent = (props) => {
  const { dataAdSlot } = props

  window.onload = function () {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  // useEffect(() => {
  //   try {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({})
  //   } catch (e) {
  //     console.log('AdsComponent error:' + e)
  //   }
  // }, [])

  return (
    <>
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2358475138249813"
          data-ad-slot={dataAdSlot}
          data-ad-format="auto"
          data-full-width-responsive="true">
        </ins>
    </>
  )
}

AdsComponent.propTypes = {
  dataAdSlot: PropTypes.string.isRequired
}

export default AdsComponent
