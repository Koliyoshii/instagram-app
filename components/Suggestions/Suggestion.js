import React from 'react'

function Suggestion({ userImg, username, worksAt }) {
  return (
    <div className='flex items-center justify-between mt-3'>
        <img src={userImg} alt={username} className="rounded-full w-10 h-10 border p-[1.2px]"/>

        <div className='flex-1 ml-4'>
            <h2 className='font-smibold text-sm'>{username}</h2>
            <h3 className='text-xs text-gray-400'>Works at {worksAt}</h3>
        </div>

        <button className='text-blue-400 font-semibold'>Follow</button>
    </div>
  )
}

export default Suggestion