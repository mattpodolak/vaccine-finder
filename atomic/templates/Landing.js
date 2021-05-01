import { Button } from '@/atoms/Button';
import { EligibleForm } from '@/molecules/EligibleForm';
import { NotifyForm } from '@/molecules/NotifyForm';
import { Clinic } from '@/organisms/Clinic';
import { useState } from 'react';

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
          <h3 className="text-2xl font-bold">Find a vaccination site</h3>
          <p>
            Searching <span className="text-two-normal">{clinics}</span>{' '}
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
      <div className="flex flex-col justify-center mt-5 space-y-5 max-w-2xl w-full">
        {results && (
          <>
            <div className="flex flex-col space-y-1 w-full">
              {results.available &&
                (results.available.length > 0 ? (
                  <div>
                    <div className="mb-2">
                      <h3 className="text-2xl font-bold">Search results</h3>
                      <h4 className="text-gray-400 text-sm">
                        Last updated {lastUpdate}
                      </h4>
                    </div>
                    {results.available.map((clinic) => {
                      return <Clinic key={clinic._id} {...clinic} />;
                    })}
                  </div>
                ) : (
                  <div className="flex-col flex">
                    <div className="mb-2">
                      <h3 className="text-3xl font-bold">No results found</h3>
                      <h4 className="text-gray-400 text-sm">
                        Last updated {lastUpdate}
                      </h4>
                    </div>
                    <p>
                      Sign up to receive an email when you become eligible to
                      register for a vaccine at a hotspot vaccination site.
                    </p>
                    <div className="mt-5">
                      <NotifyForm {...searchForm} />
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
