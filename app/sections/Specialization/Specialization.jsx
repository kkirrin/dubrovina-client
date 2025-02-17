'use client'

import { useState, useEffect } from 'react';

import styles from './style.module.css';

import { SpecializationCard } from '@/app/components';


const domain = process.env.NEXT_PUBLIC_DOMAIN;
// const url = `${domain}/api/speczializaczii?populate[0]=speczializaczii&populate[1]=speczializaczii.img_s`;
const url = `${domain}/api/speczializaczii?populate[speczializaczii][populate][img_s][fields][0]=url`;


async function getData() {
    try {
        const response = await fetch(url, {
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Ошибка при загрузке Специализаций компании', error);
        return [];
    }
}

export default function Specialization() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setData(data);
        }

        fetchData();
    }, [])

    return (
        <section className='section'>
            <div className='container'>
                <h2 className='title title--black'>наша специализация</h2>
                <p className={styles.subtitle}>Лечим зубы, как лечили бы себе</p>

                <div className={styles.specialization_wrapper}>
                    {
                        data?.data?.speczializaczii?.map((item, idx) => {

                            const imageUrl = item.img_s?.url
                                ? process.env.NEXT_PUBLIC_DOMAIN + item.img_s.url
                                : '/path/to/default_placeholder.png';


                            const addClass = (idx - 1) % 3 === 0 ? 'addClass' : '';
                            return (
                                <SpecializationCard
                                    key={idx}
                                    addClass={addClass}
                                    title={item.title}
                                    img={imageUrl}
                                    id={item.id}
                                    slug={item.slug}
                                />
                            );
                        }) || <p>No specializations found.</p>
                    }

                </div>
            </div>
        </section>
    )
}