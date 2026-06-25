const StatCard = ({ count, label, borderColor }) => {
  return (
    <div
      className={`bg-white border border-gray-100 border-l-4 ${borderColor}
                  rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="text-2xl font-bold text-gray-900">
        {count}
      </div>

      <div className="text-xs text-gray-400 font-medium mt-0.5">
        {label}
      </div>
    </div>
  );
};

export default StatCard;