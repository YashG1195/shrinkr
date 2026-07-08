import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';

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
    <div className="relative pt-12 pb-section-padding flex flex-col items-center">
      {/* Hero Background Animation Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-container/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="px-margin-mobile flex flex-col items-center text-center space-y-stack-lg animate-fade-up w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/50 border border-white/10 text-primary-container mb-stack-sm backdrop-blur-sm shadow-sm">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider">NEW: SMART LINKS RELEASED</span>
        </div>
        
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:text-[72px] md:leading-[80px] text-slate-900 leading-tight">
          Make Every <br />
          <span className="gradient-text">Link Count</span>
        </h1>
        
        <p className="font-body-md text-label-md text-slate-600 max-w-[320px] md:max-w-xl mx-auto">
          Shorten your URLs quickly and efficiently with our premium link management platform. Built for speed and reliability.
        </p>
      </section>

      {/* Input Section */}
      <section className="mt-stack-lg px-margin-mobile animate-fade-up w-full max-w-[800px]" style={{ animationDelay: '0.2s' }}>
        <div className="p-stack-md rounded-xl border border-slate-200 relative overflow-hidden shadow-lg bg-white">
          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md relative z-10">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors">
                <span className="material-symbols-outlined">link</span>
              </div>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-4 pl-12 pr-4 font-body-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container/50 transition-all" 
                placeholder="Paste your long URL here..." 
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="primary-gradient w-full py-4 px-stack-lg rounded-lg font-headline-md text-body-lg text-on-primary flex items-center justify-center gap-stack-sm active:scale-[0.98] transition-transform shadow-lg shadow-primary-container/10 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-on-primary" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Shortening...
                </span>
              ) : (
                <>
                  <span className="font-bold">Shorten</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {error && <p className="text-error mt-4 text-center font-medium bg-error/10 py-2 rounded-lg relative z-10">{error}</p>}
          
          {shortUrl && (
            <div className="mt-6 bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-up relative z-10">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-primary-container text-lg font-semibold hover:text-primary-fixed-dim transition-colors break-all">
                {shortUrl}
              </a>
              <button 
                className={`btn py-2 px-4 whitespace-nowrap ${copied ? 'bg-primary-container text-on-primary' : 'btn-outline'}`}
                onClick={handleCopy}
              >
                {copied ? <><FiCheckCircle /> Copied!</> : <><FiCopy /> Copy</>}
              </button>
            </div>
          )}

          {/* Subtle decorative element */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container/10 blur-3xl rounded-full"></div>
        </div>
      </section>

      {/* Featured / Bento Grid Visual */}
      <section className="mt-section-padding px-margin-mobile grid grid-cols-1 md:grid-cols-2 gap-stack-md animate-fade-up w-full max-w-[1000px]" style={{ animationDelay: '0.4s' }}>
        <div className="py-stack-lg px-stack-md rounded-xl border border-slate-100 flex flex-col items-center text-center space-y-stack-sm shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container mb-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
          </div>
          <h3 className="font-headline-md text-[20px] text-slate-900">Real-time Analytics</h3>
          <p className="font-body-md text-label-md text-slate-600">Track clicks, locations, and referral sources instantly.</p>
        </div>
        <div className="py-stack-lg px-stack-md rounded-xl border border-slate-100 flex flex-col items-center text-center space-y-stack-sm shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container mb-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_2</span>
          </div>
          <h3 className="font-headline-md text-[20px] text-slate-900">Custom QR Codes</h3>
          <p className="font-body-md text-label-md text-slate-600">Generate branded QR codes for every shortened link.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-section-padding px-margin-mobile flex justify-around items-center border-y border-slate-100 py-stack-lg bg-slate-50 w-full max-w-[1000px]">
        <div className="text-center">
          <div className="font-headline-lg-mobile text-[24px] text-slate-900">1.2M+</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Links</div>
        </div>
        <div className="w-px h-8 bg-outline-variant/30"></div>
        <div className="text-center">
          <div className="font-headline-lg-mobile text-[24px] text-slate-900">99.9%</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Uptime</div>
        </div>
        <div className="w-px h-8 bg-outline-variant/30"></div>
        <div className="text-center">
          <div className="font-headline-lg-mobile text-[24px] text-slate-900">50k+</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Users</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
