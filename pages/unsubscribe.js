import Head from 'next/head';
import { Header } from '@/molecules/Header';
import { UnsubscribeForm } from '@/organisms/UnsubscribeForm';

const Unsubscribe = () => {
  return (
    <>
      <Head>
        <title>Unsubscribe</title>
      </Head>
      <Header />
      <div className="text-gray-600 flex flex-col m-5 items-center">
        <div className="flex flex-col justify-center text-center items-center max-w-4xl p-5">
          <div className="flex flex-col space-y-3 m-5 md:-ml-5 text-left text-lg">
            <h1 className="text-4xl font-semibold text-center">Unsubscribe</h1>
            <h2>
              Please enter the postal code and email that you used when signing
              up for notifications.
            </h2>

            <UnsubscribeForm />

            <p>
              If you have any issues unsubscribing{' '}
              <a
                className="text-two-normal"
                href="mailto:contact@findavaccine.ca"
                target="_blank"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Unsubscribe;
