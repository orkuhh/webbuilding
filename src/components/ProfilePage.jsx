import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';

export default function ProfilePage() {
  const { username } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        console.log('Looking for profile with username:', username);
        console.log('Current user:', user);
        
        // Try to get profile by username
        const { data, error } = await db.profiles.getByUsername(username);
        console.log('Profile data:', data);
        console.log('Profile error:', error);
        
        if (error) throw error;
        setProfile(data);
      } catch (e) {
        console.error('Error loading profile:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      loadProfile();
    }
  }, [username, user]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-division-orange" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Profile Not Found</h2>
        <p className="text-gray-400 mb-6">The profile you're looking for doesn't exist.</p>
        <p className="text-gray-400 mb-6">Username: {username}</p>
        {user && (
          <p className="text-gray-400 mb-6">
            Your username: {user.user_metadata?.username}
          </p>
        )}
        <Link to="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.username}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-division-dark-lighter flex items-center justify-center">
                <span className="text-3xl font-bold text-division-orange">
                  {profile.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">
                {profile.display_name || profile.username}
              </h1>
              {profile.display_name && (
                <p className="text-gray-400">@{profile.username}</p>
              )}
              <p className="text-gray-400 mt-2">
                Member since {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          {isOwnProfile && (
            <Link to="/profile/edit" className="btn-secondary">
              Edit Profile
            </Link>
          )}
        </div>

        {profile.bio && (
          <p className="mt-6 text-gray-300">{profile.bio}</p>
        )}

        {/* Social Links */}
        <div className="mt-6 flex flex-wrap gap-4">
          {profile.discord_username && (
            <a
              href={`https://discord.com/users/${profile.discord_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-division-orange"
            >
              <span>Discord</span>
            </a>
          )}
          {profile.twitter_username && (
            <a
              href={`https://twitter.com/${profile.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-division-orange"
            >
              <span>Twitter</span>
            </a>
          )}
          {profile.website_url && (
            <a
              href={profile.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-division-orange"
            >
              <span>Website</span>
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Builds</h3>
          <p className="text-3xl font-bold text-division-orange">
            {profile.builds}
          </p>
        </div>
        {/* Add more stats cards here */}
      </div>

      {/* Builds Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Recent Builds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add build cards here */}
          <div className="card p-6 text-center text-gray-400">
            No builds yet
          </div>
        </div>
      </div>
    </div>
  );
} 