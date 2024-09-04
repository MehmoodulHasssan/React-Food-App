import { useEffect, useState } from 'react'
import useFetch from '@/hooks/useFetch'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CartBody = ({ onAddItem }) => {
    const router = useRouter()
    const { isLoading, isError, data, fetchData } = useFetch()
    useEffect(() => {
        fetchData('https://food-order-backend-tan.vercel.app/user/items')
    }, [])

    if (isError.data?.msg === 'noAccess') {
        return router.push('/user/login')
    }
    if (isError.data?.msg === 'isAdmin') {
        return router.push('/admin/orders')
    }

    // console.log(data)

    return (
        <>
            {isError ? <div className='mt-40 font-bold text-2xl text-center text-yellow-500'>Failed To Fetch Items, try again...</div> :
                isLoading ? <div className='flex items-center justify-center min-h-screen bg-customDark-100'>
                    <div className="spinner w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                    :
                    <div className='grid mt-40 w-full px-6 lg:px-0 lg:w-7/12 mx-auto grid-col-1 lg:grid-cols-3 gap-3'>
                        {data && data.map((item, index) => {
                            return <div key={item._id} className='flex flex-col ring-1  bg-cart rounded-lg'>
                                <div>
                                    <Image objectFit='cover' objectPosition='center' layout='responsive' width={1} height={1} src={`/${item.image}`} alt="item-img" />

                                </div>
                                <div className='flex flex-col justify-between h-full items-center'>
                                    <div className='grid grid-cols-1 px-3 py-2 gap-2 justify-items-center'>
                                        <h1 className='font-raleway font-bold text-lg '>{item.name}</h1>
                                        <div className='text-sm font-bold w-12 bg-customDark text-center'>{`$${item.price}`}</div>
                                        <p className='text-xs font-raleway text-center'>{item.description}</p>
                                    </div>
                                    <div className='mb-8'>
                                        <button onClick={() => onAddItem(item)} className='text-sm px-2 py-1 text-white font-bold rounded-md bg-yellow-500 hover:scale-105'>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
            }
        </>
    )
}

export default CartBody
