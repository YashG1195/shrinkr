import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiExternalLink, FiBarChart2, FiClock } from 'react-icons/fi';

const Dashboard = () => {
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

  if (loading) return (
    <div className="flex justify-center mt-20">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="mt-8 animate-in fade-in duration-500">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Your Links Dashboard</h2>
        <p className="text-slate-400 text-lg">Manage and track the performance of your shortened URLs.</p>
      </div>

      {urls.length === 0 ? (
        <div className="glass-card text-center py-16 px-6">
          <div className="bg-indigo-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiBarChart2 className="w-10 h-10 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No links yet!</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Head over to the home page to create your first short URL and start tracking clicks.</p>
          <a href="/" className="btn btn-primary">Create a Link</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {urls.map(url => (
            <div key={url._id} className="glass-card flex flex-col group hover:border-indigo-500/30 transition-colors">
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-sm font-semibold border border-indigo-500/20">
                    <FiBarChart2 /> {url.clicks} clicks
                  </span>
                  <span className="text-slate-500 text-sm flex items-center gap-1.5">
                    <FiClock /> {new Date(url.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2 mt-2">
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-pink-400 font-semibold text-lg flex items-center gap-2 hover:text-pink-300 transition-colors break-all">
                    {url.shortUrl} <FiExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <span className="text-slate-400 text-sm truncate" title={url.longUrl}>{url.longUrl}</span>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 bg-black/10 rounded-b-2xl">
                <button 
                  className="w-full py-2.5 px-4 rounded-xl flex justify-center items-center gap-2 text-sm font-medium text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors border border-transparent hover:border-red-400/20"
                  onClick={() => handleDelete(url._id)}
                >
                  <FiTrash2 /> Delete Link
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
