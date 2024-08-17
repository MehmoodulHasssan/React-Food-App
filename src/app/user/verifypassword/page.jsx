'use client'
import React from 'react'
import NonUserNavBar from '@/components/NonUserNavBar'

const VerfiyPasswordPage = () => {
    return (
        <>
            <NonUserNavBar />
            <div className='flex flex-col w-2/4 justify-center items-center text-xl font-bold text-customDark text-center bg-white p-16 mx-auto mt-32'>
                <p>We have send you an email. Please have a look there</p>
                <p>Thanks!</p>
            </div>
        </>
    )
}

export default VerfiyPasswordPage
