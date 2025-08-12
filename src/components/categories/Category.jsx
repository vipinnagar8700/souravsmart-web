import React, { useEffect, useState } from "react";
import BreadCrumb from "../breadcrumb/BreadCrumb";
import * as api from "@/api/apiRoutes";
import CategoryCard from "./CategoryCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCategory, setSelectedCategories } from "@/redux/slices/productFilterSlice";
import CardSkeleton from "../skeleton/CardSkeleton";

const Category = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const selectedCategories = useSelector(
    (state) => state.ProductFilter?.selectedCategories
  );

  const [allCategories, setAllCategories] = useState([]); // store all from API
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const categoryPerPage = 12;
  const slug_id = slug === "all" ? "" : slug;

  useEffect(() => {
    if (slug_id !== undefined) {
      setAllCategories([]);
      setPage(1);
      fetchAllCategories(slug_id);
    }
  }, [slug_id]);

  const fetchAllCategories = async (Slug = "") => {
    setIsLoading(true);
    try {
      // Fetch ALL categories in one go (no pagination params)
      const result = await api.getCategories({ slug: Slug });
      const newData = result?.data || result || [];
      setAllCategories(newData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setIsLoading(false);
  };

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategories({ data: category?.id }));
    if (category?.has_child) {
      router.push(`/categories/${category?.slug}`);
    } else {
      const cats = [...selectedCategories, category?.id];
      dispatch(setFilterCategory({ data: cats.join(",") }));
      router.push(`/products`);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Slice data for current page
  const visibleCategories = allCategories.slice(0, page * categoryPerPage);

  return (
    <section>
      <BreadCrumb />
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 h-auto my-5 px-2">
          {visibleCategories.map((category) => (
            <div
              key={category?.id}
              className="col-span-1 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <CategoryCard category={category} />
            </div>
          ))}

          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="col-span-1">
                <CardSkeleton height={180} />
              </div>
            ))}
        </div>

        {/* Load More Button */}
        {visibleCategories.length < allCategories.length && !isLoading && (
          <div className="text-center my-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-[#ff7312] text-white rounded hover:bg-[#ff7312]"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
