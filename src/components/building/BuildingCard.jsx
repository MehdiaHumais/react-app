import React from 'react';
import { Link } from 'react-router-dom';

const BuildingCard = ({ building }) => {
  // Count total risers for the building (floors are now dependent on risers)
  const totalRisers = building.risers ? building.risers.length : 0;

  // Calculate unique floors from risers' floorsCovered data
  const totalFloors = (() => {
    if (!building.risers || !Array.isArray(building.risers)) return 0;

    const allFloors = new Set();

    building.risers.forEach(riser => {
      const floorsStr = riser.floorsCovered || riser.floors_covered;
      if (floorsStr) {
        const ranges = floorsStr.split(',');
        ranges.forEach(range => {
          if (range.includes('-')) {
            const [start, end] = range.trim().split('-').map(Number);
            for (let i = start; i <= end; i++) {
              allFloors.add(i);
            }
          } else {
            const floorNum = parseInt(range.trim());
            if (!isNaN(floorNum)) {
              allFloors.add(floorNum);
            }
          }
        });
      }
    });

    return allFloors.size;
  })();

  return (
    <Link to={`/building/${building.id}`} className="block w-full">
      <div className="bg-surface p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200">
        <h3 className="text-xl font-bold text-white mb-3">{building.name}</h3>

        {/* Technology information */}
        <div className="mb-2">
          <span className="text-gray-400 text-sm">Technologies: </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {(building.technologySummary || building.technology || '').split(', ')
              .filter(tech => tech.trim() !== '')
              .map((tech, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-700 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
                >
                  {tech.trim()}
                </span>
              ))}
          </div>
        </div>

        <div className="space-y-1 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Complexity</span>
            <span className="text-white font-semibold">{building.complexityPercentage}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Required</span>
            <span className="text-white font-semibold">{building.requiredTechnicians} Techs</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Direction</span>
            <span className="text-white font-semibold">{building.direction || 'N/A'}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Risers</span>
            <span className="text-white font-semibold">{totalRisers}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Floors</span>
            <span className="text-white font-semibold">{totalFloors}</span>
          </div>
        </div>

        <div className="flex items-center justify-end mt-2">
          <svg
            className="w-5 h-5 text-gray-400 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default BuildingCard;