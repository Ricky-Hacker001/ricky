
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 px-6 text-center text-portfolio-slate text-sm font-fira-code">
      <p>
        Designed & Built by Ricky
      </p>
      <p className="mt-2">
        © {new Date().getFullYear()} All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
