import { Button, Input } from '@/atoms/index';

export const NotifyForm = (props) => {
  return (
    <form
      className="flex-col sm:flex-row flex items-start sm:items-end"
      onSubmit={props.notifyMe}
    >
      <div className="w-48 sm:mr-1">
        <span className="font-medium mx-1">Email</span>
        <Input
          name="email"
          type="email"
          placeholder="joanne@gmail.com"
          required
        />
      </div>
      <div className="my-1 sm:mx-1">
        <Button type="submit">Notify Me</Button>
      </div>
    </form>
  );
};
