import React, {useRef} from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';


const Slider = () => {
    const images = [
    require('../images/students_09.jpg'),
    require('../images/4119036.jpg'),
    require('../images/5437683.jpg'),
    require('../images/6463375.jpg')
    ]

    // const slides = images.map((img, index) => (
    //     <Carousel.Slide key={index}>
    //          <img alt='student' src={img}
    //             className='w-full object-cover max-w-full' /> 
    //     </Carousel.Slide>
    // ))

    const autoplay = useRef(Autoplay({delay: 4000}))

    return (
    <div className='py-5 mb-2 bg-white h-80 flex'>
        <Carousel sx={{flex: 1}} mx='auto' withIndicators height='100%'
           plugins={[autoplay.current]} onMouseEnter={autoplay.current.stop} onMouseLeave={autoplay.current.reset}
        >
            <Carousel.Slide style={{backgroundImage: `url(${images[0]})`}} className='bg-contain bg-no-repeat bg-center'></Carousel.Slide>
            <Carousel.Slide style={{backgroundImage: `url(${images[1]})`}} className='bg-contain bg-no-repeat bg-center'></Carousel.Slide>
            <Carousel.Slide style={{backgroundImage: `url(${images[2]})`}} className='bg-contain bg-no-repeat bg-center'></Carousel.Slide>
            <Carousel.Slide style={{backgroundImage: `url(${images[3]})`}} className='bg-contain bg-no-repeat bg-center'></Carousel.Slide>    
        </Carousel>
    </div>
    )
}




export default Slider