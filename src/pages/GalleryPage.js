import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function GalleryPage({ id }) {
  const user = useSelector(state => state.user)
  console.log('user gallery:', user)
  return (
    <div>
      Gallery {id}
    </div>
  )
}
