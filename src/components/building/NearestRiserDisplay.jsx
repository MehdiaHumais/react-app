import React from 'react';
import Button from '../ui/Button';

<<<<<<< HEAD
const NearestRiserDisplay = ({ riserInfo, selectedRiser, onRiserChange }) => {
=======
const NearestRiserDisplay = ({ riserInfo }) => {
>>>>>>> 34f923383f5769e2bea43f33fb2d3ba8e01a36ac
  const { onCurrentFloor, above, below } = riserInfo;

  return (
    <div className="space-y-3">
<<<<<<< HEAD
      {/* Display selected riser if one is selected */}
      {selectedRiser && (
        <div className="bg-teal-900 border border-teal-700 p-3 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <strong>Selected Riser:</strong>
              <div className="mt-1">
                {/* Extract name and direction from the riser number */}
                {(() => {
                  const riserParts = selectedRiser.number.trim().split(/\s+/);
                  const direction = riserParts.length > 0 ? riserParts[riserParts.length - 1] : 'Unknown'; // Last part is the direction
                  const name = riserParts.length > 1 ? riserParts.slice(0, -1).join(' ') : selectedRiser.number; // Everything except the last part

                  return (
                    <>
                      <p className="font-bold">{name}</p>
                      <p className="text-sm text-teal-400">Direction: {direction}</p>
                      <p>Floors: {selectedRiser.floors_covered || selectedRiser.floorsCovered || 'N/A'}</p>
                      <p>Location: {selectedRiser.location_description || selectedRiser.locationDescription || 'N/A'}</p>
                    </>
                  );
                })()}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => {
                // If there's a callback function passed, use it to reset riser selection
                if (typeof onRiserChange === 'function') {
                  onRiserChange();
                }
              }}
            >
              Change
            </Button>
          </div>
=======
      {/* Risers on the current floor */}
      {onCurrentFloor && onCurrentFloor.length > 0 && (
        <div>
          <strong>Risers on Current Floor:</strong>
          <div className="mt-1 space-y-1">
            {onCurrentFloor.map((riser, index) => (
              <div key={index}>
                {riser.number}: Same floor
                <br />
                <small>{riser.locationDescription}</small>
                <br />
                <Button variant="outline" size="sm" className="mt-1">View Riser Details</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearest riser above */}
      {above ? (
        <div>
          <strong>Nearest Riser Above:</strong> {above.number} ({above.distance} floor{above.distance > 1 ? 's' : ''} above)
          <br />
          <small>{above.locationDescription}</small>
          <br />
          <Button variant="outline" size="sm" className="mt-1">View Riser Details</Button>
>>>>>>> 34f923383f5769e2bea43f33fb2d3ba8e01a36ac
        </div>
      )}

<<<<<<< HEAD
      {/* Risers on the current floor */}
      {onCurrentFloor && onCurrentFloor.length > 0 && !selectedRiser && (
        <div>
          <strong>Risers on Current Floor:</strong>
          <div className="mt-1 space-y-1">
            {onCurrentFloor.map((riser, index) => (
              <div key={riser.id || index} className="p-2 border border-gray-600 rounded">
                <p className="font-bold">{riser.number}</p>
                <p>Floors: {riser.floors_covered || riser.floorsCovered || 'N/A'}</p>
                <p>Location: {riser.location_description || riser.locationDescription || 'N/A'}</p>
              </div>
            ))}
          </div>
=======
      {/* Nearest riser below */}
      {below ? (
        <div>
          <strong>Nearest Riser Below:</strong> {below.number} ({below.distance} floor{below.distance > 1 ? 's' : ''} below)
          <br />
          <small>{below.locationDescription}</small>
          <br />
          <Button variant="outline" size="sm" className="mt-1">View Riser Details</Button>
>>>>>>> 34f923383f5769e2bea43f33fb2d3ba8e01a36ac
        </div>
      )}

      {/* Nearest risers - all directions */}
      {(!selectedRiser && (onCurrentFloor.length > 0 || (above && above.length > 0) || (below && below.length > 0))) && (
        <div>
          <strong>Nearest Risers:</strong>
          <div className="mt-1 space-y-1">
            {/* Risers on the same floor */}
            {onCurrentFloor && onCurrentFloor.length > 0 && onCurrentFloor.map((riser, index) => {
              // Extract name and direction from the riser number
              const riserParts = riser.number.split(' ');
              const direction = riserParts[riserParts.length - 1]; // Last part is the direction
              const name = riserParts.length > 1 ? riserParts.slice(0, -1).join(' ') : riser.number; // Everything except the last part

              return (
                <div key={riser.id || `current-${index}`} className="p-2 border border-gray-600 rounded bg-gray-800">
                  <p className="font-bold">{name} ({direction.toUpperCase()}) - Same floor</p>
                  <p>Floors: {riser.floors_covered || riser.floorsCovered || 'N/A'}</p>
                  <p>Location: {riser.location_description || riser.locationDescription || 'N/A'}</p>
                </div>
              );
            })}

            {/* Risers above the current floor */}
            {above && above.length > 0 && above.map((riser, index) => {
              // Extract name and direction from the riser number
              const riserParts = riser.number.split(' ');
              const direction = riserParts[riserParts.length - 1]; // Last part is the direction
              const name = riserParts.length > 1 ? riserParts.slice(0, -1).join(' ') : riser.number; // Everything except the last part

              return (
                <div key={riser.id || `above-${index}`} className="p-2 border border-gray-600 rounded bg-gray-800">
                  <p className="font-bold">{name} ({direction.toUpperCase()}) - {riser.distance} floor{riser.distance > 1 ? 's' : ''} above</p>
                  <p>Floors: {riser.floors_covered || riser.floorsCovered || 'N/A'}</p>
                  <p>Location: {riser.location_description || riser.locationDescription || 'N/A'}</p>
                </div>
              );
            })}

            {/* Risers below the current floor */}
            {below && below.length > 0 && below.map((riser, index) => {
              // Extract name and direction from the riser number
              const riserParts = riser.number.split(' ');
              const direction = riserParts[riserParts.length - 1]; // Last part is the direction
              const name = riserParts.length > 1 ? riserParts.slice(0, -1).join(' ') : riser.number; // Everything except the last part

              return (
                <div key={riser.id || `below-${index}`} className="p-2 border border-gray-600 rounded bg-gray-800">
                  <p className="font-bold">{name} ({direction.toUpperCase()}) - {riser.distance} floor{riser.distance > 1 ? 's' : ''} below</p>
                  <p>Floors: {riser.floors_covered || riser.floorsCovered || 'N/A'}</p>
                  <p>Location: {riser.location_description || riser.locationDescription || 'N/A'}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {(!selectedRiser && onCurrentFloor.length === 0 && (!above || above.length === 0) && (!below || below.length === 0)) && (
        <p>No risers found near this floor.</p>
      )}
    </div>
  );
};

export default NearestRiserDisplay;