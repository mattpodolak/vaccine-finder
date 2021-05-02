import Head from 'next/head';
import { Landing } from '@/templates/Landing';
import { Header } from '@/molecules/Header';
import { server } from '@/config/index';

export default function Home({ clinics }) {
  return (
    <>
      <Head>
        <title>Vaccine Search</title>
      </Head>
      <Header />
      <Landing clinics={clinics} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`${server}/api/clinics/info`);

  try {
    const { clinics = 0 } = await res.json();
    return {
      props: { clinics }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Landing page build error ', error);
    return {
      props: { clinics: 0 }, // will be passed to the page component as props
    };
  }
}
