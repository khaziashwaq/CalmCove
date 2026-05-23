const Footer = () => {
  return (
    <footer className="border-t border-sand-200/30 bg-sand-50/50 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌿</span>
            <a href="/" className="text-sm font-medium text-sand-600 hover:text-lavender-600 transition-colors">
              CalmCove
            </a>
            <span className="text-xs text-sand-400 ml-2">— your gentle space</span>
          </div>
          <ul className="flex flex-wrap items-center gap-6 text-sm text-sand-500">
            <li>
              <a href="#" className="hover:text-lavender-600 transition-colors duration-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-lavender-600 transition-colors duration-300">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-lavender-600 transition-colors duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
