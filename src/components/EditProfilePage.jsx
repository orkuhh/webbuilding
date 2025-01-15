import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    discord_username: '',
    twitter_username: '',
    website_url: ''
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const { data, error } = await db.profiles.getById(user.id);
        if (error) throw error;
        
        setFormData({
          display_name: data.display_name || '',
          bio: data.bio || '',
          discord_username: data.discord_username || '',
          twitter_username: data.twitter_username || '',
          website_url: data.website_url || ''
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const { error } = await db.profiles.uploadAvatar(user.id, file);
      if (error) throw error;
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      const { error } = await db.profiles.update(user.id, formData);
      if (error) throw error;
      
      navigate(`/profile/${user.user_metadata.username}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-division-orange" />
      </div>
    );
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
        {/* Avatar Upload */}
        <div className="card p-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-division-dark-lighter file:text-white
              hover:file:bg-division-dark-light"
          />
        </div>

        {/* Display Name */}
        <div className="card p-6">
          <label htmlFor="display_name" className="block text-sm font-medium text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            id="display_name"
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
            placeholder="How should we call you?"
          />
        </div>

        {/* Bio */}
        <div className="card p-6">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Social Links */}
        <div className="card p-6 space-y-4">
          <h3 className="text-lg font-medium text-white">Social Links</h3>
          
          <div>
            <label htmlFor="discord_username" className="block text-sm font-medium text-gray-300 mb-2">
              Discord Username
            </label>
            <input
              type="text"
              id="discord_username"
              name="discord_username"
              value={formData.discord_username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
              placeholder="Your Discord username"
            />
          </div>

          <div>
            <label htmlFor="twitter_username" className="block text-sm font-medium text-gray-300 mb-2">
              Twitter Username
            </label>
            <input
              type="text"
              id="twitter_username"
              name="twitter_username"
              value={formData.twitter_username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
              placeholder="Your Twitter username (without @)"
            />
          </div>

          <div>
            <label htmlFor="website_url" className="block text-sm font-medium text-gray-300 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website_url"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
              placeholder="https://your-website.com"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(`/profile/${user.user_metadata.username}`)}
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