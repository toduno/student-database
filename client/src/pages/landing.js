import React from 'react'
import Slider from '../components/slider'
import { FaUserCheck } from 'react-icons/fa'
import { FaUserPlus } from 'react-icons/fa'
import { FaRegChartBar } from 'react-icons/fa'

export default function LandingPage() {
    const cards = [
        {
            id: '01',
            img: <FaUserCheck />,
            text: 'Create account'
        },
        {
            id: '02',
            img: <FaUserPlus />,
            text: 'Create record'
        },
        {
            id: '03',
            img: <FaRegChartBar />,
            text: 'View results'
        },
    ]

    return (
        <div>
            <Slider />

            <h3 className=' px-3 text-2xl md:text-3xl font-semibold text-center mb-10'>Create your own student database in <span className='rotate-45 text-red-700 font-bold'>three</span> easy steps </h3>
            
            <div className='md:px-20 bg-gradient-to-r from-teal-400 via-red-400 to-yellow-300 background-animate py-10 flex flex-col gap-x-9 justify-center items-center md:flex-row gap-y-9 mb-8'>
                {cards.map((card, index) => (
                    <div key={index} className='bg-white w-[80%] min-w-auto shadow-xl rounded-md pt-3 md:pt-4 pb-10 md:b-12 '>
                        <span className='text-left text-4xl font-semibold text-red-500 m-3 md:m-4'>{card.id}</span>
                         <div className='border-2 mt-1 border-dotted'></div>

                         <div className='flex flex-col md:flex-none items-center gap-y-4 mt-10'>   
                            <span className='border-red-700 border-2 p-3 rounded-full text-red-700 text-3xl md:p-3 md:text-3xl mx-auto'>{card.img}</span>
                            <p className='font-semibold text-xl'>{card.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='text-center mb-10'>
                    <h3 className='text-2xl md:text-3xl font-semibold'>Ready to go?</h3>
                    <span>Click to register or log in to your account</span>
            </div>

           
        </div>
    )
}