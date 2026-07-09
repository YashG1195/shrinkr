import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      const userRes = await axios.get('/api/auth/me');
      
      onLogin(res.data.token, userRes.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center pt-24 pb-24 px-margin-mobile relative w-full max-w-container-max mx-auto overflow-hidden min-h-[80vh]">
      {/* Decorative Ambient Blob (Subtle Light Mode Version) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Login Card */}
      <div className="w-full max-w-[440px] bg-surface rounded-2xl shadow-[0_10px_30px_-10px_rgba(73,75,214,0.15)] border border-outline-variant/30 p-8 md:p-10 relative overflow-hidden">
        
        {/* Card Header */}
        <div className="flex flex-col items-center mb-stack-lg text-center">
          <div 
            className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-stack-md text-primary" 
            style={{ backgroundColor: 'rgba(0, 210, 255, 0.1)', color: 'rgb(0, 210, 255)' }}
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold tracking-tight">Welcome Back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Login to manage your shortened URLs</p>
        </div>
        
        {/* Login Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-stack-md">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="email">Email Address</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant/70 text-[20px]">mail</span>
              <input 
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 outline-none" 
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
          <div className="flex flex-col gap-2">
            <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="password">Password</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant/70 text-[20px]">lock</span>
              <input 
                className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 outline-none tracking-widest" 
                id="password" 
                name="password"
                placeholder="••••••••" 
                required 
                type="password"
                value={password}
                onChange={onChange}
              />
            </div>
          </div>

          {error && <p className="text-error mt-1 text-center font-medium bg-error/10 py-2 rounded-lg">{error}</p>}
          
          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="mt-stack-sm w-full py-3.5 px-4 bg-gradient-to-r from-[#00D2FF] to-[#9D50BB] text-white font-label-md text-label-md rounded-xl shadow-[0_10px_30px_-10px_rgba(0,210,255,0.3)] hover:opacity-90 active:scale-[0.98] transition-all duration-200 relative overflow-hidden group disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? 'Logging in...' : 'Sign In'}
            </span>
            {/* Inner glow simulation */}
            <div className="absolute inset-0 border-t border-white/20 rounded-lg z-0 pointer-events-none"></div>
          </button>
        </form>
        
        {/* Footer Links */}
        <div className="mt-stack-lg text-center font-body-md text-body-md text-on-surface-variant">
          Don't have an account? <Link to="/register" className="text-primary font-semibold hover:text-secondary transition-colors duration-200">Sign Up</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
