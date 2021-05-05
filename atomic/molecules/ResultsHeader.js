export const ResultsHeader = ({ length }) => {
  const header = length > 0 ? 'Search results' : 'No results found';
  return (
    <div>
      <h3 className="text-2xl font-bold">{header}</h3>
    </div>
  );
};
