'use client';

import { userRoutes } from '@/data/apiRoutes';
import Image from 'next/image';
import {auth} from "@/app/context/firebase";

import { useEffect, useState } from 'react'
import { useStateContext } from '../context/stateContext';

interface ProfileProps{
    name: string,
    email: string,
    phone: string,
    addressLine1: string,
    addressLine2: string,
    state: string,
    imgUrl: string
}

const ProfilePage = () => {

    const { authentication, setAuthentication } = useStateContext()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
    });

    const [userDetails, setUserDetails] = useState<ProfileProps>({
        name: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        imgUrl: ''
    });

    const [edit, setEdit] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to save the details
        console.log('Saved details:', formData);
    };

    useEffect(() => {

        setAuthentication(auth)

        const fetchUserDetails = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.getUserDetails}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uuid: authentication?.currentUser?.uid }),
            })
            .then((res) => res.json())
            .then((data: {name: string, email: string, phone: string, addressLine1: string, addressLine2: string, state: string, imgUrl: string}) => {
                setUserDetails({name: data.name, imgUrl: data.imgUrl, email: data.email, phone: data.phone, addressLine1: data.addressLine1, addressLine2: data.addressLine2, state: data.state,})
            })
            .catch((error) => {
            console.error('Error fetching cart data:', error);
            });
        }

        fetchUserDetails()
    }, [])

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-6">
            {
                edit? (
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            </div>
                            <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            </div>
                            <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="phoneNumber">Phone Number</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="addressLine1">Address Line 1</label>
                            <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id="addressLine1"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="addressLine2">Address Line 2</label>
                            <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id="addressLine2"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="state">State</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                            Save
                            </button>
                        </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
                        <div className="space-y-4">
                        <div className="flex flex-col items-center">
                            {userDetails.imgUrl ? (
                            <Image
                                src={userDetails.imgUrl}
                                alt="Profile"
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-gray-700">
                                No Image
                            </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <p className="w-full px-4 py-2 border rounded-lg">{userDetails.name}</p>
                            </div>
                            <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <p className="w-full px-4 py-2 border rounded-lg">{userDetails.email}</p>
                            </div>
                            <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                            <p className="w-full px-4 py-2 border rounded-lg">{userDetails.phone}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Address Line 1</label>
                            <p className="w-full px-4 py-2 border rounded-lg">{userDetails.addressLine1}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Address Line 2</label>
                            <p className="w-full px-4 py-2 border rounded-lg">{userDetails.addressLine2}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">State</label>
                            <p className="w-full px-4 py-2 border rounded-lg">{userDetails.state}</p>
                        </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProfilePage