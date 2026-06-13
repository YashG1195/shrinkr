import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

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
    <div className="flex justify-center items-center mt-12 mb-20 px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="glass-card w-full max-w-md p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-400 mb-4">
            <FiLogIn className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400">Login to manage your shortened URLs</p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div>
            <label className="form-label">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <FiMail />
              </div>
              <input 
                type="email" 
                name="email" 
                value={email} 
                onChange={onChange} 
                required 
                className="form-input pl-11"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <FiLock />
              </div>
              <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={onChange} 
                required 
                className="form-input pl-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm font-medium bg-red-400/10 py-2 px-3 rounded-lg text-center">{error}</p>}
          
          <button type="submit" className="btn btn-primary w-full mt-2" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account? <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
