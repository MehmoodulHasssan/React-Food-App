'use client'
import React from 'react'
import LoginForm from '@/components/LoginForm'
import NonUserNavBar from '@/components/NonUserNavBar'
const LoginPage = () => {
    return (
        <>
            <NonUserNavBar />
            <LoginForm type={'customer'} />
        </>
    )
}

export default LoginPage