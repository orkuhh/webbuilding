import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuth(); // Renamed user to authUser
  
  const currentUserProfile = useQuery(api.profiles.getCurrentUserProfile, isAuthenticated ? {} : "skip");
  
  const updateProfileMutation = useMutation(api.profiles.update);
  const generateUploadUrlMutation = useMutation(api.profiles.generateUploadUrl);
  const uploadAvatarUrlMutation = useMutation(api.profiles.uploadAvatarUrl);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    // bio: '', // Add if bio is part of your schema and form
    // Other fields like discord, twitter, website can be added if in schema
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);


  useEffect(() => {
    if (currentUserProfile) {
      setFormData({
        username: currentUserProfile.username || '',
        // bio: currentUserProfile.bio || '', 
      });
      if (currentUserProfile.avatar_url) {
        setAvatarPreview(currentUserProfile.avatar_url);
      }
    }
  }, [currentUserProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      // 1. Update text-based profile data
      if (formData.username !== currentUserProfile?.username) { // Only update if changed
        await updateProfileMutation({ username: formData.username });
      }
      // Add other fields like bio if they are part of the form & mutation

      // 2. Handle avatar upload if a new file is selected
      if (avatarFile) {
        const postUrl = await generateUploadUrlMutation();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": avatarFile.type },
          body: avatarFile,
        });
        const { storageId } = await result.json();
        await uploadAvatarUrlMutation({ storageId });
      }
      
      // Navigate to profile page after successful save
      // Ensure username from profile (which might have been updated) is used for navigation
      const updatedProfile = await currentUserProfile; // Re-fetch or use returned data if mutation provides it
      navigate(`/profile/${formData.username || updatedProfile?.username}`);

    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };
  
  const isLoading = authLoading || currentUserProfile === undefined;

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-division-orange" />
      </div>
    );
  }
  
  if (!isAuthenticated || !currentUserProfile) {
     navigate('/login'); // Redirect if not authenticated or profile not loaded
     return null;
  }


  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
        <p className="mt-2 text-gray-400">Update your profile information</p>
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-500/10 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Profile Picture
          </label>
          {avatarPreview && (
            <img src={avatarPreview} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover mb-4" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarFileChange}
            className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-division-dark-lighter file:text-white
              hover:file:bg-division-dark-light"
          />
        </div>

        <div className="card p-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
            placeholder="Your unique username"
          />
        </div>

        {/* Add other fields like Bio here if needed */}
        {/* <div className="card p-6"> ... Bio textarea ... </div> */}
        {/* Add social links fields here if needed */}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(`/profile/${currentUserProfile.username}`)}
            className="btn-secondary"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={saving}
          >
            {saving ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}