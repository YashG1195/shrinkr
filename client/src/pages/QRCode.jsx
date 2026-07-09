import { useState, useRef } from 'react';

// Using a public QR code API for generation
const QRCode = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [size, setSize] = useState(256);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!inputUrl) return;
    setLoading(true);
    // Use Google Chart API (or quickchart.io) to generate QR codes
    const encoded = encodeURIComponent(inputUrl);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=10&format=png`;
    setQrUrl(url);
    setGenerated(true);
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!qrUrl) return;
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'shrinkr-qr-code.png';
    a.click();
  };

  const handleReset = () => {
    setInputUrl('');
    setQrUrl('');
    setGenerated(false);
  };

  return (
    <main className="flex-grow pt-24 pb-28 md:pb-10 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-background mb-2">QR Codes</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Generate branded, scannable QR codes for any URL instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Generator Form */}
        <div className="bg-surface border border-outline-variant/40 rounded-2xl p-6 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold mb-6">Generate QR Code</h2>

          <form onSubmit={handleGenerate} className="flex flex-col gap-5">
            {/* URL Input */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="qr-url">URL or Text</label>
              <div className="relative flex items-center bg-slate-50 rounded-lg border border-outline-variant/60">
                <span className="material-symbols-outlined absolute left-3 text-outline">link</span>
                <input
                  id="qr-url"
                  className="w-full bg-transparent border-none py-3.5 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder-outline focus:ring-2 focus:ring-brand-teal/50 rounded-lg outline-none"
                  placeholder="https://example.com"
                  required
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface">Size</label>
              <div className="flex gap-3">
                {[128, 256, 512].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all border ${size === s ? 'bg-primary text-on-primary border-primary shadow-sm' : 'bg-surface border-outline-variant/60 text-on-surface-variant hover:border-primary/40'}`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-label-md text-label-md text-white rounded-xl shadow-[0_4px_14px_0_rgba(0,245,225,0.39)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
              style={{ background: 'linear-gradient(90deg, #00F5E1 0%, #494bd6 100%)' }}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                {loading ? 'Generating...' : 'Generate QR Code'}
              </span>
            </button>
          </form>
        </div>

        {/* QR Code Preview */}
        <div className="bg-surface border border-outline-variant/40 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[320px]">
          {!generated ? (
            <div className="flex flex-col items-center text-center gap-4 py-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0, 245, 225, 0.15) 0%, rgba(73, 75, 214, 0.15) 100%)' }}>
                <span className="material-symbols-outlined text-brand-teal text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_2</span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-on-surface font-semibold mb-1">Your QR Code</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Enter a URL and click Generate to see your QR code here.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 w-full">
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold self-start">Preview</h3>
              <div className="p-4 bg-white rounded-2xl shadow-inner border border-outline-variant/30">
                <img
                  src={qrUrl}
                  alt="Generated QR Code"
                  width={size}
                  height={size}
                  className="rounded-lg"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant text-center break-all px-2">{inputUrl}</p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 py-3 font-label-md text-label-md text-white rounded-xl transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(90deg, #00F5E1 0%, #494bd6 100%)' }}
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Download PNG
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-3 font-label-md text-label-md text-on-surface-variant border border-outline-variant/60 rounded-xl hover:border-primary/40 hover:text-primary transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { icon: 'smartphone', title: 'Mobile Ready', desc: 'Works perfectly on any smartphone camera' },
          { icon: 'download', title: 'Download Freely', desc: 'Export as PNG for print or digital use' },
          { icon: 'refresh', title: 'Dynamic Links', desc: 'Change the destination without reprinting' },
        ].map(card => (
          <div key={card.title} className="bg-surface border border-outline-variant/40 rounded-xl p-5 shadow-sm flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0, 245, 225, 0.15) 0%, rgba(73, 75, 214, 0.15) 100%)' }}>
              <span className="material-symbols-outlined text-brand-teal" style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface font-semibold mb-1">{card.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default QRCode;
