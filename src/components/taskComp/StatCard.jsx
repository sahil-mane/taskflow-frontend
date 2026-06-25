const StatCard = ({ icon, count, label, iconBg, iconColor }) => {
	return (
		<div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
			<div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center ${iconColor} text-lg mb-3`}>
				<i className={`ti ti-${icon}`} />
			</div>
			<div className="text-2xl font-bold text-gray-900">{count}</div>
			<div className="text-xs text-gray-400 font-medium mt-0.5">{label}</div>
		</div>
	);

}

export default StatCard;