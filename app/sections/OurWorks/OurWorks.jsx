'use client'

import { useEffect, useState } from 'react';

import styles from './style.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'

import 'swiper/css';
import 'swiper/css/navigation';
import SwiperNavButtons from '@/app/components/SwiperNavButtons/SwiperNavButtons';
import { OurWorksCard } from '@/app/components';
import LinkButton from '@/app/components/LinkButton/LinkButton';

const domain = process.env.NEXT_PUBLIC_DOMAIN;
const url = `${domain}/api/nashi-raboties?populate=*`;

const getSectionData = async () => {
    try {
        const res = await fetch(url, {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Ошибка при загрузке меню:", error);
        return [];
    }
};


export default function OurWorks() {
    const [sectionData, setSectionData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSectionData();
            // получает 4 случайных работы 
            const shuffledData = data?.data.sort(() => 0.5 - Math.random()).slice(0, 4);
            setSectionData(shuffledData);
        };

        fetchData();
    }, []);


    return (
        <section className={styles.section}>
            <div className="container">
                <div className='works_wrapper'>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={3}
                        modules={[Navigation]}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            560: { slidesPerView: 2 },
                        }}
                    >
                        {sectionData?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <OurWorksCard item={item} />
                            </SwiperSlide>
                        ))}

                        <SwiperNavButtons
                            addClass={'buttons_bottom_left'}
                        />

                    </Swiper>
                    <LinkButton
                        link='/our-works'
                        text="Посмотреть все работы"
                        color="black"
                        position="absolute"
                    />
                </div>
            </div>
        </section>
    )
}
