import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <header className="border-b-1 bg-one-normal text-white flex flex-col p-5 py-3 mb-10">
      <nav className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex w-full md:w-auto justify-between items-center">
          {/* <div className="w-4 h-4 bg-two-light rounded-xl mx-2"></div> */}
          <Link href="/">
            <span className="font-bold text-xl">covid-19 vaccine search</span>
          </Link>
          <div
            className="mobile-menu md:hidden flex flex-col"
            onClick={handleClick}
          >
            <button
              type="button"
              className="bg-accent-dark inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-accent-normal focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-accent-dark focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {click ? (
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={
            'flex md:space-x-3 md:space-y-0 space-y-2 md:opacity-100 md:flex-row flex-col items-center ' +
            (click
              ? 'opacity-100 transform transition-all ease-in duration-500'
              : 'hidden md:flex opacity-0 transition-all ease-out duration-300 md:transition-none')
          }
        >
          <Link href="/">
            <a className="font-semibold text-lg" onClick={closeMobileMenu}>
              hotspot
            </a>
          </Link>
          <Link href="/popup">
            <a className="font-semibold text-lg" onClick={closeMobileMenu}>
              pop-up
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};
