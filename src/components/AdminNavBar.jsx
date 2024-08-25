import React from 'react'
import logo from '@/assets/logo.jpg'
import Image from 'next/image'
import Link from 'next/link'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'
import { stateActions } from '@/store/currentState'
import { useDispatch } from 'react-redux'

const AdminNavBar = () => {
    const dispatch = useDispatch()
    const routert = useRouter()
    const { isSuccess, postData } = usePost()
    const handleLogout = () => {
        postData({ url: 'https://food-order-backend-tan.vercel.app/user/logout', data: '' })
    }
    if (isSuccess) {
        dispatch(stateActions.logout())
        routert.push('/')
        return
    }
    return (
        <div className='w-10/12 h-32 fixed top-0 right-0'>
            <div className="flex bg-customDark justify-center fixed z-10 top-0 right-0 w-9/12 py-10 items-center">
                <Link href='/' className='flex items-center w-3/4 justify-between'>
                    <div className="flex items-center">
                        <Image className=' h-12 w-12 rounded-full border-solid ring-2 ring-yellow-500 mr-3' src={logo} alt="Logoimg" />
                        <h1 className=' font-bold text-yellow-500 text-3xl'>REACTFOOD</h1>
                    </div>
                    <button onClick={handleLogout} className='text-white bg-yellow-500 p-2 font-bold text-lg rounded-lg mx-2 hover:scale-105'>Logout</button>
                </Link>
            </div>
            <div>
            </div>

        </div>
    )
}

export default AdminNavBar
