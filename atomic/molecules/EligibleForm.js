import { Button, Input } from '@/atoms/index';
import { useState } from 'react';

export const EligibleForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const getClinics = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      age: e.currentTarget.age.value,
      postalCode: e.currentTarget.postalCode.value,
    };
    // TODO: add form validation

    const res = await fetch('/api/clinics/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const clinics = await res.json();
      props.setResults(clinics);
      setLoading(false);
      setErrorMsg('');
    } else if (res.status === 400) {
      // Show specific error msg
      props.setResults([]);
      setErrorMsg(await res.text());
      setLoading(false);
    } else {
      // Show generic error msg
      props.setResults([]);
      setErrorMsg('Something went wrong, please try again');
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex-col sm:flex-row flex items-start sm:items-end"
        onSubmit={getClinics}
      >
        <div className="flex">
          <div className="w-20 mr-1">
            <span className="font-medium mx-1">Age</span>
            <Input
              name="age"
              type="text"
              pattern="[0-9]+"
              placeholder="32"
              required
              title="Age should only contain numbers."
            />
          </div>
          <div className="w-32 mx-1">
            <span className="font-medium mx-1">Postal Code</span>
            <Input
              name="postalCode"
              type="text"
              pattern="([A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9])|([A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9])"
              label="Postal Code"
              placeholder="M5V 1M5"
              required
              title="Postal code should be formatted as M5V 1M5 or M5V1M5."
            />
          </div>
        </div>

        <div className="my-1 sm:mx-1">
          <Button type="submit" disabled={loading}>
            <div className="flex items-center">
              {loading && (
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Search
            </div>
          </Button>
        </div>
      </form>
      {errorMsg && <p className="text-two-normal">{errorMsg}</p>}
    </>
  );
};
