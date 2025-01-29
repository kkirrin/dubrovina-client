'use client';

import styles from './style.module.css';

import { useEffect, useState } from 'react';

import src_1 from '@/public/consul/src_1.png';
import src_2 from '@/public/consul/src_2.png';
import src_3 from '@/public/consul/src_3.png'

import Image from 'next/image';

import { LightForm } from '@/app/components';

export default function Consultation() {

    const [ src, setSrc ] = useState(src_1);


    useEffect(() => {
        if(window.innerWidth < 769) {
            setSrc(src_3);
        }

        else if (window.innerWidth > 769 && window.innerWidth < 1200) {
            setSrc(src_2);
        }

        else {
            setSrc(src_1);
        }
    }, [])

    return (
        <section className={`${styles.bg} section`}>
            <div className="container">
                <h2 className='title '>запись на консультацию</h2>
                <p className={styles.subtitle}>Оставьте контакты, администратор свяжется с Вами и подберет удобное время</p>
                
                    
                <div className={styles.info_wrapper}>

                    <div className={styles.info_1}>
                        <Image src={src} alt='src' className={styles.src} />
                    </div>

                    <div className={styles.info_2}>
                        <LightForm />
                    </div>

                </div>

            </div>
        </section>
    )
}
