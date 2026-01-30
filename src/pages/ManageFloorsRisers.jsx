import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBuildings, addRiserToBuilding, removeRiserFromBuilding } from '../services/api'; // Removed unused floor imports
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BottomNav from '../components/ui/BottomNav';
import BackButton from '../components/ui/BackButton';

const ManageFloorsRisers = () => {
  const { user } = useAuth();
  const [buildings, setBuildings] = useState([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState('');
  const [risers, setRisers] = useState([]); // Only risers, no more floors
  const [newRiser, setNewRiser] = useState({
    name: '',
    direction: '',
    floorsCovered: '',
    locationDescription: ''
  });

  useEffect(() => {
    const fetchBuildings = async () => {
      const data = await getBuildings();
      setBuildings(data);
    };
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (selectedBuildingId) {
      const building = buildings.find(b => b.id === parseInt(selectedBuildingId));
      if (building) {
        setRisers(building.risers || []); // Only load risers, not floors
      }
    } else {
      setRisers([]);
    }
  }, [selectedBuildingId, buildings]);

  if (user?.role !== 'Admin') {
    return <div className="text-center mt-10">Access Denied. Admins Only.</div>;
  }

  const handleAddRiser = async () => {
    if (!selectedBuildingId || !newRiser.direction || !newRiser.floorsCovered) return;

    // Construct the riser number from name and direction
    const riserNumber = newRiser.name ? `${newRiser.name} ${newRiser.direction}` : `${newRiser.direction} Riser`;

    try {
      const newRiserObj = {
        number: riserNumber,
        floorsCovered: newRiser.floorsCovered,
        locationDescription: newRiser.locationDescription
      };

      await addRiserToBuilding(selectedBuildingId, newRiserObj);
      const updatedBuildings = await getBuildings();
      setBuildings(updatedBuildings);
      const updatedBuilding = updatedBuildings.find(b => b.id === parseInt(selectedBuildingId));
      if (updatedBuilding) {
        setRisers(updatedBuilding.risers || []);
      }
      setNewRiser({ name: '', direction: '', floorsCovered: '', locationDescription: '' });
    } catch (err) {
      console.error("Error adding riser:", err);
    }
  };

  const handleDeleteRiser = async (riserId) => {
    try {
      await removeRiserFromBuilding(selectedBuildingId, riserId);
      const updatedBuildings = await getBuildings();
      setBuildings(updatedBuildings);
      const updatedBuilding = updatedBuildings.find(b => b.id === parseInt(selectedBuildingId));
      if (updatedBuilding) {
        setRisers(updatedBuilding.risers || []);
      }
    } catch (err) {
      console.error("Error deleting riser:", err);
    }
  };

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto relative">
        <div className="absolute top-4 left-4 z-10">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold mb-4 ml-12">Manage Risers</h1>
        <select
          value={selectedBuildingId}
          onChange={(e) => setSelectedBuildingId(e.target.value)}
          className="input-mockup mb-4 w-full"
        >
          <option value="">Select a Building</option>
          {buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        {selectedBuildingId && (
          <>
            {/* Riser Management Section */}
            <Card className="mockup-card mb-4">
              <h3 className="mockup-card-header">Add Riser to {buildings.find(b => b.id === parseInt(selectedBuildingId))?.name}</h3>
              <p className="text-sm text-gray-400 mb-2">Note: Multiple risers can serve the same floor (e.g., East/West, North/South, A/B).</p>
              <p className="text-sm text-gray-400 mb-2">Most buildings have multiple risers (e.g., East & West, North & South).</p>
              <Input
                label="Riser Name"
                value={newRiser.name || ''}
                onChange={(e) => setNewRiser({ ...newRiser, name: e.target.value })}
              />
              <select
                value={newRiser.direction || ''}
                onChange={(e) => setNewRiser({ ...newRiser, direction: e.target.value, number: newRiser.name ? `${newRiser.name} ${e.target.value}` : `${e.target.value} Riser` })}
                className="input-mockup w-full mt-2"
              >
                <option value="">Select Direction</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
              <Input
                label="Floors Covered"
                value={newRiser.floorsCovered}
                onChange={(e) => setNewRiser({ ...newRiser, floorsCovered: e.target.value })}
              />
              <Input
                label="Location Description"
                value={newRiser.locationDescription}
                onChange={(e) => setNewRiser({ ...newRiser, locationDescription: e.target.value })}
              />
              <Button onClick={handleAddRiser} className="btn-mockup mt-2">Add Riser</Button>
            </Card>

            <h2 className="text-xl font-bold mt-4 mb-2">Risers</h2>
            <div className="space-y-2">
              {risers.map(riser => (
                <Card key={riser.id} className="mockup-card flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Riser {riser.number}</h3>
                    <p className="text-sm text-gray-400">Floors: {riser.floorsCovered}</p>
                    <p className="text-sm text-gray-400">Location: {riser.locationDescription}</p>
                  </div>
                  <Button onClick={() => handleDeleteRiser(riser.id)} className="btn-mockup-outline text-xs bg-red-600 hover:bg-red-700">Delete</Button>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default ManageFloorsRisers;
