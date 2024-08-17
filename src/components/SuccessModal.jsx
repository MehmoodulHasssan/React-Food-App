import { forwardRef } from 'react'

const SuccessModal = forwardRef(
    ({ header }, ref) => {
        return (
            <dialog ref={ref} className='rounded-lg backdrop:bg-black/90'>
                <div className='flex flex-col w-96 bg-modal py-6 px-3 font-raleway'>
                    <h1 className='font-extrabold text-lg'>Ordered Successfully!</h1>
                    <div className='grid gap-y-1 my-2 text-xs'>
                        <p>Your order has been submitted successfully.</p>
                        <p>We will get back to you on this with further details via email within the next few minutes.</p>
                    </div>
                    <form method='dialog' className='flex justify-end text-sm mx-2'>
                        <button className='px-2 py-1 bg-yellow-500 rounded-md hover:bg-yellow-400'>Okay</button>
                    </form>
                </div>
            </dialog>
        )
    }
)

SuccessModal.displayName = 'SuccessModal'
export default SuccessModal;
