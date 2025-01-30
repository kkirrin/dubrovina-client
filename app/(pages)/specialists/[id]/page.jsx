import getData from '../../../utils/getData';
import ContentPage from './ContentPage';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export async function generateMetadata({ params }) {
    const { id } = params;
    let page = null;
    const response = await getData(`${domain}/api/speczialisties?populate=*&filters[id][$eq]=${id}`);
    page = response?.data?.[0] || null;

    return {
        title: page.meta_title,
        description: page.meta_description,
    }
}

export default async function Page({ params }) {
    const { id } = params;
    let data = null;
    try {
        const response = await getData(`${process.env.NEXT_PUBLIC_DOMAIN}/api/speczialisties?populate=*&filters[id][$eq]=${id}`);
        data = response?.data?.[0] || null;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }

    if (!data) {
        return <h1>Страница не найдена</h1>; // Или можно использовать notFound()
    }

    return (
        <ContentPage data={data} />
    );
}

export async function generateStaticParams() {

    try {
        const response = await fetch(`${domain}/api/speczialisties`);
        const data = await response.json();

        return data.data.map((specialist) => ({
            id: specialist.id.toString(), // Должен быть `string`
        }));
    } catch (error) {
        console.error('Ошибка загрузки параметров:', error);
        return []; // В случае ошибки вернем пустой массив
    }
}

