import { Link, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md border-b border-surface-container-high/60 shadow-sm transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-margin-mobile md:px-gutter max-w-container-max mx-auto h-16">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-teal" style={{ fontVariationSettings: "'FILL' 1" }}>link</span>
            <Link to="/" className="font-headline-md text-headline-md font-bold teal-gradient-text">
              Shrinkr
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`font-label-md text-label-md transition-colors duration-200 ${location.pathname === '/' ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-brand-teal pb-1' : 'text-on-surface-variant dark:text-on-surface-variant hover:text-primary'}`}>Home</Link>
            <Link to="/links" className={`font-label-md text-label-md transition-colors duration-200 ${location.pathname === '/links' ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-brand-teal pb-1' : 'text-on-surface-variant dark:text-on-surface-variant hover:text-primary'}`}>Links</Link>
            <Link to="/qr-codes" className={`font-label-md text-label-md transition-colors duration-200 ${location.pathname === '/qr-codes' ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-brand-teal pb-1' : 'text-on-surface-variant dark:text-on-surface-variant hover:text-primary'}`}>QR Codes</Link>
            <Link to="/analytics" className={`font-label-md text-label-md transition-colors duration-200 ${location.pathname === '/analytics' ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-brand-teal pb-1' : 'text-on-surface-variant dark:text-on-surface-variant hover:text-primary'}`}>Analytics</Link>
          </nav>
          
          <button className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors duration-200 md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </button>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">{user.email ? user.email.charAt(0).toUpperCase() : 'U'}</span>
                </div>
                <button onClick={onLogout} className="font-label-md text-label-md text-on-surface font-medium hover:text-primary transition-colors flex items-center gap-1">
                  <FiLogOut /> Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-label-md text-label-md text-on-surface font-medium hover:text-primary transition-colors">Log in</Link>
                <Link to="/register" className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-20 pb-safe px-4 bg-surface/90 dark:bg-inverse-surface/90 backdrop-blur-lg border-t border-surface-container-high/60 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <Link to="/" className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all active:scale-95 duration-150 ${location.pathname === '/' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-label-sm text-label-sm">Home</span>
        </Link>
        <Link to="/links" className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all active:scale-95 duration-150 ${location.pathname === '/links' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
          <span className="material-symbols-outlined mb-1">link</span>
          <span className="font-label-sm text-label-sm">Links</span>
        </Link>
        <Link to="/qr-codes" className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all active:scale-95 duration-150 ${location.pathname === '/qr-codes' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
          <span className="material-symbols-outlined mb-1">qr_code_2</span>
          <span className="font-label-sm text-label-sm">QR Codes</span>
        </Link>
          <Link to="/analytics" className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all active:scale-95 duration-150 ${location.pathname === '/analytics' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high/50'}`}>
            <span className="material-symbols-outlined mb-1">bar_chart</span>
            <span className="font-label-sm text-label-sm">Analytics</span>
          </Link>
      </nav>
    </>
  );
};

export default Navbar;
