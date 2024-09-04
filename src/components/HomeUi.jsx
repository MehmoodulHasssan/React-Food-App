import React from 'react'
import Image from 'next/image'
import platter from '@/assets/platter.png'
import Link from 'next/link'
import { CURRENT_STATES } from '@/store/currentState'

const HomeUi = ({ state }) => {
    return (
        <div className='flex flex-col lg:flex-row mt-32 justify-evenly items-center'>
            <div className='text-white font-extrabold text-xl mt-[45px] lg:mt-0 lg:3xl'>
                <h1 className='text-yellow-500'>Hungryy!!</h1>
                <h1 className='mt-2'>Your are at the right place</h1>
                {state === CURRENT_STATES.LOGOUT && <>
                    <button className='bg-yellow-500 py-2 px-4 text-xl rounded-lg mt-4'><Link href={'/user/login'}>Login →</Link></button>
                    <p className='mt-4 text-yellow-500 text-xl font-semibold'>Are you an admin? Tap <Link href={'/admin/login'} className='underline'>here</Link></p>
                </>}
            </div>
            <div>
                <Image src={platter} height={450} width={450} alt='platterimg' />
            </div>

        </div>
    )
}

export default HomeUi
