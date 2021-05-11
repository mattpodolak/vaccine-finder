import Head from 'next/head';
import { Header } from '@/molecules/Header';
import { DataSource } from '@/molecules/DataSource';
import { server } from '@/config/index';

const datasources = [
  {
    source: 'twitter',
    info:
      'Data is updated every 15 minutes from the Vaccine Hunters Canada (@VaxHuntersCan) twitter account',
    link: 'https://twitter.com/VaxHuntersCan',
  },
];

const About = ({ sources }) => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Header />
      <div className="text-gray-600 flex flex-col m-5 items-center">
        <div className="flex flex-col justify-center text-center items-center max-w-4xl p-5">
          <div className="md:-ml-12">
            <img src="health-vaccine-row.svg" width="500px" />
          </div>
          <div className="flex flex-col space-y-3 m-5 md:-ml-5 text-left text-lg">
            <h1 className="text-4xl font-semibold text-center">
              Find a Vaccine
            </h1>
            <h2>
              This site is intended for finding{' '}
              <span className="font-medium text-two-normal">pop-up</span> and{' '}
              <span className="font-medium text-two-normal">hotspot</span>{' '}
              COVID-19 vaccinations, you will NOT be notified based on other
              eligibility changes.
            </h2>

            <p>
              Let us know how we are doing. We can be reached on Twitter (
              <a
                className="text-two-normal"
                href="https://twitter.com/FindaVaccine"
                target="_blank"
              >
                @FindaVaccine
              </a>
              ) or by{' '}
              <a
                className="text-two-normal"
                href="mailto:contact@findavaccine.ca"
                target="_blank"
              >
                email
              </a>
              .
            </p>
            <div>
              <h3 className="text-2xl font-semibold text-left mb-4">
                Data sources
              </h3>
              <div className="flex flex-wrap">
                {sources.map((source) => {
                  return <DataSource key={source.link} {...source} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;

export async function getServerSideProps(ctx) {
  const res = await fetch(`${server}/api/tweets/info`);
  const vacto = {
    source: 'vaccineto',
    info:
      'Vaccination site data is updated daily based on the information listed on the vaccineto website.',
    link: 'https://vaccineto.ca/sites',
  };

  try {
    const { twitters = [] } = await res.json();
    const sources = twitters.map((tweet) => {
      return {
        ...tweet,
        source: 'twitter',
        info: `Data is updated every 15 minutes.`,
        link: `https://twitter.com/${tweet.screen_name}`,
      };
    });
    sources.push(vacto);
    return {
      props: { sources }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log('Landing page build error ', error);
    return {
      props: { sources: [vacto] }, // will be passed to the page component as props
    };
  }
}
