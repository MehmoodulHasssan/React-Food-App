'use client'
import React from 'react'
import NonUserNavBar from '@/components/NonUserNavBar'

const EmailSentPage = () => {
    return (
        <>
            <NonUserNavBar />
            <div className='flex w-2/4 justify-center align-middle text-xl font-bold text-customDark text-center bg-white p-16 mx-auto mt-32'>
                <p>Please check your email for verifying your account</p>
            </div>
        </>
    )
}

export default EmailSentPage
