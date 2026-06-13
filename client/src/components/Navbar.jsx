import { Link } from 'react-router-dom';
import { FiLink, FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 tracking-tight">
          <div className="bg-indigo-500 p-1.5 rounded-lg text-white">
            <FiLink />
          </div>
          <span>Shrinkr</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors font-medium">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors font-medium">Dashboard</Link>
              <button onClick={onLogout} className="btn btn-outline py-2 px-4 text-sm">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-400 hover:text-white transition-colors font-medium">Login</Link>
              <Link to="/register" className="btn btn-primary py-2 px-5 text-sm shadow-indigo-500/20">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
