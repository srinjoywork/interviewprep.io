import { Link } from "react-router-dom";

export default function NavHomeBar() {
  return (
    <div className="flex justify-center items-center py-4 bg-[#8f5bfd]">
      <Link
        to="/"
        className="text-white font-bold text-lg bg-black px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
      >
        Go to Home 🏠
      </Link>
    </div>
  );
}
