import React, { useState, useRef, useEffect } from "react";
import {
  HomeIcon,
  ArrowsRightLeftIcon,
  LightBulbIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

function Navbar({ page, setPage, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-800 via-green-700 to-green-800 text-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🌱</span>
          <h1 className="text-lg font-bold tracking-tight">
            CarbonLensAI
          </h1>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-2">

          <NavItem
            active={page === "dashboard"}
            onClick={() => setPage("dashboard")}
            icon={<HomeIcon className="h-5 w-5" />}
            label="Dashboard"
          />

          <NavItem
            active={page === "models"}
            onClick={() => setPage("models")}
            icon={<LightBulbIcon className="h-5 w-5" />}
            label="Model Advisor"
          />

          <NavItem
            active={page === "optimizer"}
            onClick={() => setPage("optimizer")}
            icon={<SparklesIcon className="h-5 w-5" />}
            label="Prompt Optimizer"
          />

          <NavItem
            active={page === "change"}
            onClick={() => setPage("change")}
            icon={<ArrowsRightLeftIcon className="h-5 w-5" />}
            label="Change"
          />

          {/* Enterprise Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition"
            >
              <BuildingOfficeIcon className="h-5 w-5" />
              Enterprise
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setPage("batch");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-green-50 transition text-sm"
                >
                  Batch Processing Simulator
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className="ml-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-600/90 hover:bg-red-600 transition shadow-sm"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

function NavItem({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          active
            ? "bg-white/15 text-white"
            : "text-green-100 hover:text-white hover:bg-white/10"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default Navbar;
