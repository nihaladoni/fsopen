const Filter = ({ onSearchChange }) => {
  return (
    <div>
      filter show with
      <input
        type="text"
        onChange={(e) => onSearchChange(e.target.value.trim())}
      />
    </div>
  );
};

export default Filter;
