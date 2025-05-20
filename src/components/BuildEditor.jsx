import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '../context/AuthContext';
// import InventorySlot from './InventorySlot'; // Assuming this is for detailed item selection later

// Mock games list, can be fetched or dynamic
const GAMES_OPTIONS = ["The Division 2", "The Division"];

function BuildEditor() {
  const { buildId } = useParams(); // For editing existing build
  const navigate = useNavigate();
  const { user: currentUser, isAuthenticated, isLoading: authLoading } = useAuth();

  const isEditing = Boolean(buildId);

  // Fetch existing build data if editing
  const existingBuild = useQuery(
    api.builds.getById,
    isEditing ? { id: buildId } : "skip"
  );

  const createBuildMutation = useMutation(api.builds.create);
  const updateBuildMutation = useMutation(api.builds.update);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [game, setGame] = useState(GAMES_OPTIONS[0]); // Default to first game
  const [isPublic, setIsPublic] = useState(true);
  // build_data will be a JSON string for simplicity in this example, 
  // but ideally, it would be a structured object with its own editor UI.
  const [buildDataJson, setBuildDataJson] = useState('{}'); 
  
  const [isLoading, setIsLoading] = useState(false); // For form submission
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing && existingBuild) {
      setTitle(existingBuild.title);
      setDescription(existingBuild.description || '');
      setGame(existingBuild.game);
      setIsPublic(existingBuild.is_public);
      setBuildDataJson(JSON.stringify(existingBuild.build_data || {}, null, 2));
    } else if (!isEditing) {
      // Reset form for new build
      setTitle('');
      setDescription('');
      setGame(GAMES_OPTIONS[0]);
      setIsPublic(true);
      setBuildDataJson('{}');
    }
  }, [isEditing, existingBuild]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("You must be logged in to create or update a build.");
      return;
    }
    setError(null);
    setIsLoading(true);

    let parsedBuildData;
    try {
      parsedBuildData = JSON.parse(buildDataJson);
    } catch (jsonError) {
      setError("Invalid JSON format for build data. Please check the structure.");
      setIsLoading(false);
      return;
    }

    const buildPayload = {
      title,
      description,
      game,
      build_data: parsedBuildData,
      is_public: isPublic,
    };

    try {
      let resultBuildId;
      if (isEditing) {
        if (!buildId) { // Should not happen if isEditing is true
             setError("Build ID is missing for update.");
             setIsLoading(false);
             return;
        }
        await updateBuildMutation({ id: buildId, ...buildPayload });
        resultBuildId = buildId;
      } else {
        resultBuildId = await createBuildMutation(buildPayload);
      }
      navigate(`/builds/${resultBuildId}`);
    } catch (err) {
      console.error("Failed to save build:", err);
      setError(err.message || "An unexpected error occurred while saving the build.");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (authLoading || (isEditing && existingBuild === undefined)) {
    return <div className="text-center py-12">Loading editor...</div>;
  }

  if (!isAuthenticated && !authLoading) {
     return (
      <div className="text-center py-12">
        <p className="text-xl text-white mb-4">Please <Link to="/login" className="text-division-orange hover:underline">log in</Link> to create or edit builds.</p>
      </div>
    );
  }
  
  // Basic authorization check for editing
  if (isEditing && existingBuild && currentUser && existingBuild.user_id !== currentUser._id) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-red-500">You are not authorized to edit this build.</p>
        <Link to="/builds" className="btn-primary mt-4">Back to Builds</Link>
      </div>
    );
  }


  return (
    <div className="bg-gradient-to-b from-black to-black/95 p-4 sm:p-8 max-w-4xl mx-auto rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        {isEditing ? 'Edit Build' : 'Create New Build'}
      </h1>
      
      {error && (
        <div className="p-3 mb-4 text-red-400 bg-red-900/30 border border-red-700 rounded-lg">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-division-gray-light mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input w-full"
            placeholder="Build Title (e.g., Striker DPS King)"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-division-gray-light mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="input w-full resize-none"
            placeholder="Briefly describe your build, its purpose, and playstyle."
          />
        </div>
        
        <div>
          <label htmlFor="game" className="block text-sm font-medium text-division-gray-light mb-1">Game</label>
          <select 
            id="game" 
            value={game} 
            onChange={(e) => setGame(e.target.value)} 
            required 
            className="input w-full"
          >
            {GAMES_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="buildDataJson" className="block text-sm font-medium text-division-gray-light mb-1">
            Build Data (JSON format)
          </label>
          <textarea
            id="buildDataJson"
            value={buildDataJson}
            onChange={(e) => setBuildDataJson(e.target.value)}
            rows="10"
            className="input w-full font-mono text-sm resize-none"
            placeholder='e.g., { "gear": { "mask": "Coyote\'s Mask" }, "talents": ["Obliterate"] }'
          />
          <p className="text-xs text-division-gray-light mt-1">
            Enter structured data for your build (gear, weapons, skills, stats). 
            This will be improved with a visual editor later.
          </p>
        </div>

        <div className="flex items-center">
          <input
            id="is_public"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 rounded border-gray-600 bg-division-dark-lighter text-division-orange focus:ring-division-orange"
          />
          <label htmlFor="is_public" className="ml-2 block text-sm text-division-gray-light">
            Make this build public
          </label>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(isEditing ? `/builds/${buildId}` : '/builds')}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
            ) : null}
            {isEditing ? 'Save Changes' : 'Create Build'}
          </button>
        </div>
      </form>
      {/* Future: Add detailed InventorySlot based editor here */}
    </div>
  );
}

export default BuildEditor;
