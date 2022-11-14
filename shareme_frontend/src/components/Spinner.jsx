import React from 'react'
import { Circles } from 'react-loader-spinner'

const Spinner = ({ message }) => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <Circles
                color='#00BFFF'
                height={50}
                width={200}
            />

            <p className='px-2 mt-5 text-lg text-center'>{message}</p>
        </div>
    )
}

export default Spinner
