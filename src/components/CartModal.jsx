
import { forwardRef, useRef } from 'react'
// import SubmitModal from './SubmitModal';
import Button from './Button';
import { totalPrice } from '../../utils/totalPrice';
import SuccessModal from './SuccessModal';
import AlertModal from './AlertModal';
import usePost from '@/hooks/usePost';


const CartModal = forwardRef(({ currentItems, onPlus, onMinus, emptyItems }, ref) => {
    const { isLoading, isError, isSuccess, postData, setIsError, setIsSuccess } = usePost()
    const successRef = useRef()
    const alertRef = useRef()

    function handleClick() {
        const items = currentItems.map(item => ({
            foodItem: item._id,
            price: +item.price * +item.quantity,
            quantity: item.quantity
        }))

        console.log(items)
        if (currentItems.length !== 0) {
            if (confirm('Are you sure to place order?')) {
                postData({ url: 'https://food-order-backend-tan.vercel.app//user/place-order', data: items })
            }
        } else {
            alert('Please select items and then proceed your order...')
        }
    }

    if (isSuccess) {
        ref.current.close()
        successRef.current.showModal()
        emptyItems()
        setIsSuccess(false)
    }
    if (isError.state) {
        ref.current.close()
        alertRef.current.showModal()
        setIsError(false)
    }

    return (
        <>
            <dialog ref={ref} className='rounded-lg backdrop:bg-black/70'>
                <div className='flex flex-col w-96 bg-modal py-6 px-3 font-raleway'>
                    {currentItems.length === 0 ? <>
                        <h1 className='font-extrabold text-lg'>Your Cart</h1>
                        <p className='text-sm my-2'>No items Selected</p>
                    </> :
                        <>
                            <h1 className='font-extrabold text-lg'>Your Cart</h1>
                            <div className='grid gap-y-1 my-2'>
                                {currentItems.map((item, index) => {
                                    return <div key={index} className='flex justify-between items-center text-sm'>
                                        <div>
                                            {item.name} - {item.quantity} x ${item.price}</div>
                                        <div className='flex items-center text-base'>
                                            <Button onClick={() => onMinus(item)}>-</Button>
                                            {item.quantity}
                                            <Button onClick={() => onPlus(item)}>+</Button>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </>
                    }


                    <div className='mx-2 text-right font-bold my-2'>
                        ${totalPrice(currentItems)}
                    </div>

                    <form method='dialog' className='flex justify-end text-sm mx-2'>
                        <button className='px-2'>close</button>
                        <button type='button' onClick={handleClick} className='px-2 py-1 bg-yellow-500 rounded-md hover:bg-yellow-400'>{isLoading ? 'Placing Order...' : 'Place Order'}</button>
                    </form>
                </div>
            </dialog>
            <SuccessModal ref={successRef} />
            <AlertModal errorMsg={isError?.message} ref={alertRef} />
        </>
    )
})

CartModal.displayName = 'CartModal'
export default CartModal;
