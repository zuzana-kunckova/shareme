import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'

import logo from '../assets/logo.png'

const isNotActiveStyle = 'mt-2 flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'mt-2 flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const categories = [
    { name: 'Animals' },
    { name: 'Wallpaper' },
    { name: 'Photography' },
    { name: 'Gaming' },
    { name: 'Coding' },
]

const Sidebar = ({ user, closeToggle }) => {
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false)
    }
    return (
        <div className='flex flex-col justify-between h-full overflow-y-scroll bg-white hide-scrollbar'>
            <div className='flex flex-col'>
                {/* <Link
                    to='/'
                    className='flex gap-2 px-5 pt-1 my-6'
                    onClick={handleCloseSidebar}
                > */}
                <img src={logo} alt="logo" className='w-32 mt-3 mb-5 ml-3' />
                {/* </Link> */}

                <div className='flex flex-col gap-5'>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>

                    <h3 className='px-5 mt-2 text-base text-left 2xl:text-xl'>Discover categories</h3>

                    {categories.map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className='flex items-center gap-2 p-3 bg-white'
                    onClick={handleCloseSidebar}
                >
                    <img src={user.image} alt="User image"
                        className='w-10 h-10 rounded-full '
                    />
                    <p>{user.userName}</p>
                </Link>
            )}
        </div>
    )
}

export default Sidebar
