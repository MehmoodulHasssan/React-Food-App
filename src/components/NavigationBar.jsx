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
            <div className={`flex fixed z-10 top-0 left-1/2 transform -translate-x-1/2 w-9/12 py-10 items-center ${state === CURRENT_STATES.LOGOUT ? 'justify-center' : 'justify-between'}`}>
                <Link href={'/'}>
                    <div className='flex items-center'>
                        <Image className=' h-12 w-12 rounded-full border-solid ring-2 ring-yellow-500 mr-3' src={logo} alt="Logoimg" />
                        <h1 className=' font-bold text-yellow-500 text-3xl'>REACTFOOD</h1>
                    </div>
                </Link>
                <div>
                    {route === 'customer' && <>
                        <button onClick={onPressCart} className='text-yellow-500 text-xl font-sans hover:text-yellow-300 mr-4'>{`${currentItems.length !== 0 ? `(${currentItems.length})` : ''}Cart`}</button>
                        <button onClick={handleLogout} className='text-white bg-yellow-500 p-2 font-bold text-lg rounded-lg mx-2 hover:scale-105'>Logout</button>
                    </>}
                    {route === 'home' &&
                        (state !== CURRENT_STATES.LOGOUT && <>
                            <button onClick={hanldeAuthRoute} className='text-white bg-yellow-500 p-2 font-bold text-lg rounded-lg mx-2 hover:scale-105'>{state === CURRENT_STATES.ADMIN_LOGIN ? 'Admin Pannel' : 'Order Food'}</button>
                            <button onClick={handleLogout} className='text-white bg-yellow-500 p-2 font-bold text-lg rounded-lg mx-2 hover:scale-105'>Logout</button>
                        </>)
                    }

                </div>
            </div>

        </div>
    )
}

export default NavigationBar
