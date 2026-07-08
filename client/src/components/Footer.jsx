const Footer = () => {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/30 py-8 mb-20 md:mb-0 mt-auto">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-brand-teal" style={{ fontVariationSettings: "'FILL' 1" }}>link</span>
          <span className="font-label-md text-label-md font-bold text-on-surface">Shrinkr</span>
        </div>
        <div className="flex items-center gap-6">
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">API</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
