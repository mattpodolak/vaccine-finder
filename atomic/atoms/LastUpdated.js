export const LastUpdated = ({ lastUpdate }) => {
  const options = {
    hour12: true,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const datetime = new Date(lastUpdate);
  console.log(datetime);
  return (
    <h4 className="text-gray-400 text-sm">
      Last updated: {datetime.toLocaleString('en-US', options)}
    </h4>
  );
};
