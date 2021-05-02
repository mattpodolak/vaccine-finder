export const ResultsHeader = ({ length }) => {
  const header = length > 0 ? 'Search results' : 'No results found';
  return (
    <div className="mb-2">
      <h3 className="text-2xl font-bold">{header}</h3>
    </div>
  );
};
