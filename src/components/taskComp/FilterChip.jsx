const FilterChip = ({ label, filter, active=false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all
        ${active
          ? "border-violet-600 bg-violet-600 text-white shadow-sm shadow-violet-600/20"
          : "border-gray-200 text-gray-500 hover:border-gray-400 hover:bg-gray-50"
        }`}
    >
      {label}
    </button>
  );
}

export default FilterChip;