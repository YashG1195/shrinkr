import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Analytics = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await axios.get('/api/url/my-urls');
      setUrls(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;
    try {
      await axios.delete(`/api/url/${id}`);
      setUrls(urls.filter(url => url._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <main className="flex-grow pt-24 pb-28 md:pb-10 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-background mb-2">Analytics</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Track the performance of all your shortened links.</p>
      </div>

      {/* Stats Summary */}
      {urls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="font-headline-md text-headline-md font-bold text-on-surface mb-1">{urls.length}</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Links</div>
          </div>
          <div className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="font-headline-md text-headline-md font-bold text-on-surface mb-1">{totalClicks}</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Clicks</div>
          </div>
          <div className="col-span-2 md:col-span-1 bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm">
            <div className="font-headline-md text-headline-md font-bold teal-gradient-text mb-1">
              {urls.length > 0 ? (totalClicks / urls.length).toFixed(1) : 0}
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Clicks / Link</div>
          </div>
        </div>
      )}

      {/* Links Table */}
      {urls.length === 0 ? (
        <div className="bg-surface border border-outline-variant/40 rounded-2xl p-12 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, rgba(0, 245, 225, 0.15) 0%, rgba(73, 75, 214, 0.15) 100%)' }}>
            <span className="material-symbols-outlined text-brand-teal" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No data yet</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-sm">Create your first short link to start seeing analytics here.</p>
          <Link to="/" className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all">
            Create a Link
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {urls.map(url => (
            <div key={url._id} className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="font-label-md text-label-md text-primary font-semibold hover:text-secondary transition-colors flex items-center gap-1 mb-1">
                  {url.shortUrl}
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                <p className="font-body-md text-body-md text-on-surface-variant truncate" title={url.longUrl}>{url.longUrl}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">ads_click</span>
                  <span className="font-label-md text-label-md font-semibold">{url.clicks} clicks</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{new Date(url.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => handleDelete(url._id)}
                  className="text-error hover:bg-error/10 p-2 rounded-lg transition-colors"
                  title="Delete"
                >
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

export default Analytics;
