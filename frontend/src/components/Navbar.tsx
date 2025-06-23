// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { BriefcaseIcon, MenuIcon, HomeIcon } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { useIsMobile } from "@/hooks/use-mobile";
// import NotificationBell from "@/components/NotificationBell";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const isMobile = useIsMobile();

//   const links = [
//     { name: "Home", href: "/", icon: <HomeIcon className="h-4 w-4 mr-1" /> },
//     { name: "Find Jobs", href: "/jobs" },
//     { name: "Companies", href: "/companies" },
//   ];

//   return (
//     <nav
//       className="bg-white bg-opacity-90 backdrop-blur-md backdrop-saturate-150 border-b border-slate-200 sticky top-0 z-50"
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-xl font-bold text-blue-600"
//           >
//             <BriefcaseIcon className="h-6 w-6" />
//             <span>JobHub</span>
//           </Link>

//           {/* Desktop navigation */}
//           <div className="hidden md:flex items-center gap-6">
//             <div className="flex space-x-6">
//               {links.map((link) => (
//                 <Link
//                   key={link.name}
//                   to={link.href}
//                   className="text-slate-600 hover:text-blue-600 transition-colors flex items-center"
//                 >
//                   {link.icon && link.icon}
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//             <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
//               <NotificationBell />
//               <Link to="/login">
//                 <Button variant="ghost" size="sm">
//                   Log In
//                 </Button>
//               </Link>
//               <Link to="/signup">
//                 <Button size="sm">Sign Up</Button>
//               </Link>
//             </div>
//           </div>

//           {/* Mobile navigation */}
//           <div className="md:hidden flex items-center gap-2">
//             <NotificationBell />
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="md:hidden">
//                   <MenuIcon className="h-5 w-5" />
//                   <span className="sr-only">Toggle menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//                 <nav className="flex flex-col gap-4 mt-8">
//                   {links.map((link) => (
//                     <Link
//                       key={link.name}
//                       to={link.href}
//                       className="text-slate-600 hover:text-blue-600 transition-colors py-2 text-lg flex items-center"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {link.icon && link.icon}
//                       {link.name}
//                     </Link>
//                   ))}
//                   <div className="border-t border-slate-200 pt-4 mt-2 space-y-3">
//                     <Link to="/login" onClick={() => setIsOpen(false)}>
//                       <Button variant="outline" className="w-full">
//                         Log In
//                       </Button>
//                     </Link>
//                     <Link to="/signup" onClick={() => setIsOpen(false)}>
//                       <Button className="w-full">Sign Up</Button>
//                     </Link>
//                   </div>
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BriefcaseIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLoginStatus();
    // Listen for storage changes to update login status
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-600"
          >
            <BriefcaseIcon className="h-6 w-6" />
            <span>JobHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Jobs
            </Link>
            <Link
              to="/companies"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Companies
            </Link>

            {/* Authentication Section */}
            {isLoggedIn ? (
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                    alt="Profile"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/companies"
                className="text-gray-700 hover:text-blue-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>


              {/* Mobile Authentication Section */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleProfileClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-2 py-1 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                      alt="Profile"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-700">My Profile</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-2 px-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
