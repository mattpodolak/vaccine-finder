import { Button, Input } from '@/atoms/index';

export const EligibleForm = (props) => {
  return (
    <form
      className="flex-col sm:flex-row flex items-start sm:items-end"
      onSubmit={props.getClinics}
    >
      <div className="w-20 sm:mr-1">
        <span className="font-medium mx-1">Age</span>
        <Input
          name="age"
          type="text"
          pattern="[0-9]+"
          placeholder="32"
          required
          title="Age should only contain numbers."
        />
      </div>
      <div className="w-32 sm:mx-1">
        <span className="font-medium mx-1">Postal Code</span>
        <Input
          name="postalCode"
          type="text"
          pattern="([A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9])|([A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9])"
          label="Postal Code"
          placeholder="M5V 1M5"
          required
          title="Postal code should be formatted as M5V 1M5 or M5V1M5."
        />
      </div>
      <div className="my-1 sm:mx-1">
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
};
