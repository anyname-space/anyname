const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-white">
        <nav className="flex items-center gap-2 px-5 py-4 border-b">
          <img src="/anyname-space-logo.png" alt="logo" width={40} />
          <h1 className="text-2xl font-bold text-black">Anyname</h1>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
