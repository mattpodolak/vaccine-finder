import { Button } from '@/atoms/Button';
import { EligibleForm } from '@/organisms/EligibleForm';
import { NotifyForm } from '@/organisms/NotifyForm';
import { Clinic } from '@/molecules/Clinic';
import { useState } from 'react';
import { LastUpdated } from '@/molecules/LastUpdated';

export const Landing = ({ clinics, lastUpdate }) => {
  const [results, setResults] = useState();
  const [searchForm, setSearchForm] = useState({});

  return (
    <div className="text-gray-600 flex flex-col m-5 items-center">
      <div className="flex md:flex-row flex-col justify-center items-center max-w-4xl p-5">
        <div className="md:-ml-12">
          <img src="health-doctor-vaccine.svg" width="250px" height="200px" />
        </div>
        <div className="flex flex-col max-w-xl space-y-2 m-5 md:-ml-5">
          <h1 className="text-4xl font-semibold">Find a hotspot vaccine</h1>
          <h2 className="text-lg">
            Search for hotspot vaccination sites based on your age and postal
            code, and get notified when you become eligible.
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 p-5 space-y-5 bg-gray-100 w-full">
        <div className="flex flex-col max-w-2xl w-full space-y-1">
          <h3 className="text-2xl font-bold">Hotspot vaccine search</h3>
          <p>
            Checking <span className="text-two-normal">{clinics}</span>{' '}
            vaccination sites in Toronto for hotspot vaccine eligibility.
            Priority group data is updated daily based on the information
            provided{' '}
            <a
              className="underline text-two-normal hover:text-two-light ease-in-out duration-300"
              href="https://vaccineto.ca/sites"
              target="_blank"
            >
              here
            </a>
            .
          </p>

          <div className="flex flex-col pt-5 space-y-1 w-full">
            <EligibleForm
              setResults={setResults}
              setSearchForm={setSearchForm}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-5 space-y-2 max-w-2xl w-full">
        {results && results.available && (
          <>
            <LastUpdated
              length={results.available.length}
              lastUpdate={lastUpdate}
            />
            {results.available.length > 0 ? (
              results.available.map((clinic) => {
                return <Clinic key={clinic._id} {...clinic} />;
              })
            ) : (
              <div>
                <p>
                  Sign up to receive an email when you become eligible to
                  register for a vaccine at a hotspot vaccination site.
                </p>
                <div className="mt-5">
                  <NotifyForm {...searchForm} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
