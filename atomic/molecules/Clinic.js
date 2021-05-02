import { Button } from '@/atoms/Button';
import { LastUpdated } from '@/atoms/LastUpdated';

export const Clinic = (props) => {
  const { name, booking_link, eligibility, lastUpdated } = props;
  return (
    <div className="flex flex-col my-2 space-y-2 shadow-md p-5">
      <div className="flex flex-col items-left">
        <h1 className="text-lg font-medium">{name}</h1>
        <LastUpdated lastUpdate={lastUpdated} />
      </div>
      <div className="flex">
        <p>{eligibility}</p>
      </div>
      <div className="flex">
        <div className="self-end my-1">
          <a target="_blank" href={booking_link}>
            <Button>Register</Button>
          </a>
        </div>
      </div>
    </div>
  );
};
