import Head from 'next/head';
import { Landing } from '@/templates/Landing';
import { Header } from '@/organisms/Header';
import { server } from '@/config/index';

export default function Home({ clinics, lastUpdate }) {
  return (
    <>
      <Head>
        <title>COVID-19 Vaccine Search</title>
      </Head>
      <Header />
      <Landing clinics={clinics} lastUpdate={lastUpdate} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  console.log(process.env.NODE_ENV);
  const res = await fetch(`${server}/api/clinics/info`);

  try {
    const { clinics = 0, lastUpdate } = await res.json();
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
