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
      {/* Hero Background Animation */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40"></div>
      
      {/* Hero Section */}
      <section className="px-margin-mobile flex flex-col items-center text-center space-y-stack-lg animate-fade-up w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant text-primary-fixed-dim mb-stack-sm">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="font-label-sm text-label-sm">NEW: SMART LINKS RELEASED</span>
        </div>
        
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:text-[72px] md:leading-[80px] text-on-surface">
          Make Every <br />
          <span className="gradient-text">Link Count</span>
        </h1>
        
        <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] md:max-w-xl mx-auto">
          Shorten your URLs quickly and efficiently with our premium link management platform. Built for speed and reliability.
        </p>
      </section>

      {/* Input Section */}
      <section className="mt-stack-lg px-margin-mobile animate-fade-up w-full max-w-[800px]" style={{ animationDelay: '0.2s' }}>
        <div className="p-stack-md rounded-xl border border-white/5 inner-glow relative overflow-hidden bg-surface-container">
          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md relative z-10">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined">link</span>
              </div>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-4 pl-12 pr-4 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                placeholder="Paste your long URL here..." 
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="primary-gradient w-full py-4 px-stack-lg rounded-lg font-headline-md text-body-lg text-white flex items-center justify-center gap-stack-sm active:scale-[0.98] transition-transform shadow-lg shadow-primary-container/20 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Shortening...
                </span>
              ) : (
                <>
                  <span>Shorten</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {error && <p className="text-error mt-4 text-center font-medium bg-error/10 py-2 rounded-lg relative z-10">{error}</p>}
          
          {shortUrl && (
            <div className="mt-6 bg-surface-container-high border border-outline-variant p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-up relative z-10">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-tertiary text-lg font-semibold hover:text-tertiary-fixed-dim transition-colors break-all">
                {shortUrl}
              </a>
              <button 
                className={`btn py-2 px-4 whitespace-nowrap ${copied ? 'bg-tertiary text-on-tertiary' : 'btn-outline'}`}
                onClick={handleCopy}
              >
                {copied ? <><FiCheckCircle /> Copied!</> : <><FiCopy /> Copy</>}
              </button>
            </div>
          )}

          {/* Subtle decorative element */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
        </div>
      </section>

      {/* Featured / Bento Grid Visual */}
      <section className="mt-section-padding px-margin-mobile grid grid-cols-1 md:grid-cols-2 gap-stack-md animate-fade-up w-full max-w-[1000px]" style={{ animationDelay: '0.4s' }}>
        <div className="py-stack-lg px-stack-md rounded-xl border border-white/5 inner-glow flex flex-col items-center text-center space-y-stack-sm card-hover transition-shadow bg-surface-container-high">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
          </div>
          <h3 className="font-headline-md text-[20px] text-on-surface">Real-time Analytics</h3>
          <p className="font-body-md text-label-md text-on-surface-variant">Track clicks, locations, and referral sources instantly.</p>
        </div>
        <div className="py-stack-lg px-stack-md rounded-xl border border-white/5 inner-glow flex flex-col items-center text-center space-y-stack-sm card-hover transition-shadow bg-surface-container-high">
          <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_2</span>
          </div>
          <h3 className="font-headline-md text-[20px] text-on-surface">Custom QR Codes</h3>
          <p className="font-body-md text-label-md text-on-surface-variant">Generate branded QR codes for every shortened link.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-section-padding px-margin-mobile flex justify-around items-center border-y border-outline-variant/30 py-stack-lg w-full max-w-[1000px]">
        <div className="text-center">
          <div className="font-headline-lg-mobile text-[24px] text-on-surface">1.2M+</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Links</div>
        </div>
        <div className="w-px h-8 bg-outline-variant/50"></div>
        <div className="text-center">
          <div className="font-headline-lg-mobile text-[24px] text-on-surface">99.9%</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Uptime</div>
        </div>
        <div className="w-px h-8 bg-outline-variant/50"></div>
        <div className="text-center">
          <div className="font-headline-lg-mobile text-[24px] text-on-surface">50k+</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Users</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
