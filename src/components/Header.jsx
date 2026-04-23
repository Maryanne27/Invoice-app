import { MoonIcon, SunIcon } from "../assets/icons"; 
import logo from "../assets/logo.png";

function Header({ toggleTheme, isDarkMode }) {
  return (
    <nav
      className="
  bg-draft h-[72px] w-full lg:h-screen lg:w-[103px] lg:rounded-r-[20px] 
  flex lg:flex-col justify-between items-center z-[100]
"
    >
      <div
        className="
        bg-primary w-[72px] h-[72px] lg:w-[103px] lg:h-[103px] rounded-r-[20px] 
        flex items-center justify-center relative overflow-hidden
      "
      >
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#9277FF] rounded-tl-[20px]" />
        <img src={logo} alt="logo" className="w-8 h-8 relative z-10" />
      </div>

      {/* ACTIONS */}
      <div className="flex lg:flex-col items-center p-6 gap-6 lg:gap-8">
        <button
          onClick={toggleTheme}
          className="text-textSecondary hover:text-[#DFE3FA] transition"
          aria-label="Toggle Theme"
        >
         
          {isDarkMode ? (
            <SunIcon size={20} className="text-[#858BB2]" />
          ) : (
            <MoonIcon size={20} className="text-[#7E88C3]" />
          )}
        </button>

        <div className="w-[1px] h-[72px] bg-[#494E6E] lg:w-full lg:h-[1px] -my-6 lg:my-0" />

        <img 
          src="/profile.PNG" 
          alt="avatar" 
          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-transparent hover:border-primary cursor-pointer" 
        />
      </div>
    </nav>
  );
}

export default Header;