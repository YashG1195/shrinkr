import { useState } from 'react';
import axios from 'axios';
import { FiCopy, FiCheckCircle, FiLink2, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      const res = await axios.post('/api/url/shorten', { longUrl: url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data || 'An error occurred while shortening the URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-col items-center mt-12 md:mt-24 mb-16 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 pb-2">
          Make Every Link Count
        </h1>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
          Shorten your URLs quickly and efficiently with our premium link management platform. Built for speed and reliability.
        </p>
      </div>

      <div className="glass-card w-full max-w-4xl p-6 md:p-10">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              <FiLink2 className="w-5 h-5" />
            </div>
            <input
              type="url"
              className="form-input pl-12 h-14 text-lg"
              placeholder="Paste your long URL here (e.g. https://example.com/very/long/path)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary h-14 px-8 text-lg w-full sm:w-auto" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Shortening
              </span>
            ) : (
              <span className="flex items-center gap-2">Shorten <FiArrowRight /></span>
            )}
          </button>
        </form>
        {error && <p className="text-red-400 mt-4 text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

        {shortUrl && (
          <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4 duration-500">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-xl font-semibold hover:text-emerald-300 transition-colors break-all">
              {shortUrl}
            </a>
            <button 
              className={`btn whitespace-nowrap ${copied ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'btn-outline'}`}
              onClick={handleCopy}
            >
              {copied ? <><FiCheckCircle /> Copied!</> : <><FiCopy /> Copy</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
