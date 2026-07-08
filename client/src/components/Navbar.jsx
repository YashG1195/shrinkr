import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between px-margin-mobile h-16 w-full max-w-container-max mx-auto">
        <div className="flex items-center gap-stack-md">
          <span className="material-symbols-outlined text-primary-container active:scale-95 transition-transform cursor-pointer">menu</span>
          <Link to="/" className="font-headline-md text-headline-md font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary">
            Shrinkr
          </Link>
        </div>
        
        <div className="flex items-center gap-stack-md">
          <Link to="/" className="text-on-surface-variant hover:text-primary-container transition-colors font-medium text-sm md:text-base hidden sm:block">Home</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-on-surface-variant hover:text-primary-container transition-colors font-medium text-sm md:text-base hidden sm:block">Dashboard</Link>
              <button onClick={onLogout} className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 cursor-pointer">
                <FiLogOut /> <span className="hidden sm:inline">Logout</span>
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container flex items-center justify-center">
                <span className="text-primary-container font-bold">{user.email ? user.email.charAt(0).toUpperCase() : 'U'}</span>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-on-surface-variant hover:text-primary-container transition-colors font-medium text-sm md:text-base hidden sm:block">Login</Link>
              <Link to="/register" className="btn-primary py-1.5 px-4 rounded-lg text-sm font-semibold">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
