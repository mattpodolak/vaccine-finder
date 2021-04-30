import Head from 'next/head';
import { Header } from '@/organisms/Header';

const Popup = () => {
  return (
    <>
      <Head>
        <title>Pop-up Vaccine Search</title>
      </Head>
      <Header />
      <div className="text-gray-600 flex flex-col m-5 items-center">
        <div className="flex flex-col justify-center text-center items-center max-w-4xl p-5">
          <div className="md:-ml-12">
            <img src="health-vaccine-row.svg" width="500px" />
          </div>
          <div className="flex flex-col space-y-2 m-5 md:-ml-5">
            <h1 className="text-4xl font-semibold">
              Pop-up vaccine search coming soon
            </h1>
            <h2 className="text-lg">
              Search for pop-up vaccination sites and set up notifications for
              future pop-ups.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default Popup;
