import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/register', { email, password });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      const userRes = await axios.get('/api/auth/me');
      
      onLogin(res.data.token, userRes.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center pt-24 pb-24 px-margin-mobile relative w-full max-w-container-max mx-auto overflow-hidden min-h-[80vh]">
      {/* Atmospheric Background Elements (Minimalist) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Create Account Card */}
      <div className="w-full max-w-[440px] bg-surface rounded-2xl shadow-[0_10px_30px_-10px_rgba(73,75,214,0.15)] border border-outline-variant/30 p-8 md:p-10 relative overflow-hidden">
        
        {/* Header */}
        <h1 className="font-headline-md text-headline-md font-bold text-on-background mb-2 text-center tracking-tight">Create Account</h1>
        <p className="text-on-surface-variant font-body-md text-body-md text-center mb-8">Join Shrinkr to manage your links</p>
        
        {/* Form */}
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
            <div className="relative flex items-center input-focus-ring rounded-lg border border-outline-variant/60 bg-surface-bright transition-all duration-200">
              <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">mail</span>
              <input 
                className="w-full h-12 pl-10 pr-4 bg-transparent border-none text-body-md font-body-md text-on-background placeholder:text-outline/60 focus:ring-0 rounded-lg outline-none" 
                id="email" 
                name="email"
                placeholder="you@example.com" 
                required 
                type="email"
                value={email}
                onChange={onChange}
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
            <div className="relative flex items-center input-focus-ring rounded-lg border border-outline-variant/60 bg-surface-bright transition-all duration-200">
              <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">lock</span>
              <input 
                className="w-full h-12 pl-10 pr-4 bg-transparent border-none text-body-md font-body-md text-on-background placeholder:text-outline/60 focus:ring-0 rounded-lg outline-none tracking-widest" 
                id="password"
                name="password" 
                placeholder="••••••••" 
                required 
                minLength="6"
                type="password"
                value={password}
                onChange={onChange}
              />
            </div>
          </div>
          
          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="confirm_password">Confirm Password</label>
            <div className="relative flex items-center input-focus-ring rounded-lg border border-outline-variant/60 bg-surface-bright transition-all duration-200">
              <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">lock_reset</span>
              <input 
                className="w-full h-12 pl-10 pr-4 bg-transparent border-none text-body-md font-body-md text-on-background placeholder:text-outline/60 focus:ring-0 rounded-lg outline-none tracking-widest" 
                id="confirm_password" 
                name="confirmPassword"
                placeholder="••••••••" 
                required 
                minLength="6"
                type="password"
                value={confirmPassword}
                onChange={onChange}
              />
            </div>
          </div>

          {error && <p className="text-error mt-2 text-center font-medium bg-error/10 py-2 rounded-lg">{error}</p>}
          
          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="mt-stack-sm w-full py-3.5 px-4 bg-gradient-to-r from-[#00D2FF] to-[#9D50BB] text-white font-label-md text-label-md rounded-xl shadow-[0_10px_30px_-10px_rgba(0,210,255,0.3)] hover:opacity-90 active:scale-[0.98] transition-all duration-200 relative overflow-hidden group disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? 'Creating...' : 'Create Account'} 
              {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </span>
            <div className="absolute inset-0 border-t border-white/20 rounded-lg z-0 pointer-events-none"></div>
          </button>
        </form>
        
        {/* Footer Link */}
        <div className="mt-8 text-center font-body-md text-body-md text-on-surface-variant">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:text-secondary transition-colors duration-200">Sign In</Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
