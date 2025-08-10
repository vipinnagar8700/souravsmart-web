// pages/categories/[slug].jsx
import CategoriesContainer from "../../components/categories/CategoriesContainer";

export default function CategoryPage({ slug }) {
    return <CategoriesContainer slug={slug} />;
}

export async function getServerSideProps(context) {
    return {
        props: {
            slug: context.params.slug,
        },
    };
}
