import React, { useState } from 'react'
import { urlFor, client } from '../client'

import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { fetchUser } from '../utils/fetchUser'


const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
    const [postHovered, setPostHovered] = useState(false)
    const navigate = useNavigate()
    const user = fetchUser()
    const alreadySaved = save?.filter((item) => item?.postedBy?._id === user?.sub)
    const savePin = (id) => {
        if (!alreadySaved) {
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user.sub,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user.sub,
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                })
        }
    }

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative w-auto overflow-hidden transition-all duration-500 ease-in-out rounded-lg cursor-zoom-in hover:shadow-lg"
            >
                <img src={urlFor(image).width(250).url()} alt="user-post" className='w-full rounded-lg' />

                {postHovered && (
                    <div
                        className='absolute top-0 z-50 flex flex-col justify-between w-full h-full pt-2 pb-2 pl-1 pr-2'
                        style={{ height: '100%' }}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='flex items-center justify-center text-xl bg-white rounded-full outline-none opacity-75 w-9 h-9 text-dark hover:opacity-100 hover:shadow-md'
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>

                            {alreadySaved ? (
                                <button
                                    type='button'
                                    className='px-5 py-1 text-base font-bold text-white bg-red-500 outline-none opacity-70 hover:opacity-100 rounded-3xl hover:shadow-md'
                                >
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                    type='button'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        savePin(_id)
                                    }}
                                    className='px-5 py-1 text-base font-bold text-white bg-red-500 outline-none opacity-70 hover:opacity-100 rounded-3xl hover:shadow-md'
                                >
                                    Save
                                </button>
                            )}
                        </div>

                        <div className='flex items-center justify-between'>
                            {destination && (
                                <a
                                    href={destination}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='flex items-center gap-2 p-2 pl-4 pr-4 font-bold text-black bg-white rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 15 ? `${destination.slice(0, 15)}...` : destination}
                                </a>
                            )}

                            {postedBy?._id === user?.sub && (
                                <button
                                    type='button'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deletePin(_id)
                                    }}
                                    className='flex items-center w-8 h-8 p-2 text-base font-bold bg-white rounded-full outline-none opacity-70 hover:opacity-100 hover:shadow-md'
                                >
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Link
                to={`/user-profile/${postedBy?._id}`}
                className='flex items-center gap-2 mt-2'
            >
                <img
                    src={postedBy?.image}
                    alt="user-profile"
                    className='object-cover w-8 h-8 rounded-full'
                />
                <p className='font-semibold capitalize'>{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin
