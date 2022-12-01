import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, redirect } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [pins, setPins] = useState(null)
    const [text, setText] = useState('Created')
    const [activeBtn, setActiveBtn] = useState('created')

    const activeBtnStyles = 'bg-red-300 font-bold p-2 rounded-full w-28 outline-dashed'
    const notActiveBtnStyles = 'font-bold p-2 rounded-full w-28 outline-dashed'

    const { userId } = useParams();

    const clearUser = () => {
        localStorage.clear()

        redirect('/login')
    }

    const randomImg = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

    useEffect(() => {
        const query = userQuery(userId)

        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [userId])

    useEffect(() => {
        if (text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId)

            client.fetch(createdPinsQuery)
                .then((data) => {
                    setPins(data)
                })
        } else {
            const savedPinsQuery = userSavedPinsQuery(userId)

            client.fetch(savedPinsQuery)
                .then((data) => {
                    setPins(data)
                })
        }
    }, [text, userId])

    if (!user) {
        return <Spinner message="Loading profile" />
    }

    return (
        <div
            className='relative items-center justify-center h-full pb-2'
        >
            <div
                className='flex flex-col pb-5'
            >
                <div
                    className='relative flex flex-col space-y-4 mb-7'
                >
                    <div
                        className='flex flex-col items-center justify-center'
                    >
                        <img
                            src={randomImg}
                            className='object-cover w-full shadow-lg h-96'
                            alt="banner" />

                        <img
                            src={user.image}
                            className='object-cover w-20 h-20 -mt-10 rounded-full shadow-xl'
                            alt="user"
                        />

                        <h1
                            className='mt-3 text-3xl font-bold text-center'
                        >
                            {user.userName}
                        </h1>

                        <div
                            className='absolute top-0 right-0 p-2 z-1'
                        >
                            {userId === user._id && (
                                <button
                                    type='button'
                                    className='p-2 bg-white rounded-full cursor-pointer'
                                    onClick={() => {
                                        googleLogout()
                                        clearUser()
                                    }}
                                >
                                    <AiOutlineLogout color='red' fontSize={21} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div
                        className='space-x-4 text-center mb-7'
                    >
                        <button
                            type='button'
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveBtn('created')
                            }}
                            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Created Pins
                        </button>

                        <button
                            type='button'
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveBtn('saved')
                            }}
                            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Saved Pins
                        </button>
                    </div>

                    {pins?.length ? (
                        <div
                            className='px-2'
                        >
                            <MasonryLayout pins={pins} />
                        </div>
                    ) : (
                        <div
                            className='flex items-center justify-center w-full mt-2 text-xl font-bold'
                        >
                            No Pins found
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default UserProfile
