  const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#1A3B2B] text-white shadow-md">

      <div className="logo flex items-center">
        <img src="/logo.svg" alt="PassVault" width={150} />
      </div>

      <div className="tabs flex gap-2">
        <a href='/' className="tab-button px-4 py-2 rounded-lg hover:bg-green-600 active:bg-green-600 transition-all">Home</a>
        <a href="https://github.com/ikeshavvarshney/PassVault" className="tab-button px-4 py-2 rounded-lg hover:bg-green-600 active:bg-green-600 transition-all">GitHub</a>
      </div>

    </nav>
  );
}

export default Navbar;
