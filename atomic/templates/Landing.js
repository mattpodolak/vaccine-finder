import { Button } from '@/atoms/Button';
import { EligibleForm } from '@/organisms/EligibleForm';
import { NotifyForm } from '@/organisms/NotifyForm';
import { Clinic } from '@/molecules/Clinic';
import { useState } from 'react';
import { ResultsHeader } from '@/molecules/ResultsHeader';

export const Landing = () => {
  const [results, setResults] = useState();
  const [searchForm, setSearchForm] = useState({});

  return (
    <div className="text-gray-600 flex flex-col m-5 items-center">
      <div className="flex md:flex-row flex-col justify-center items-center max-w-4xl p-5">
        <div className="md:-ml-12">
          <img src="health-doctor-vaccine.svg" width="250px" height="200px" />
        </div>
        <div className="flex flex-col max-w-xl space-y-2 m-5 md:-ml-5">
          <h1 className="text-4xl font-semibold">Find a vaccine</h1>
          <h2 className="text-lg">
            Search for pop-up and hot spot vaccination sites based on your age
            and postal code, and get notified when you become eligible.
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 p-5 space-y-5 bg-gray-100 w-full">
        <div className="flex flex-col max-w-2xl w-full space-y-1">
          <h3 className="text-2xl font-bold">Vaccine search</h3>
          <p>
            Check your vaccine eligibility based your age and postal code and
            set up notifications for when you become eligible at a pop-up
            vaccination site near you.
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
            <ResultsHeader length={results.available.length} />
            <div>
              <p>
                Get an email notification when you become eligible to register
                at a hot spot or pop-up vaccination site.
              </p>
              <div className="mt-2 mb-5">
                <NotifyForm {...searchForm} />
              </div>
            </div>

            {results.available.length > 0 && (
              <>
                <p>
                  <span className="text-two-normal">
                    {results.available.length}
                  </span>{' '}
                  out of {results.clinics} vaccination site(s) matched the
                  eligibility information provided.
                </p>
                {results.available.map((clinic) => {
                  return <Clinic key={clinic._id} {...clinic} />;
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
