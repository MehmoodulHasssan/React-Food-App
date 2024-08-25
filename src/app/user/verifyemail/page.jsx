'use client'
import React from 'react'
import NonUserNavBar from '@/components/NonUserNavBar'
import { useState, useEffect } from 'react'
import usePatch from '@/hooks/usePatch'
import { useRouter } from 'next/navigation'


const VerifyEmailPage = () => {
    const router = useRouter()
    const { isLoading, resData, isError, isSuccess, patchData } = usePatch()
    console.log(resData)
    useEffect(() => {
        console.log(process.env.BACKEND_DOMAIN)
        const search = window.location.search
        const url = 'https://food-order-backend-tan.vercel.app//user/verifyemail' + search
        console.log(url)
        patchData({ url, data: '' })
    }, [])
    const handleClick = () => {
        if (isError) {
            router.push('/user/signup')
        }
        if (isSuccess) {
            router.push('/user/login')
        }
    }
    return (
        <>
            <NonUserNavBar />
            {isLoading && <div className='flex items-center justify-center min-h-screen bg-customDark-100'>
                <div className="spinner w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>}
            {!isLoading && <div className='flex flex-col w-2/4 justify-center items-center text-xl font-bold text-customDark text-center bg-white p-16 mx-auto mt-32'>
                <p>{isError ? 'Failed to verify the user' : isSuccess ? 'User Verified succeessfully' : ''}</p>
                <button onClick={handleClick} className='p-2 bg-customDark text-white mt-2 w-36 rounded-md text-lg'>{isSuccess ? 'Tap to Login' : isError ? 'Signup again' : ''}</button>
            </div>}
        </>
    )
}

export default VerifyEmailPage
