import React from 'react'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'

const NewPassword = () => {
    const { isLoading, isError, isSuccess, postData, setIsError } = usePost()
    const router = useRouter()
    async function onSet(formData) {
        const data = Object.fromEntries(formData.entries())
        if (data['new-password'] !== data['confirm-password']) {
            setIsError({
                state: true,
                data: { msg: 'Type same passwords in both fields' }
            })
            return console.log('Please enter same passwords')
        }
        const url = new URL(window.location.href)
        const token = url.searchParams.get('token')
        postData({ url: '/user/new-password', data: { password: data['new-password'], token: token } })
    }
    if (isSuccess) {
        return router.push('/user/login')
    }
    return (
        <div className='rounded-lg w-2/6 p-4 mx-auto mt-32'>
            <form action={onSet} className='flex flex-col font-raleway'>
                <h1 className='font-extrabold text-lg text-center'>Set New Password</h1>
                <div className='grid gap-y-2 text-xs py-2 font-bold'>
                    <div className='flex flex-col'>
                        <label htmlFor="password">New Password</label>
                        <input type="password" id='password' name='new-password' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" id='password' name='confirm-password' className='px-1 rounded-sm h-6 text-black' required />
                    </div>
                    {isError.state && <span className='text-sm text-red-500'>{isError.data?.msg}</span>}
                </div>
                <div className='flex justify-center mt-4 w-full text-md text-white font-bold'>
                    <button type="submit" className='px-2 py-1 w-full bg-yellow-600 rounded-md hover:bg-yellow-500'>{isLoading ? 'Updating...' : 'Update'}</button>
                </div>
            </form>
        </div>
    )
}

export default NewPassword
