import { Link, useNavigate } from 'react-router-dom'
import { GitBranch, Heart, LogOut, LogIn, UserPlus } from 'lucide-react'
import { logout } from '../services/api'

export function Navbar() {
  const navigate = useNavigate()
  // Check if a token exists to determine logged-in state
  const isLoggedIn = !!localStorage.getItem('token')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-purple-400 transition-colors">
        <GitBranch size={24} />
        Repo Explorer
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-purple-400 transition-colors text-sm">
          Search
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/favorites" className="flex items-center gap-1 hover:text-purple-400 transition-colors text-sm">
              <Heart size={16} />
              Favorites
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="flex items-center gap-1 hover:text-purple-400 transition-colors text-sm">
              <LogIn size={16} />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              <UserPlus size={16} />
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
