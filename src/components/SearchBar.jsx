import React from 'react';

function SearchBar() {
  return (
    // Outer container for the search bar, setting its max width and centering it (optional, based on layout)
    // You might adjust max-w-lg based on where you place this component.
    // The font-montserrat ensures consistent typography.
    <div className="w-full flex justify-center font-montserrat">
      {/* Search input container with icon */}
      <div className="relative flex items-center w-full max-w-lg"> {/* Added relative for icon positioning */}
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5} // Thicker stroke for visibility
          stroke="currentColor"
          className="size-5 text-gray-400 absolute left-3" // Absolute positioning inside relative parent
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        {/* Search Input Field */}
        <input
          type='text'
          placeholder='What do you want to listen to?' // More descriptive placeholder
          className='w-full py-3 pl-10 pr-4 bg-[#282828] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-400'
        />
      </div>
    </div>
  );
}

export default SearchBar;