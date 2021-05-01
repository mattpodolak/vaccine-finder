import { Button, Input, Spinner } from '@/atoms/index';
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
      ...props,
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
              <Spinner loading={loading} />
              Notify Me
            </div>
          </Button>
        </div>
      </form>
      {errorMsg && <p className="text-two-normal">{errorMsg}</p>}
    </>
  );
};
