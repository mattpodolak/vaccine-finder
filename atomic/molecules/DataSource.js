import { Pill } from './Pill';

export const DataSource = ({ source, info, link }) => {
  return (
    <div className="w-60 flex flex-col space-y-2 shadow-md p-4 m-2">
      <a href={link} target="_blank">
        <Pill text={source} />
      </a>
      <p className="text-base">{info}</p>
    </div>
  );
};
