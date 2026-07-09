import { useState } from 'react';
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
    <div className="flex-grow pt-24 pb-safe flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding text-center">
        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-1 mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
          <span className="font-label-sm text-label-sm text-primary">New: Advanced Analytics Dashboard</span>
        </div>
        
        <h1 className="font-display-lg text-[48px] md:text-display-lg font-extrabold text-on-background mb-stack-md leading-tight tracking-tight">
          Make Every <br className="md:hidden" />
          <span className="teal-gradient-text">Link Count</span>
        </h1>
        
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">
          The most reliable link management platform for modern professionals. Shorten, track, and optimize your digital touchpoints with precision.
        </p>

        {/* URL Input Area */}
        <div className="w-full max-w-3xl mx-auto bg-surface p-2 rounded-xl hero-shadow glass-panel flex flex-col sm:flex-row gap-2 items-center mb-stack-lg transition-transform duration-300 hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-2">
            <div className="relative w-full flex-grow flex items-center bg-slate-50 rounded-lg">
              <span className="material-symbols-outlined absolute left-4 text-outline">link</span>
              <input 
                className="w-full bg-transparent border-none py-4 pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder-outline focus:ring-2 focus:ring-brand-teal/50 rounded-lg outline-none" 
                placeholder="Paste your long URL here..." 
                required 
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto hover:bg-[#00e0cd] text-on-primary font-label-md text-label-md px-8 py-4 rounded-lg shadow-[0_4px_14px_0_rgba(0,245,225,0.39)] hover:shadow-[0_6px_20px_rgba(0,245,225,0.23)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 whitespace-nowrap font-semibold tracking-wide disabled:opacity-70"
              style={{ background: 'linear-gradient(90deg, #00F5E1 0%, #494bd6 100%)' }}
            >
              {loading ? 'Shortening...' : 'Shorten'}
            </button>
          </form>
        </div>

        {error && <p className="text-error mt-4 text-center font-medium bg-error/10 py-2 rounded-lg">{error}</p>}
        
        {shortUrl && (
          <div className="mt-6 w-full max-w-3xl mx-auto bg-surface border border-outline-variant/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-up">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-primary-fixed-dim transition-colors break-all">
              {shortUrl}
            </a>
            <button 
              className={`btn py-2 px-4 whitespace-nowrap ${copied ? 'bg-primary text-on-primary' : 'btn-outline'}`}
              onClick={handleCopy}
            >
              {copied ? <><FiCheckCircle /> Copied!</> : <><FiCopy /> Copy</>}
            </button>
          </div>
        )}
      </section>

      {/* Stats Bar */}
      <section className="w-full border-y border-outline-variant/30 bg-surface/50 py-stack-md my-stack-lg">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex flex-wrap justify-center sm:justify-around gap-8 md:gap-4">
          <div className="text-center px-4">
            <div className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold text-on-surface mb-1">1.2M+</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Links</div>
          </div>
          <div className="hidden sm:block w-[1px] bg-outline-variant/50 h-12 self-center"></div>
          <div className="text-center px-4">
            <div className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold text-on-surface mb-1">99.9%</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Uptime</div>
          </div>
          <div className="hidden sm:block w-[1px] bg-outline-variant/50 h-12 self-center"></div>
          <div className="text-center px-4">
            <div className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold text-on-surface mb-1">50k+</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Users</div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md md:gap-gutter">
          {/* Feature 1 */}
          <div className="bg-surface rounded-xl p-8 border border-outline-variant/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-teal/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-brand-teal" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">Real-time Analytics</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Track every click, location, and device type instantly. Make data-driven decisions to optimize your campaigns.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-surface rounded-xl p-8 border border-outline-variant/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-lg bg-brand-teal/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-brand-teal" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_2</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">Custom QR Codes</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Generate branded, scannable codes for print or digital. Bridge the gap between offline and online seamlessly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
