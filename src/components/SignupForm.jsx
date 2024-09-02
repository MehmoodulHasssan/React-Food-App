
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import usePost from '@/hooks/usePost'

const SignupForm = () => {
    const { isLoading, isError, isSuccess, postData } = usePost()
    const router = useRouter()
    const onSingup = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const formData = {};
        data.forEach((value, key) => {
            formData[key] = value;
        });
        await postData({url:'https://food-order-backend-tan.vercel.app/user/signup', data:formData})
    }
    if (isSuccess) {
        router.push('/user/email-sent')
    }
    console.log(isError)
    return (
        <div className='rounded-lg w-2/6 p-4 mx-auto mt-32'>
            <form onSubmit={onSingup} className='flex flex-col  font-raleway'>
                <h1 className='font-extrabold text-lg text-center'>Sign-Up Form</h1>
                <div className='grid gap-y-2 text-xs py-2 font-bold'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id='fullName' name='fullName' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="phone">Phone #</label>
                        <input type="text" id='phone' name='phone' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="city">City</label>
                        <input type="text" id='city' name='city' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="address">Address</label>
                        <input type="text" id='address' name='address' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    <ul>
                {isError && Array.isArray(isError?.data) ? (
                isError.message.error.map((err, index) => (
                <li key={index} className="text-sm text-red-500 list-none">
          {err.path}: {err.msg}
        </li>
      ))
    ) : (
      <li className="text-sm text-red-500 list-none">{isError?.message}</li>
    )}
  </ul>
                <div className='flex justify-center mt-4 w-full text-md text-white font-bold'>
                </div>
                    <button type="submit" className='px-2 py-1 w-full bg-yellow-600 rounded-md hover:bg-yellow-500'>{isLoading ? 'Signing Up...' : 'Signup'}</button>
                </div>
                <div className='mt-1'>
                    Already have an account? <Link href='/user/login' className=' font-bold px-2'>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default SignupForm

        // try {
        //     const res = await axios.post('/user/signup', formData)
        //     if (res.status === 400) {
        //         console.log(res.data)
        //         return
        //     }
        //     if (res.status === 201) {
        //         console.log(res.data)
        //         router.push('/user/email-sent')
        //     }
    
        // } catch (error) {
        //     console.log('Error:', error.response.data)
        // }