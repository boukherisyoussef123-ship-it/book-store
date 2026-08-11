"use client";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-sky-700">
        Little Learners
      </h1>

      <div className="flex gap-6">
        <a href="#" className="text-gray-700 hover:text-sky-600">
          Home
        </a>

        <a href="#" className="text-gray-700 hover:text-sky-600">
          Products
        </a>

        <a href="#" className="text-gray-700 hover:text-sky-600">
          About
        </a>

        <a href="#" className="text-gray-700 hover:text-sky-600">
          Contact
        </a>
      </div>
    </nav>
  );
}