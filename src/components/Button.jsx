import React from 'react'

export default function Button({ children, ...props }) {
    return (
        <button {...props} className='w-6 h-6 rounded-full bg-black text-yellow-500 mx-2'>{children}</button>
    )
}
