import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import Logout from "../../assets/logout.svg?react";

const Header = () => {
  const [showMenu, setShowMenu] =
    useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  const user = JSON.parse(
    localStorage.getItem("userData") || "{}"
  );

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(user?.name);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white text-base shadow shadow-violet-600/30">
            ✓
          </div>

          <span className="text-base font-bold tracking-tight">
            TaskFlow
          </span>
        </div>

        {/* User Section */}
        <div
          ref={dropdownRef}
          className="relative flex items-center gap-2.5"
        >
          {/* User Avatar */}
          <div className="flex items-center gap-2 px-1.5 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
            <div
              onClick={() =>
                setShowMenu((prev) => !prev)
              }
              className="w-7 h-7 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
            >
              {initials}
            </div>

            {/* Desktop Name */}
            <span className="text-xs font-medium text-gray-600 hidden md:inline">
              {user?.name}
            </span>
          </div>

          {/* Desktop Logout */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
          >
            <span className="flex rotate-180">
              <Logout />
            </span>
            <span>Sign out</span>
          </button>

          {/* Mobile Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden md:hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <span className="flex rotate-180">
                  <Logout />
                </span>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;