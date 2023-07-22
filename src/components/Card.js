import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, icon, mainStat, comparisonStat, theme }) => {
  const themeColors = theme === 'dark' ? 
    { 
      bg: 'bg-black', 
      border: 'border-gray-400', 
      title: 'text-white', 
      stat: 'text-white',
      description: 'text-gray-300'
    } : 
    { 
      bg: 'bg-white', 
      border: 'border-black', 
      title: 'text-black', 
      stat: 'text-black',
      description: 'text-gray-500'
    };

  return (
    <div className={`card p-6 border-2 ${themeColors.bg} ${themeColors.border} rounded-lg shadow-lg`}>
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
  stat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  description: PropTypes.string,
  theme: PropTypes.string
};

Card.defaultProps = {
  description: '',
  theme: 'light'
};

export default React.memo(Card);