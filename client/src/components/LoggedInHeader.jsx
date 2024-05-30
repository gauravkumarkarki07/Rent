import { Link } from "react-router-dom";
import useDropdownToggle from "../customHooks/useDropdownToggle";
import { useSelector } from "react-redux";
import useLogoutSession from "../services/api/useLogoutSession.js";

export default function Header() {

    const session=useSelector(state=>state.user.session);

    const[post]=useLogoutSession();

    const { isOpen, toggleDropdown, dropdownRef } = useDropdownToggle();

    const handleLogout=async(e)=>{
        e.preventDefault();
        await post();

    }

  return (
    <header className="flex justify-around items-center mb-6 px-2 py-2 font-semibold bg-blue-800 text-white">
        <div>
            <Link to={'/'}>
                <span className="text-3xl hover:underline">Rent</span>
            </Link>
        </div>
        <ul className="flex gap-5">
            <Link to={'/dashboard'} className="hover:underline">
                <li>Dashboard</li>
            </Link>
            <Link to={'/findproperty'} className="hover:underline">
                <li>Find Property</li>
            </Link>
            <Link to={'/myproperty'} className="hover:underline">
                <li>My Property</li>
            </Link>
        </ul>
        <div>
                    <div ref={dropdownRef} className="relative inline-block">
                        <button onClick={toggleDropdown} className="w-7 h-7 rounded-full" type="button">
                            <img src={session.session.profilePicture} alt="image" className="w-full object-fill rounded-full"/>
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu absolute left-0 mt-2 bg-white text-black shadow-lg w-auto">
                                <span href="#" className="block px-4 py-2 text-gray-500 disabled">{session.session.username}</span>
                                <Link to={'/profile'}>
                                    <span href="#" className="block px-4 py-2 text-blue-950 hover:bg-gray-100">
                                        Profile
                                    </span>
                                </Link>
                                <Link onClick={handleLogout}>
                                    <span href="#" className="block px-4 py-2 text-blue-950 hover:bg-gray-100">
                                        Logout
                                    </span>
                                </Link>

                            </div>
                        )}
                    </div>
        </div>
    </header>
  )
}
