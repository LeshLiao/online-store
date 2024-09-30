// import React, { useEffect } from 'react'
import React from 'react'
import PropTypes from 'prop-types'

const AdsComponent = (props) => {
  const { dataAdSlot, format } = props

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
          data-ad-client="ca-pub-6980436502917839"
          data-ad-slot={dataAdSlot}
          data-ad-format={format}
          data-full-width-responsive="true">
        </ins>
    </>
  )
}

AdsComponent.propTypes = {
  dataAdSlot: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired
}

export default AdsComponent
