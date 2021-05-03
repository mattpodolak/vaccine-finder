import Head from 'next/head';
import { Header } from '@/molecules/Header';
import { Pill } from '@/molecules/Pill';

const Popup = () => {
  return (
    <>
      <Head>
        <title>About</title>
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
              COVID-19 vaccinations, you will NOT be notified based on other
              eligibility changes.
            </h2>

            <p>
              If you have any issues accessing the site, or are interested in
              providing feedback,{' '}
              <a
                className="text-two-normal"
                href="mailto:contact@findavaccine.ca"
                target="_blank"
              >
                contact us
              </a>
              .
            </p>
            <div>
              <h3 className="text-2xl font-semibold text-left">Data sources</h3>
              <div>
                <Pill text="vaccineto" />
                <p>
                  Vaccination site data is updated daily based on the
                  information listed{' '}
                  <a
                    className="text-two-normal"
                    href="https://vaccineto.ca/sites"
                    target="_blank"
                  >
                    here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Popup;
