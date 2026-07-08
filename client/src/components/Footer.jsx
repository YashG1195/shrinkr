const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 w-full py-stack-lg flex flex-col items-center gap-stack-md px-margin-mobile text-center mt-auto">
      <span className="font-headline-md text-headline-md text-slate-900 font-bold">Shrinkr</span>
      <div className="flex gap-stack-md">
        <a className="text-on-surface-variant font-body-md text-label-md hover:text-primary-container transition-colors cursor-pointer" href="#">Privacy</a>
        <a className="text-on-surface-variant font-body-md text-label-md hover:text-primary-container transition-colors cursor-pointer" href="#">Terms</a>
        <a className="text-on-surface-variant font-body-md text-label-md hover:text-primary-container transition-colors cursor-pointer" href="#">API</a>
      </div>
      <p className="font-body-md text-label-sm text-on-surface-variant opacity-60">© 2024 Shrinkr. Precision in every link.</p>
    </footer>
  );
};

export default Footer;
