import React from "react";
import ProductCategory from "./ProductCategory";

function ProductCategoriesSection({ categories }) {
  return (
    <div className="bg-indigo-50">
      <section className="container py-20 mx-auto ">
        <h2 className="text-5xl text-center font-bold text-gray-900">
          Browse Categories
        </h2>
        <p className="w-full mt-10 text-center mx-auto leading-relaxed text-xl text-gray-700 text md:text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus cum
          vitae, voluptas a perferendis nesciunt enim ipsa exercitationem id.
        </p>
        <div className="flex items-center justify-evenly">
          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, i) => (
              <ProductCategory key={i} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductCategoriesSection;
