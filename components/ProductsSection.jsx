import SingleProduct from "./SingleProduct";

export default function ProductsSection({ products, heading, tagline }) {
  return (
    <div className="bg-white py-20">
      <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-screen-2xl lg:px-8">
        <h2 className="text-5xl text-center font-bold tracking-tight text-gray-900">
          {heading}
        </h2>
        <p className="w-full mt-5 text-center mx-auto text-2xl text md:text-center">
          {tagline}
        </p>

        <div className="flex items-center justify-evenly">
          <div className="grid gap-12 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product, i) => (
              <div key={i} className="group relative">
                <SingleProduct product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
