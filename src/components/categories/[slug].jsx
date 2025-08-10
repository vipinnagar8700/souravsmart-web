// pages/categories/[slug].jsx
import CategoriesContainer from "../../components/categories/CategoriesContainer";

export default function CategoryPage({ slug }) {
    return <CategoriesContainer slug={slug} />;
}

export async function getStaticPaths() {
    return {
        paths: [], // don't prebuild any category slugs
        fallback: 'blocking', // build it on first request
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;

    // Fetch your category data
    const res = await fetch(`${process.env.API_URL}/categories/${slug}`);
    const category = await res.json();

    if (!category) {
        return { notFound: true };
    }

    return {
        props: {
            category
        },
        revalidate: 60, // revalidate once a minute
    };
}
