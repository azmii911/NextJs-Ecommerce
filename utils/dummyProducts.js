const data = {
  products: [
    {
      name: "Basic Tee 6-Pack",
      slug: "basic-tee-6-pack",
      price: 192,
      category: "men",
      images: [
        {
          src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
          alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
          src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
          alt: "Model wearing plain black basic tee.",
        },
        {
          src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
          alt: "Model wearing plain gray basic tee.",
        },
        {
          src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
          alt: "Model wearing plain white basic tee.",
        },
      ],
      colors: [
        { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
        { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
        {
          name: "Black",
          class: "bg-gray-900 ",
          selectedClass: "ring-gray-400",
        },
      ],
      sizes: [
        { name: "XXS", inStock: false },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: false },
        { name: "XL", inStock: true },
        { name: "2XL", inStock: true },
        { name: "3XL", inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton",
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
    {
      name: "Womens 6-Pack Tee",
      slug: "womens-6-pack-tee",
      price: 149,
      category: "women",
      images: [
        {
          src: "https://media.glamour.com/photos/60f748fa530f14fc3c3cd729/master/w_859,h_1041,c_limit/maternity%20tee.jpeg",
          alt: "Two each of gray, white, and black shirts laying flat.",
        },
        {
          src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
          alt: "Model wearing plain black basic tee.",
        },
        {
          src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
          alt: "Model wearing plain gray basic tee.",
        },
        {
          src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
          alt: "Model wearing plain white basic tee.",
        },
      ],
      colors: [
        { name: "Red", class: "bg-red-500", selectedClass: "ring-red-500" },
        { name: "Pink", class: "bg-pink-500", selectedClass: "ring-pink-500" },
        {
          name: "Blue",
          class: "bg-indigo-500 ",
          selectedClass: "ring-indigo-500",
        },
      ],
      sizes: [
        { name: "XXS", inStock: false },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
        { name: "2XL", inStock: true },
        { name: "3XL", inStock: true },
      ],
      description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
      highlights: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton",
      ],
      details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    },
  ],

  category: [
    {
      name: "Men",
      slug: "men",
      image:
        "https://cdn.pixabay.com/photo/2017/06/21/20/51/tshirt-2428521_960_720.jpg",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus cum vitae, voluptas a perferendis nesciunt enim ipsa exercitationem id.",
    },
    {
      name: "Women",
      slug: "women",
      image:
        "https://cdn.pixabay.com/photo/2021/03/14/10/13/girl-6093779_960_720.jpg",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus cum vitae, voluptas a perferendis nesciunt enim ipsa exercitationem id.",
    },
    {
      name: "Accessories",
      slug: "accessories",
      image:
        "https://cdn.pixabay.com/photo/2016/11/29/11/09/woman-1869116_960_720.jpg",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus cum vitae, voluptas a perferendis nesciunt enim ipsa exercitationem id.",
    },
    {
      name: "Test",
      slug: "test",
      image:
        "https://cdn.pixabay.com/photo/2022/06/21/21/15/audio-7276511_960_720.jpg",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus cum vitae, voluptas a perferendis nesciunt enim ipsa exercitationem id.",
    },
  ],

  users: [
    {
      firstName: "Raheel",
      lastName: "Azmi",
      email: "raheelazmi58@gmail.com",
      password: "12345",
      ip: "103.26.83.23",
      address: {
        country: "Pakistan",
        address: "1745 T Street Southeast",
        city: "Karachi",
        postalCode: "12345",
        state: "Sindh",
      },
      isAdmin: true,
    },
    {
      firstName: "Usama",
      lastName: "Amanat",
      email: "usama@gmail.com",
      password: "12345",
      ip: "103.26.83.24",
      address: {
        country: "Pakistan",
        address: "1745 T Street Southwest",
        city: "Karachi",
        postalCode: "12345",
        state: "Sindh",
      },
      isAdmin: false,
    },
  ],
};

export default data;
