import { Button, Input } from '@/atoms/index';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotifyForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const notifyMe = async (e) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
    };
    setLoading(true);

    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      toast.success('Success!');
      setLoading(false);
      setErrorMsg('');
    } else if (res.status === 400) {
      // Show specific error msg
      setLoading(false);
      setErrorMsg(await res.text());
    } else {
      // Show generic error msg
      setLoading(false);
      setErrorMsg('Something went wrong, please try again');
    }
  };
  return (
    <>
      <form
        className="flex-col sm:flex-row flex items-start sm:items-end"
        onSubmit={notifyMe}
      >
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="w-48 sm:mr-1">
          <span className="font-medium mx-1">Email</span>
          <Input
            name="email"
            type="email"
            placeholder="joanne@gmail.com"
            required
          />
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
              Notify Me
            </div>
          </Button>
        </div>
      </form>
      {errorMsg && <p className="text-two-normal">{errorMsg}</p>}
    </>
  );
};
