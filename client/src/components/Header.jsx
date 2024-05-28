import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header className="flex justify-around items-center mb-6 px-2 py-2 font-semibold bg-blue-800 text-white">
        <div>
            <Link to={'/'}>
                <span className="text-3xl hover:underline">Rent</span>
            </Link>
        </div>
        <ul className="flex gap-5">
            <Link to={'/'} className="hover:underline">
                <li>Home</li>
            </Link>
            <Link className="hover:underline">
                <li>Services</li>
            </Link>
            <Link className="hover:underline">
                <li>About</li>
            </Link>
        </ul>
        <div>
                    <Link to={'/login'} className="hover:underline">
                        <span>Login</span>
                    </Link>
        </div>
    </header>
  )
}
