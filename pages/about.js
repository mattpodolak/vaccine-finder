import Head from 'next/head';
import { Header } from '@/molecules/Header';

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
          <div className="flex flex-col space-y-3 m-5 md:-ml-5 text-left text-lg">
            <h1 className="text-4xl font-semibold text-center">
              Find a Vaccine
            </h1>
            <h2>
              This site is intended for finding{' '}
              <span className="font-medium text-two-normal">pop-up</span> and{' '}
              <span className="font-medium text-two-normal">hotspot</span>{' '}
              vaccinations, you will NOT be notified based on other eligibility
              changes.
            </h2>
            <p>
              Data is updated daily based on the information from the
              vaccination sites listed{' '}
              <a
                className="text-two-normal"
                href="https://vaccineto.ca/sites"
                target="_blank"
              >
                here.
              </a>{' '}
              For more information on getting vaccinated in the city of Toronto
              you can visit this{' '}
              <a
                className="text-two-normal"
                target="_blank"
                href="https://www.toronto.ca/home/covid-19/covid-19-protect-yourself-others/covid-19-vaccines/covid-19-how-to-get-vaccinated/?accordion=vaccine-eligibility"
              >
                link.
              </a>
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Popup;
