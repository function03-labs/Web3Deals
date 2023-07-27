import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, icon, mainStat, comparisonStat, theme }) => {
  const themeColors = theme === 'dark' ? 
    { 
      bg: 'bg-black', 
      border: 'border-gray-300', 
      title: 'text-gray-300', 
      stat: 'text-gray-300',
      description: 'text-gray-400'
    } : 
    { 
      bg: 'bg-white', 
      border: 'border-black', 
      title: 'text-black', 
      stat: 'text-black',
      description: 'text-gray-500'
    };

  return (
    <div className={`card p-4 pb-3 border ${themeColors.bg} ${themeColors.border} rounded shadow-md`}>
      <div className={`card-header flex flex-row items-center justify-between space-y-2 pb-4 border-b-2`}>
        <div className={`card-title text-lg font-bold ${themeColors.title}`}>
          {title}
        </div>
        <div className={`icon ${themeColors.title}`}>
          {icon}
        </div>
      </div>
      <div className="card-content pt-4">
        <div className={`stat text-3xl font-bold ${themeColors.stat}`}>{mainStat}</div>
        {comparisonStat && <p className={`text-sm ${themeColors.description} mb-1`}>{comparisonStat}</p>}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  mainStat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  comparisonStat: PropTypes.string,
  theme: PropTypes.string
};

Card.defaultProps = {
  comparisonStat: '',
  theme: 'light'
};

export default React.memo(Card);