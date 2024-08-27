'use client'
import React, { useEffect, useState, useRef } from 'react'
import AdminNavBar from '@/components/AdminNavBar'
import OrdersUi from '@/components/OrdersUi'
import SideBar from '@/components/SideBar'
import useFetch from '@/hooks/useFetch'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/navigation'

const AdminPanel = () => {
    const router = useRouter()
    const [clickedOrder, setClickedOrder] = useState(null)
    const [detailedOrder, setDetailedOrder] = useState(null)
    const { isLoading: isPostLoading, isError: isPostError, isSuccess: isPostSuccess, postData, setIsError, setIsSuccess } = usePost()
    const { isLoading: wholeLoading, isError: wholeError, data: wholeData, fetchData: wholeFetch } = useFetch()
    const { isSuccess: gotDetails, setIsSuccess: setGotDetails, isError: detailsError, isLoading: gettingDetails, data: orderDetails, fetchData: fetchDetails } = useFetch()

    useEffect(() => {
        const url = '/admin/orders'
        wholeFetch(url)
    }, [])

    if (wholeError.data?.msg === 'noAccess') {
        return router.push('/admin/login')
    }
    if (wholeError.data?.msg === 'isCustomer') {
        return router.push('/user/order-food')
    }

    const onApprove = async () => {
        postData({ url: `/admin/approve/${clickedOrder._id}` })
    }
    const onDecline = async () => {
        postData({ url: `/admin/decline/${clickedOrder._id}` })
    }
    if (isPostSuccess) {
        wholeFetch('/admin/orders')
        setClickedOrder(null)
        setIsSuccess(false)
    }
    const handleDetails = async (order) => {
        fetchDetails(`/admin/order-details/${order._id}`)
    }

    if (gotDetails) {
        setClickedOrder(orderDetails.data)
        setGotDetails(false)
    }
    console.log(orderDetails)
    // console.log(wholeData)

    return (
        <>
            <AdminNavBar />
            <div className='flex'>
                <SideBar
                    orderItems={wholeData && wholeData.data}
                    handleDetails={handleDetails}
                    clickedOrder={clickedOrder}
                    setClickedOrder={setClickedOrder}
                />

                <OrdersUi
                    order={clickedOrder}
                    onApprove={onApprove}
                    onDecline={onDecline}
                    isLoading={isPostLoading}
                    isError={isPostError}
                />
            </div>
        </>
    )
}

export default AdminPanel
