import { useState, useEffect, useRef } from "react";
import { ChevronDown, Globe } from "lucide-react";

const Navbar = ({ setLang }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center p-2 pl-4 pr-4 bg-white shadow-md">
      <a href="/home" className="text-2xl font-bold text-blue-600">
        Automate Documentation Process
      </a>

      <div className="flex items-center space-x-6 text-lg">
        <a href="/home" className="hover:text-blue-500 transition">Home</a>
        <a href="/about" className="hover:text-blue-500 transition">About</a>
        <a href="/contact" className="hover:text-blue-500 transition">Contact</a>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <span>Language</span>
            <ChevronDown size={18} className="text-gray-600" />
          </button>

          <div
            className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-out ${
              isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            } origin-top`}
          >
            <ul className="py-2">
              {["English", "French", "Spanish", "German"].map((language) => (
                <li
                  key={language}
                  className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer transition"
                  onClick={() => {
                    setLang(language);
                    setIsDropdownOpen(false);
                  }}
                >
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
