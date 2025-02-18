import React from 'react'

const Title = ({lang = "Unknown"}) => {
  return (
    <div className="text-center mb-7 mt-3">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Video Processing - {lang}</h1>
        <p className="text-lg text-muted-foreground">Upload your video and we'll process it for you</p>
    </div>
  )
}

export default Title