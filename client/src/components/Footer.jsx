const Footer = () => {
  return (
    <footer className="border-t border-slate-200 w-full py-stack-lg flex flex-col items-center gap-stack-md px-margin-mobile text-center bg-white mt-auto">
      <span className="font-headline-md text-headline-md text-[#0F172A] font-bold">Shrinkr</span>
      <div className="flex gap-stack-md">
        <a className="text-slate-600 font-body-md text-label-md hover:text-primary transition-colors cursor-pointer" href="#">Privacy</a>
        <a className="text-slate-600 font-body-md text-label-md hover:text-primary transition-colors cursor-pointer" href="#">Terms</a>
        <a className="text-slate-600 font-body-md text-label-md hover:text-primary transition-colors cursor-pointer" href="#">API</a>
      </div>
      <p className="font-body-md text-label-sm text-slate-400">© 2024 Shrinkr. Precision in every link.</p>
    </footer>
  );
};

export default Footer;
