import React, { useRef, useState } from 'react'
import Image from 'next/image'
import dateToSecTime from '../../utils/dateToSecTime'
import usePost from '@/hooks/usePost'
import AlertModal from './AlertModal'


const OrdersUi = ({ order, onApprove, onDecline, state, isLoading, isError }) => {

    const errorRef = useRef()
    console.log(state)
    isError.state && errorRef.current.showModal()

    return (<>
        {order === null && <div className='mt-32 p-4 w-full bg-modal text-customDark rounded-tl-lg flex items-center justify-center'>
            <h1 className='font-bold text-3xl text-customDark text-center'>Click on any order to check details</h1>
        </div>}

        {order !== null &&
            <div className='mt-32 p-4 w-full bg-modal text-customDark rounded-tl-lg'>
                <h1 className='font-bold text-2xl'>Order Info</h1>
                <div className='flex justify-between mt-4 px-28'>
                    <div className='ring-1 ring-customDark p-2'>
                        <h2 className='text-sm'>Order Time</h2>
                        <p className='font-semibold'>{dateToSecTime(order.time)}</p>
                    </div>
                    <div className='ring-1 ring-customDark p-2'>
                        <h2 className='text-sm'>Address</h2>
                        <p className='font-semibold'>{order.customerDetails.address}</p>
                    </div>
                    <div className='ring-1 ring-customDark p-2'>
                        <h2 className='text-sm'>Phone #</h2>
                        <p className='font-semibold'>{order.customerDetails.phone}</p>
                    </div>
                </div>
                <ul className='px-28 mt-8'>
                    {order.order.map((ord, ind) => {
                        return <>
                            <li key={ind} className='flex mt-4 p-2 items-center justify-between ring-1 ring-customDark rounded-lg'>
                                <div className='flex items-center'>
                                    <Image className='rounded-lg' src={`/${ord.image}`} width={60} height={60} alt='foodImg' />
                                    <p className=' translate-x-4 font-semibold'>{ord.name}</p>
                                </div>
                                <p className=' -translate-x-12 font-semibold'>{`x${ord.quantity}`}</p>
                                <p className='font-semibold'>{`$${ord.price}`}</p>
                            </li>
                        </>
                    })}
                </ul>
                <p className='font-bold text-2xl text-right mt-4 px-28'>{`$${order.totalPrice}`}</p>
                <div className='flex justify-end font-semibold text-white mr-28 mt-4'>
                    {isLoading && <span className='text-customDark italic font-semibold'>Processing...</span>}
                    {(!isLoading && (state === 'approved' || state === 'pending')) && <button onClick={onDecline} className='rounded-lg p-2 bg-red-500 mr-8 hover:scale-105'>Decline</button>}
                    {(!isLoading && (state === 'declined' || state === 'pending')) && <button onClick={onApprove} className='rounded-lg p-2 bg-green-500 hover:scale-105'>Approve</button>}
                </div>
            </div>}
        <AlertModal ref={errorRef} />
        {/* <SuccessModal ref={successRef} /> */}
    </>
    )
}

export default OrdersUi
