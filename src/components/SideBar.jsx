import logo from '@/assets/no-projects.png'
import Image from 'next/image'
import { CiTimer } from "react-icons/ci";
import dateToTime from '../../utils/dateToTime';
import { useEffect, useState } from 'react';


export default function SideBar({ orderItems, handleDetails, clickedOrder, setClickedOrder }) {
    const [displayOrders, setDisplayOrders] = useState([])
    const [selectedState, setSelectedState] = useState(undefined)

    useEffect(() => {
        const pendingOrders = orderItems && orderItems.filter((item) => item.status === 'pending')
        const approvedOrders = orderItems && orderItems.filter((item) => item.status === 'approved')
        const declinedOrders = orderItems && orderItems.filter((item) => item.status === 'declined')
        if (selectedState === 'pending') {
            setDisplayOrders(pendingOrders)
        }
        if (selectedState === 'approved') {
            setDisplayOrders(approvedOrders)
        }
        if (selectedState === 'declined') {
            setDisplayOrders(declinedOrders)
        }
    }, [orderItems, selectedState])

    // console.log(orderItems)

    function handleClickPending() {
        setSelectedState('pending')
        setClickedOrder(null)
    }

    function handleClickapproved() {
        setSelectedState('approved')
        setClickedOrder(null)
    }

    function handleClickdeclined() {
        setSelectedState('declined')
        setClickedOrder(null)
    }

    return (
        <div className="bg-customDark w-4/12 h-screen rounded-tr-xl">
            <div className="flex flex-col py-2 px-6 fixed z-10 bg-customDark">
                <h2 className="flex justify-center font-ptsans py-4 font-bold">
                    <span><Image src={logo} height={20} width={20} alt='logo' /></span>
                    <span className='text-yellow-500 text-xl'>ORDERS LIST</span>
                </h2>
                <div className='text-customDark font-bold'>
                    <button onClick={handleClickPending} className={`bg-white p-2 hover:bg-yellow-500 hover:text-white rounded-lg mx-1 ${selectedState === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white'}`}>Pending</button>
                    <button onClick={handleClickapproved} className={`bg-white p-2 hover:bg-yellow-500 hover:text-white rounded-lg mx-1 ${selectedState === 'approved' ? 'bg-yellow-500 text-white' : 'bg-white'}`}>Approved</button>
                    <button onClick={handleClickdeclined} className={`bg-white p-2 hover:bg-yellow-500 hover:text-white rounded-lg mx-1 ${selectedState === 'declined' ? 'bg-yellow-500 text-white' : 'bg-white'}`}>Declined</button>
                </div>
            </div>
            <ul className="flex-col mt-[5.8rem] p-7 -z-10">
                {displayOrders.length > 0 && displayOrders.map((order, index) => {
                    return <li
                        key={index}
                        onClick={() => { handleDetails(order) }} className={`flex flex-col mt-2 p-2 text-customDark rounded-lg hover:bg-white hover:translate-x-1 hover:cursor-pointer ${order === clickedOrder ? 'bg-white translate-x-1' : 'bg-modal'}`}>
                        <h1 className='font-extrabold'>{order.user.fullName}</h1>
                        <div className='flex justify-between'>
                            <p className='flex items-center text-sm'><CiTimer />{dateToTime(order.createdAt)}</p>
                            <span className='font-semibold'>${Number(order.totalPrice).toFixed(2)}</span>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
} 