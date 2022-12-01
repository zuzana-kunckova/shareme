import React from 'react'
import { Link, redirect } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    if (!user) return null;

    return (
        <div className='flex items-center w-full gap-2 mt-5 md:gap-5 pb-7'>
            <div className='flex items-center justify-start w-full p-2 bg-white border-none rounded-md outline-none focus-within:shadow-sm'>
                <IoMdSearch fontSize={21} className='ml-1' />
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    value={searchTerm}
                    onFocus={() => redirect('/search')}
                    className="w-full p-2 bg-white outline-none"
                />
            </div>
            <div className='flex gap-3'>
                <Link
                    to={`user-profile/${user?._id}`}
                    className='hidden md:block'
                >
                    <img src={user.image} alt="User" className='h-12 rounded-lg w-14' />
                </Link>

                <Link
                    to='create-pin'
                    className='flex items-center justify-center text-white bg-black rounded-lg w-9 h-9 md:w-14 md:h-12'
                >
                    <IoMdAdd />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
