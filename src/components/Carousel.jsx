import React from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

export default function Carousel() {

    const slides = [
        {
            url: 'https://images.unsplash.com/photo-1705948734194-92f7018cd7c9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            url: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1ZGdldHxlbnwwfHwwfHx8MA%3D%3D'
        },
        {
            url: 'https://plus.unsplash.com/premium_photo-1679785709853-0e50df422c1c?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            url: 'https://plus.unsplash.com/premium_photo-1661713894749-6a36b6cfca77?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            url: 'https://images.unsplash.com/photo-1521897258701-21e2a01f5e8b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
    ]

    const [currentSlide, setCurrentSlide] = React.useState(0)

    function prevSlide() {
        const isFirstSlide = currentSlide === 0
        const newSlide = isFirstSlide ? slides.length - 1 : currentSlide - 1
        setCurrentSlide(newSlide);
    }


    function nextSlide() {
        const isLastSlide = currentSlide === (slides.length - 1)
        const newSlide = isLastSlide ? 0 : currentSlide + 1
        setCurrentSlide(newSlide);

    }

    function goToSlide(slideIdx) {
        setCurrentSlide(slideIdx)
    }


    return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 -px relative group'>
            <div style={{ backgroundImage: `url(${slides[currentSlide].url})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'>
                </div>
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' >
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
                <div className='flex top-4 justify-center py-2'>
                    {slides.map((slide, idx) => {
                    return <div
                        key={idx} 
                        className='text-2xl cursor-pointer'
                        onClick={() => goToSlide(idx)}>
                            <RxDotFilled />
                            </div>
                    })}
                </div>
        </div>
    )
}
