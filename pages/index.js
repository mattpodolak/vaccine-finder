import Head from 'next/head';
import { Landing } from '@/templates/Landing';
import { Header } from '@/molecules/Header';
import { server } from '@/config/index';

export default function Home({ clinics, lastUpdate }) {
  return (
    <>
      <Head>
        <title>Hotspot Vaccine Search</title>
      </Head>
      <Header />
      <Landing clinics={clinics} lastUpdate={lastUpdate} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`${server}/api/clinics/info`);
  const defaultDate = new Date();

  var options = {
    timeZone: 'America/New_York',
    hour12: true,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  try {
    const {
      clinics = 0,
      lastUpdate = `${defaultDate.toLocaleString('en-US', options)}`,
    } = await res.json();
    return {
      props: { clinics, lastUpdate }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Landing page build error ', error);
    return {
      props: { clinics: 0, lastUpdate: null }, // will be passed to the page component as props
    };
  }
}
