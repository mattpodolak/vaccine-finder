import Link from 'next/link';

export const Header = () => {
  return (
    <header className="border-b-1 bg-one-normal text-white flex flex-col p-5 py-3 mb-10">
      <nav className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex w-full md:w-auto justify-between items-center">
          {/* <div className="w-4 h-4 bg-two-light rounded-xl mx-2"></div> */}
          <Link href="/">
            <span className="font-bold text-xl">covid-19 vaccine search</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
