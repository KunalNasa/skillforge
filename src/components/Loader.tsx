import React from 'react'
import { FiLoader } from "react-icons/fi";

const Loader = () => {
    return (
        <div className='flex justify-center sticky left-1/2'>
            <FiLoader className='animate-spin text-white h-28 w-28' />
        </div>
    )
}

export default Loader