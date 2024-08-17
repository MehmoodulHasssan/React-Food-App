import React from 'react'
import logo from '@/assets/logo.jpg'
import Image from 'next/image'
import Link from 'next/link'

const NonUserNavBar = () => {
    return (
        <div className='w-full h-32 bg-customDark fixed top-0'>
            <div className="flex justify-center  fixed z-10 top-0 left-1/2 transform -translate-x-1/2  w-9/12 py-10 items-center ">
                <Link href='/' className='flex items-center'>
                    <Image className=' h-12 w-12 rounded-full border-solid ring-2 ring-yellow-500 mr-3' src={logo} alt="Logoimg" />
                    <h1 className=' font-bold text-yellow-500 text-3xl'>REACTFOOD</h1>
                </Link>
            </div>

        </div>
    )
}

export default NonUserNavBar
