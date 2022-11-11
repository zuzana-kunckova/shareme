import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import video from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';
import jwt_decode from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        const userResponse = jwt_decode(response.credential);

        localStorage.setItem('user', JSON.stringify(userResponse));
        const { name, sub, picture } = userResponse;

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true })
        });
    }

    return (
        <div className='flex flex-col items-center justify-start h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={video}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='object-cover w-full h-full'
                />

                <div className='absolute top-0 bottom-0 left-0 right-0 bg-black opacity-60'></div>

                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center'>
                    <div className='p-5'>
                        <img src={logo} alt="logo" className='w-44' />
                    </div>

                    <div className='shadow-2xl'>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            onSuccess={responseGoogle}
                            onError={responseGoogle}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
