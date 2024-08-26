import React from 'react'
import Link from 'next/link'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { stateActions } from '@/store/currentState'
import { useRef } from 'react'

const LoginForm = ({ type }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const emailText = useRef()
    const { isLoading, isSuccess, isError, resData, postData } = usePost()
    const { isLoading: forgotLoading, isError: forgotError, isSuccess: forgotSuccess, postData: forgotPost } = usePost()

    const handleForgotPassword = async () => {
        const email = emailText.current.value
        forgotPost({ url: 'https://food-order-backend-tan.vercel.app/user/forgot-password', data: { email: email } })
    }

    forgotSuccess && router.push('/user/verifypassword')

    const onLogin = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const formData = {};
        data.forEach((value, key) => {
            formData[key] = value;
        });
        if (type === 'customer') {
            await postData({ url: 'https://food-order-backend-tan.vercel.app/user/login', data: formData })
        } else {
            await postData({ url: 'https://food-order-backend-tan.vercel.app/admin/login', data: formData })
        }

    }
    if (isSuccess) {
        if (type === 'customer') {
            dispatch(stateActions.userLogin())
            router.push('/user/order-food')
        } else {
            dispatch(stateActions.adminLogin())
            router.push('/admin/orders')
        }
    }

    return (
        <div className='rounded-lg w-2/6 p-4 mx-auto mt-32'>
            <form onSubmit={onLogin} className='flex flex-col font-raleway'>
                <h1 className='font-extrabold text-lg text-center'>Login Form</h1>
                <div className='grid gap-y-2 text-xs py-2 font-bold'>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input ref={emailText} type="email" id='email' name='email' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    {isError && <span className='text-red-700 text-sm'>{isError?.message}</span>}
                    {forgotError && <span className='text-red-700 text-sm'>{forgotError?.message}</span>}
                </div>
                {type === 'customer' && <button onClick={handleForgotPassword} type='button' className='text-white font-bold text-right text-sm hover:text-modal'>{forgotLoading ? 'Please wait...' : 'forgot password?'}</button>}
                <div className='flex justify-center mt-4 w-full text-md text-white font-bold'>
                    <button type="submit" className='px-2 py-1 w-full bg-yellow-600 rounded-md hover:bg-yellow-500'>{isLoading ? 'Loging in...' : 'Login'}</button>
                </div>

                {type === 'customer' && <div className='mt-1'>
                    Not have an account? <Link href='/user/signup' className=' font-bold px-2'>Signup</Link>
                </div>}
            </form>
        </div>
    )
}

export default LoginForm
