import { Pill } from './Pill';

export const DataSource = ({ source, info, link, screen_name, name }) => {
  return (
    <div className="w-60 flex flex-col space-y-2 shadow-md p-4 m-2">
      <a href={link} target="_blank">
        <Pill text={source} />
      </a>

      {source == 'twitter' ? (
        <>
          <p className="text-base">
            {name}{' '}
            <span className="text-base text-gray-400">@{screen_name}</span>
          </p>

          <p className="text-base">{info}</p>
        </>
      ) : (
        <p className="text-base">{info}</p>
      )}
    </div>
  );
};
