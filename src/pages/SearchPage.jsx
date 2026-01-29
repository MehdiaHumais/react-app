import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBuildings } from '../services/api';
import BuildingCard from '../components/building/BuildingCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import BottomNav from '../components/ui/BottomNav';

const SearchPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [buildings, setBuildings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTech, setFilterTech] = useState('');
  const [filterComplexity, setFilterComplexity] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchBuildings = async () => {
      setLoading(true);
      try {
        const data = await getBuildings();
        console.log("SearchPage: Fetched buildings:", data?.length);
        setBuildings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("SearchPage: Failed to fetch buildings", err);
        setFetchError('Failed to load buildings. Please try again.');
        setBuildings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBuildings();
  }, []);

  const filteredBuildings = buildings.filter(building => {
    const bName = building.name || '';
    const bAddress = building.address || '';
    const bTech = building.technologySummary || building.technology || '';

    const matchesSearch = bName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bTech.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTech = !filterTech || bTech.includes(filterTech);
    const matchesComplexity = !filterComplexity || (
      (filterComplexity === 'low' && building.complexityPercentage <= 33) ||
      (filterComplexity === 'medium' && building.complexityPercentage > 33 && building.complexityPercentage <= 66) ||
      (filterComplexity === 'high' && building.complexityPercentage > 66)
    );
    return matchesSearch && matchesTech && matchesComplexity;
  });

  // Loading state for auth
  if (authLoading) {
    return (
      <div className="full-screen bg-dark flex items-center justify-center">
        <p className="text-white">Loading Authentication...</p>
      </div>
    );
  }

  if (!user || (user.role !== 'Technician' && user.role !== 'Admin')) {
    return (
      <div className="full-screen bg-dark flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h1>
        <p className="text-white mb-4">You do not have permission to view this page.</p>
        <Button onClick={() => window.location.href = '/'} className="btn-mockup w-auto px-6">
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="full-screen bg-dark flex flex-col">
      <div className="p-4 flex-grow overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Search Buildings</h1>

        <div className="mb-4 flex flex-col sm:flex-row gap-2 items-start">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search by name, address, or tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-white"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={filterTech}
              onChange={(e) => setFilterTech(e.target.value)}
              className="bg-surface text-white p-2 rounded-md border border-gray-700 flex-1 sm:flex-none"
            >
              <option value="">Technology ▼</option>
              <option value="Huawei">Huawei</option>
              <option value="Nokia">Nokia</option>
              <option value="SmartOLT">SmartOLT</option>
              <option value="U2000">U2000</option>
              <option value="Positron">Positron</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={filterComplexity}
              onChange={(e) => setFilterComplexity(e.target.value)}
              className="bg-surface text-white p-2 rounded-md border border-gray-700 flex-1 sm:flex-none"
            >
              <option value="">Complexity ▼</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-400">Loading buildings...</p>
            </div>
          ) : fetchError ? (
            <div className="text-center py-10">
              <p className="text-red-500">{fetchError}</p>
              <Button onClick={() => window.location.reload()} className="mt-4 btn-mockup">
                Retry
              </Button>
            </div>
          ) : buildings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No buildings available in the database.</p>
            </div>
          ) : filteredBuildings.length > 0 ? (
            filteredBuildings.map(building => (
              <BuildingCard key={building.id} building={building} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg font-semibold">No results found for "{searchTerm}"</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default SearchPage;