import React from 'react'
import Title from './Title'
import Container from './Container'

const Content = ({lang}) => {
  return (
    <div className='ml-[5%] mr-[5%]'>
        <Title lang={lang}/>
        <Container lang={lang}></Container>
    </div>
  )
}

export default Content