import React from "react";

function Button({ text, href }) {
  return (
    <div className="mt-5 sm:flex sm:justify-center lg:justify-start">
      <div className="rounded-md shadow">
        <a
          href={href}
          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          {text}
        </a>
      </div>
    </div>
  );
}

export default Button;
