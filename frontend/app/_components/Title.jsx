import React from 'react'

const Title = ({title1, title2, description}) => {
  return (
    <div className=' px-5 sm:px-0'>
      <div className="flex items-center gap-2">
        <h1 className='text-[30px] font-bold'>{title1}</h1>
        <h1 className='text-[30px] text-primary font-bold'>{title2}</h1>
      </div>
      <p className='text-gray-500'>{description}</p>
    </div>
  )
}

export default Title