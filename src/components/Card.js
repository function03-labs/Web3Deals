const Card = ({ title, icon, stat, description }) => {
  return (
    <div className="card p-4 bg-white rounded-lg shadow-md">
      <div className="card-header flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="card-title text-sm font-medium text-gray-700">
          {title}
        </div>
        <div className="icon text-gray-500">
          {icon}
        </div>
      </div>
      <div className="card-content">
        <div className="stat text-2xl font-bold text-gray-900">{stat}</div>
        <p className="description text-xs text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
