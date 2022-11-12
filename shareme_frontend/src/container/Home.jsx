import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { client } from '../client';
import logo from '../assets/logo.png';
import { userQuery } from '../utils/data';

const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState(null)
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

    console.log(userInfo)

    useEffect(() => {
        const query = userQuery(userInfo?.sub);

        client.fetch(query)
            .then((data) => {
                setUser(data[0]);
            })
    }, []);

    return (
        <div className='flex flex-col h-screen duration-75 ease-out bg-gray-50 md:flex-row transition-height'>
            <div className='flex-initial hidden h-screen md:fle'>
                <Sidebar user={user && user} />
            </div>

            <div className='flex flex-row md:hidden'>
                <HiMenu
                    fontSize={40}
                    className="cursor-pointer"
                    onClick={() => setToggleSidebar(true)}
                />

                <Link to="/">
                    <img src={logo} alt="logo" className='w-28' />
                </Link>

                <Link to={`user-profile/${user?._id}`}>
                    <img src={user?.image} alt="logo" className='w-8' referrerPolicy="no-referrer" />
                </Link>

                {toggleSidebar && (
                    <div className='fixed z-10 w-4/5 h-screen overflow-y-auto bg-white shadow-md animate-slide-in'>
                        <div className='flex items-center justify-end w-full p-2 aboslute'>
                            <AiFillCloseCircle
                                fontSize={30} className="cursor-pointer"
                                onClick={() => setToggleSidebar(false)}
                            />
                        </div>

                        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
