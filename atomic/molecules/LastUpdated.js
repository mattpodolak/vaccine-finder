export const LastUpdated = ({ length, lastUpdate }) => {
  const header = length > 0 ? 'Search results' : 'No results found';
  return (
    <div className="mb-2">
      <h3 className="text-2xl font-bold">{header}</h3>
      <h4 className="text-gray-400 text-sm">Last updated: {lastUpdate}</h4>
    </div>
  );
};
