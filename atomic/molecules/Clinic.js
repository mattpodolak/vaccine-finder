import { Button } from '@/atoms/Button';
import { LastUpdated } from '@/atoms/LastUpdated';
import { Pill } from '@/molecules/Pill';

export const Clinic = (props) => {
  const {
    name,
    booking_link,
    eligibility,
    lastUpdated,
    source,
    screen_name,
  } = props;
  return (
    <div className="flex flex-col my-2 space-y-2 shadow-md p-5">
      <div className="flex flex-col items-left">
        <div className="flex space-x-1 items-center">
          <h1 className="text-lg font-medium">{name}</h1>
          {screen_name && (
            <h2 className="text-gray-400 font-medium">@{screen_name}</h2>
          )}
        </div>
        <LastUpdated lastUpdate={lastUpdated} />
        <Pill text={source} infoText={'information source'} />
      </div>
      <div className="flex">
        <p>{eligibility}</p>
      </div>
      {booking_link && (
        <div className="flex">
          <div className="self-end my-1">
            <a target="_blank" href={booking_link}>
              <Button>Register</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
