import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Developed by <span className="font-semibold">Anas</span>
      </p>
    </div>
  );
}

export default Footer;
