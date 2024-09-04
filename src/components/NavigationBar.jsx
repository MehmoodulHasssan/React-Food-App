'use client'
import React from 'react'
import logo from '@/assets/logo.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import usePost from '@/hooks/usePost'
import { stateActions } from '@/store/currentState'
import { useDispatch } from 'react-redux'
import { CURRENT_STATES } from '@/store/currentState'
import { TbLogout2 } from "react-icons/tb";


const NavigationBar = ({ currentItems, onPressCart, route, state }) => {
    const dispatch = useDispatch()
    const { isSuccess, postData } = usePost()
    const router = useRouter()
    const handleLogout = () => {
        postData({ url: 'https://food-order-backend-tan.vercel.app/user/logout', data: '' })
    }
    if (isSuccess) {
        dispatch(stateActions.logout())
        if (route === 'customer') {
            return router.push('/')
        }
    }

    const hanldeAuthRoute = () => {
        state === CURRENT_STATES.USER_LOGIN && router.push('/user/order-food')
        state === CURRENT_STATES.ADMIN_LOGIN && router.push('/admin/orders')
    }
    return (
        <div className='flex justify-center w-full h-32 bg-customDark fixed top-0'>
            <div className={`flex w-full px-6 lg:px-0 lg:w-9/12 py-10 items-center ${state === CURRENT_STATES.LOGOUT ? 'justify-center' : 'justify-between'}`}>
                <Link href={'/'}>
                    <div className='flex items-center'>
                        <Image className='h-8 lg:h-12 w-8 lg:w-12 rounded-full border-solid ring-2 ring-yellow-500 mr-3' src={logo} alt="Logoimg" />
                        <h1 className=' font-bold text-yellow-500 text-2xl lg:3xl'>REACTFOOD</h1>
                    </div>
                </Link>
                <div className='flex'>
                    {route === 'customer' && <>
                        <button onClick={onPressCart} className='text-yellow-500 text-xl font-sans hover:text-yellow-300 mr-4'>{`${currentItems.length !== 0 ? `(${currentItems.length})` : ''}Cart`}</button>
                        <button onClick={handleLogout} className='hidden lg:block text-white bg-yellow-500 p-2 font-bold text-lg rounded-lg mx-2 hover:scale-105'>Logout</button>
                        <button onClick={handleLogout} className='block lg:hidden text-white bg-yellow-500 p-2 font-bold text-xl rounded-lg mx-2 hover:scale-105'><TbLogout2 /></button>
                    </>}
                    {route === 'home' &&
                        (state !== CURRENT_STATES.LOGOUT && <>
                            <button onClick={hanldeAuthRoute} className='text-white bg-yellow-500 p-1 lg:p-2 font-bold text-sm lg:text-lg rounded-lg mx-1 lg:mx-2 hover:scale-105'>{state === CURRENT_STATES.ADMIN_LOGIN ? 'Admin Pannel' : 'Order Food'}</button>
                            <button onClick={handleLogout} className='hidden lg:block text-white bg-yellow-500 p-2 font-bold text-lg rounded-lg mx-2 hover:scale-105'>Logout</button>
                            <button onClick={handleLogout} className='block lg:hidden text-white bg-yellow-500 p-1 font-bold text-lg rounded-lg mx-1 hover:scale-105'><TbLogout2 /></button>
                        </>)
                    }

                </div>
            </div>

        </div>
    )
}

export default NavigationBar
