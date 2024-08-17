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
    const [selectedState, setSelectedState] = useState(null)
    const [clickedOrder, setClickedOrder] = useState(null)
    const { isLoading: isPostLoading, isError: isPostError, isSuccess: isPostSuccess, postData, setIsError, setIsSuccess } = usePost()
    const { isLoading, isError, data, fetchData } = useFetch()
    useEffect(() => {
        const url = 'http://localhost:8080/admin/orders'
        fetchData(url)
    }, [])

    if (isError.data?.msg === 'noAccess') {
        return router.push('/admin/login')
    }
    if (isError.data?.msg === 'isCustomer') {
        return router.push('/user/order-food')
    }

    const onApprove = async () => {
        postData({ url: 'http://localhost:8080/admin/approve', data: clickedOrder })
    }
    const onDecline = async () => {
        postData({ url: 'http://localhost:8080/admin/decline', data: clickedOrder })
    }
    if (isPostSuccess) {
        fetchData('http://localhost:8080/admin/orders')
        setClickedOrder(null)
        setIsSuccess(false)
    }
    const handleDetails = async ({ order, state }) => {
        setClickedOrder(order)
        setSelectedState(state)
    }

    return (
        <>
            <AdminNavBar />
            <div className='flex'>
                <SideBar
                    orderItems={data && data.data}
                    handleDetails={handleDetails}
                    clickedOrder={clickedOrder}
                    setClickedOrder={setClickedOrder}
                />

                <OrdersUi
                    order={clickedOrder}
                    state={selectedState}
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
