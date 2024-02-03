import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ItemPage() {
  const {id} = useParams();

  return (
  <>
    <div className='test'>{id}</div>
  </>
  )
}
