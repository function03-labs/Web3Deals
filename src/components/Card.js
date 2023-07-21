import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, icon, mainStat, comparisonStat, subStat }) => {
  return (
    <div className="card p-6 bg-white border-2 border-black rounded-lg shadow-lg">
      <div className="card-header flex flex-row items-center justify-between space-y-2 pb-4 border-b-2">
        <div className="card-title text-lg font-bold text-black">
          {title}
        </div>
        <div className="icon text-black">
          {icon}
        </div>
      </div>
      <div className="card-content pt-4">
        <div className="stat text-3xl font-bold text-black">{mainStat}</div>
        {comparisonStat && <p className="text-sm text-gray-500 mb-1">{comparisonStat}</p>}
        {subStat && <p className="text-sm text-gray-500">{subStat}</p>}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  stat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  description: PropTypes.string,
};

Card.defaultProps = {
  description: '',
};

export default React.memo(Card);
