import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import UserActions from "./UserActions";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("jwt");
      setIsLoggedIn(updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => {
    toggleMenu();
  };

  return (
    <header className="bg-[#3f3f3f] flex justify-between p-5">
      <div className="flex items-center pl-32">
        <h1 className="text-3xl font-bold text-white">NoteStream</h1>
        <img
          src="/NoteStream-Icon.png"
          alt="NoteStream logo"
          className="h-6 md:h-16 w-auto content-start pl-4"
        />
      </div>
      <div className="relative flex items-center gap-4 pr-32">
        <FaUserCircle
          className="text-white h-6 md:h-16 w-auto cursor-pointer"
          onClick={toggleMenu}
        />
        {menuOpen && (
          <UserActions onClose={closeMenu} isLoggedIn={isLoggedIn} />
        )}
      </div>
    </header>
  );
}

export default Header;
