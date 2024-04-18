import React from 'react'
import { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles must use direct files imports

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import BusServiceCard from './BusServiceCard';
const BusServicesSection = () => {
    return (
        <div className="container mx-auto p-5">
            <div className='buses-section p-3 my-3 w-7/8 mx-auto shadow-md '>
                <div className='flex p-2 justify-between'>
                    <div><h1 className='text-2xl font-semibold'>Book SRTC (State Road Transport Corporation) bus tickets at Web</h1></div>
                    <div className='flex'>
                    </div>
                </div>

                <div className='slider m-3'>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
                        spaceBetween={30}
                        slidesPerView={6}

                        breakpoints={{
                            300: {
                                width: 300,
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            768: {
                                width: 768,
                                slidesPerView: 4,
                                spaceBetween: 30
                            },
                        }}



               /*          onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)} */
                    >
                        <SwiperSlide className=''> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>
                        <SwiperSlide className=''> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>
                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                        <SwiperSlide> <BusServiceCard image='https://static.abhibus.com//content-pages/op-logos/gsrtc.png' name="GSRTC" /> </SwiperSlide>

                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default BusServicesSection