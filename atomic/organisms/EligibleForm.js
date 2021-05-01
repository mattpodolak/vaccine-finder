import { Button, Input, Spinner } from '@/atoms/index';
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

    props.setSearchForm(body);

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
              <Spinner loading={loading} />
              Search
            </div>
          </Button>
        </div>
      </form>
      {errorMsg && <p className="text-two-normal">{errorMsg}</p>}
    </>
  );
};
