import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Links = ({ user }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (user) fetchUrls();
    else setFetchLoading(false);
  }, [user]);

  const fetchUrls = async () => {
    try {
      const res = await axios.get('/api/url/my-urls');
      setUrls(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

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
      setUrl('');
      if (user) fetchUrls();
    } catch (err) {
      setError(err.response?.data || 'An error occurred while shortening the URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    try {
      await axios.delete(`/api/url/${id}`);
      setUrls(urls.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex-grow pt-24 pb-28 md:pb-10 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-background mb-2">Links</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Create and manage all your shortened links in one place.</p>
      </div>

      {/* URL Shortener Card */}
      <div className="bg-surface border border-outline-variant/40 rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface font-semibold mb-4">Shorten a New Link</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow flex items-center bg-slate-50 rounded-lg border border-outline-variant/60">
            <span className="material-symbols-outlined absolute left-4 text-outline">link</span>
            <input
              className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder-outline focus:ring-2 focus:ring-brand-teal/50 rounded-lg outline-none"
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
            className="w-full sm:w-auto whitespace-nowrap font-label-md text-label-md text-white px-7 py-3.5 rounded-lg shadow-[0_4px_14px_0_rgba(0,245,225,0.39)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 font-semibold disabled:opacity-70"
            style={{ background: 'linear-gradient(90deg, #00F5E1 0%, #494bd6 100%)' }}
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>

        {error && <p className="text-error mt-3 font-medium bg-error/10 py-2 px-3 rounded-lg text-center">{error}</p>}

        {shortUrl && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-primary/5 border border-primary/10 p-4 rounded-xl">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-secondary transition-colors break-all">
              {shortUrl}
            </a>
            <button
              onClick={() => handleCopy(shortUrl)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${copied ? 'bg-primary text-on-primary' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
            >
              <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>

      {/* Links List */}
      {!user ? (
        <div className="bg-surface border border-outline-variant/40 rounded-2xl p-10 flex flex-col items-center text-center shadow-sm">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, rgba(0, 245, 225, 0.15) 0%, rgba(73, 75, 214, 0.15) 100%)' }}>
            <span className="material-symbols-outlined text-brand-teal" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Sign in to see your links</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-sm">Create an account to save and manage all your shortened links.</p>
          <div className="flex gap-3">
            <Link to="/login" className="font-label-md text-label-md text-on-surface font-medium hover:text-primary transition-colors px-4 py-2 border border-outline-variant/60 rounded-lg">Log in</Link>
            <Link to="/register" className="bg-primary text-on-primary font-label-md text-label-md px-5 py-2 rounded-lg shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all">Sign up</Link>
          </div>
        </div>
      ) : fetchLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : urls.length === 0 ? (
        <div className="bg-surface border border-outline-variant/40 rounded-2xl p-10 flex flex-col items-center text-center shadow-sm">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, rgba(0, 245, 225, 0.15) 0%, rgba(73, 75, 214, 0.15) 100%)' }}>
            <span className="material-symbols-outlined text-brand-teal" style={{ fontVariationSettings: "'FILL' 1" }}>link_off</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No links yet</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Use the form above to create your first short link.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold mb-2">Your Links ({urls.length})</h2>
          {urls.map(u => (
            <div key={u._id} className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <a href={u.shortUrl} target="_blank" rel="noopener noreferrer" className="font-label-md text-label-md text-primary font-semibold hover:text-secondary transition-colors flex items-center gap-1 mb-1">
                  {u.shortUrl}
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                <p className="font-body-md text-body-md text-on-surface-variant truncate" title={u.longUrl}>{u.longUrl}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1 bg-primary/5 text-primary px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">ads_click</span>
                  <span className="font-label-md text-label-md font-semibold">{u.clicks}</span>
                </div>
                <button onClick={() => handleCopy(u.shortUrl)} className="text-on-surface-variant hover:text-primary p-2 rounded-lg hover:bg-primary/5 transition-colors" title="Copy">
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                </button>
                <button onClick={() => handleDelete(u._id)} className="text-error hover:bg-error/10 p-2 rounded-lg transition-colors" title="Delete">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Links;
