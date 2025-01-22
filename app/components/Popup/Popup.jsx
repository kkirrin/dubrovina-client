import {Form} from '../../components';
import styles from './style.module.css';

export default function Popup({ active, setActive }) {

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            setActive(false);
        }
    }

    return (

        <div
            className={`${styles.popup} ${active ? styles.popupActive : styles.popupNone}`}
            onClick={() => { setActive(false) }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className={styles.popup__body}>

                <div
                    className={styles.popup__content}
                    onClick={e => e.stopPropagation()}
                >

                    <button
                        className={styles.popup__close}
                        onClick={() => { setActive(false) }}
                    >
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="18.4463" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(-45 3 18.4463)" fill="#2a3a57" />
                            <rect x="4.21094" y="3" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(45 4.21094 3)" fill="#2a3a57" />
                        </svg>
                    </button>

                    <Form
                        title="получите расчет стоимости"
                        subtitle="Оставьте контакты и квалифицированные специалисты за 5 минут рассчитают цену"
                    />

                </div>
            </div>
        </div>
    )
}