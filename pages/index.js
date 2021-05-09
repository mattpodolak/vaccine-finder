import Head from 'next/head';
import { Landing } from '@/templates/Landing';
import { Header } from '@/molecules/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vaccine Search</title>
      </Head>
      <Header />
      <Landing />
    </>
  );
}
