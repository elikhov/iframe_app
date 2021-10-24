import React from 'react'

export const IframePlayer = ({url, width, height, resize}) => {

  return(
    <iframe 
      src={url} 
      allowFullScreen={true} 
      allow={'encrypted-media; gyroscope;'} 
      width={width} 
      height={height} 
      sandbox="allow-storage-access-by-user-activation || allow-scripts || allow-same-origin || allow-popups"
      title='external player'
      style={ resize ? { resize: 'both', overflow: 'auto' } : {} }
    />
  )
}