import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiUserPlus } from 'react-icons/fi';

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
    <div className="flex justify-center items-center mt-12 mb-20 px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="glass-card w-full max-w-md p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/10 text-pink-400 mb-4">
            <FiUserPlus className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400">Join Shrinkr to manage your links</p>
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
                minLength="6"
                className="form-input pl-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <FiLock />
              </div>
              <input 
                type="password" 
                name="confirmPassword" 
                value={confirmPassword} 
                onChange={onChange} 
                required 
                minLength="6"
                className="form-input pl-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm font-medium bg-red-400/10 py-2 px-3 rounded-lg text-center">{error}</p>}
          
          <button type="submit" className="btn btn-primary w-full mt-2" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Already have an account? <Link to="/login" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
