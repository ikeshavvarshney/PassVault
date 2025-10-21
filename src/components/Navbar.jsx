import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#1A3B2B] text-white shadow-md">
      
      <div className="logo flex items-center">
        <img src="/logo.svg" alt="PassVault" width={150} />
      </div>

      <div className="search relative">
        <button className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</button>
        <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full w-md text-[#ffffff] hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400" />
      </div>

      <div className="tabs flex gap-2">
        <button className="tab-button px-4 py-2 rounded-lg hover:bg-green-600 transition-all">Home</button>
        <button className="tab-button px-4 py-2 rounded-lg hover:bg-green-600 transition-all">Passwords</button>
        <button className="tab-button px-4 py-2 rounded-lg hover:bg-green-600 transition-all">Settings</button>
      </div>
      
    </nav>
  );
}

export default Navbar;
