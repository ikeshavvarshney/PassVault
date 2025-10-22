  const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#1A3B2B] text-white shadow-md">

      <div className="logo flex items-center">
        <img src="/logo.svg" alt="PassVault" width={150} />
      </div>

      <div className="search relative">
        <button className="cursor-pointer absolute left-3 top-2.5 text-gray-500">
          <lord-icon
            src="https://cdn.lordicon.com/xaekjsls.json"
            trigger="hover"
            state="morph-select"
            colors="primary:#ffffff"
            style={{ width: "24px", height: "24px" }}>
          </lord-icon>
        </button>
        <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border-2 border-gray-700 rounded-full w-md text-[#ffffff] hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
      </div>

      <div className="tabs flex gap-2">
        <a href='/' className="tab-button px-4 py-2 rounded-lg hover:bg-green-600 active:bg-green-600 transition-all">Home</a>
        <a href="https://github.com/ikeshavvarshney" className="tab-button px-4 py-2 rounded-lg hover:bg-green-600 active:bg-green-600 transition-all">GitHub</a>
      </div>

    </nav>
  );
}

export default Navbar;
