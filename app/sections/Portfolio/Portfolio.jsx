import styles from './style.module.scss';
import Image from 'next/image';


export default function Portfolio({ title }) {
    return (
        <section>
            {title === true ?
                <h2 className="title title--black">портфолио</h2>
                : ''
            }
            <div className={styles.wrapper}>

                <div className={styles.portfolio_item}>
                    <p className={styles.portfolio_text}>Мы гордимся каждой нашей работой, от простой профессиональной гигиены до сложной многоэтапной имплантации зубов. После прохождения лечения в “Стоматологической клинике доктора дубровиной” наши пациенты забывают про проблемы с зубами на долгие годы!</p>
                    <Image
                        src='/appeal/white.svg'
                        alt='Dubrovina'
                        width={55}
                        height={95}
                        className={styles.item_decor_2}
                    />
                </div>

                <div className="relative">
                    <Image
                        src='/appeal/black.svg'
                        alt='Dubrovina'
                        width={55}
                        height={95}
                        className={styles.item_decor_3}
                    />
                    <div className={styles.portfolio_image}>
                        <Image
                            src='/images/image-3.jpg'
                            alt='Dubrovina logo'
                            width={960}
                            height={440}
                            className="dsv-image"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MiIgaGVpZ2h0PSIxMTg5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIC8+PC9zdmc+" priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
