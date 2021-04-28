import { Button } from '@/atoms/Button';

export const Clinic = (props) => {
  const {
    name,
    host,
    status,
    website,
    address,
    distance,
    booking_link,
    eligibility,
  } = props;
  return (
    <div className="flex flex-col my-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">{name}</h1>
        <h2 className="text-gray-400">{distance}km away</h2>
      </div>
      <div className="flex">
        <p>{eligibility}</p>
      </div>
      <div className="flex my-2">
        <div className="self-end">
          <a target="_blank" href={booking_link}>
            <Button>Register</Button>
          </a>
        </div>
      </div>
    </div>
  );
};
