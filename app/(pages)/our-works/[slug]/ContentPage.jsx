'use client';
import { useEffect, useState } from 'react';

import styles from './style.module.scss';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import SwiperNavButtons from "../../../components/SwiperNavButtons/SwiperNavButtons";
import 'swiper/css';
import 'swiper/css/navigation';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';


import ContentRenderer from '../../../components/ContentRenderer/ContentRenderer ';

export default function ContentPage({ data }) {
    const [pageData, setPageData] = useState(data);
    const [isLoading, setIsLoading] = useState(true);
    const [popupActive, setPopupActive] = useState(false);

    const imageUrl = pageData?.image?.url ? `${process.env.NEXT_PUBLIC_DOMAIN}${pageData?.image?.url}` : '/placeholders/case.jpg';

    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#main-gallery',
            children: '.swiper .swiper-slide a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <>
            <div className="container">
                <div className={styles.section}>

                    <div className={styles.wrapper}>
                        <div>
                            <h1 className={styles.title}>
                                {pageData.title}
                            </h1>
                            <div className={styles.content}>
                                {pageData?.content?.length > 0 ? (
                                    pageData.content.map((item, index) => (
                                        <ContentRenderer key={index} content={[item]} />
                                    ))
                                ) : (
                                    <p>Данные не найдены</p>
                                )}
                            </div>

                        </div>

                        <div className={styles.image_wrapper}>
                            <Image
                                src={imageUrl}
                                alt='Dubrovina logo'
                                width={630}
                                height={600}
                                className="dsv-image"
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority

                            />
                        </div>
                    </div>
                </div>
            </div>

            <section className={styles.section_swiper}>
                <div className="container">
                    <h2 className='title title--black'>Результат лечения</h2>
                </div>
                <div className='case_wrapper'>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={3}
                        modules={[Navigation]}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            560: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                        }}
                    >
                        {data?.cases.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.slide_item}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_DOMAIN}${item?.url}`}
                                        alt='Dubrovina logo'
                                        width={600}
                                        height={600}
                                        className="dsv-image"
                                        placeholder="blur"
                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                                    />
                                </div>
                            </SwiperSlide>
                        ))}

                        <SwiperNavButtons
                            addClass={'buttons_bottom'}
                        />
                    </Swiper>
                </div>
            </section>

        </>
    )
}
