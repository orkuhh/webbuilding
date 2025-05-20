import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import BuildCard from './BuildCard'; // Assuming BuildCard is adapted

export default function ProfilePage() {
  const { username: routeUsername } = useParams(); // Username from URL
  const { user: authenticatedUser, isLoading: authLoading } = useAuth(); // Currently authenticated user

  // Determine if we are viewing the authenticated user's own profile
  // or another user's profile based on the routeUsername.
  const isOwnProfileView = !routeUsername || (authenticatedUser && authenticatedUser.username === routeUsername);

  // Fetch profile data
  // If routeUsername is provided, fetch that user. Otherwise, fetch current authenticated user's profile.
  const profileToFetch = routeUsername ? { username: routeUsername } : {};
  const profileData = useQuery(
    routeUsername ? api.profiles.getByUsername : api.profiles.getCurrentUserProfile,
    routeUsername ? { username: routeUsername } : (authenticatedUser ? {} : "skip") // Skip if not authenticated and no username in route
  );
  
  // Fetch builds for the displayed profile
  const userBuilds = useQuery(
    api.builds.getAll,
    profileData?._id ? { filters: { user_id: profileData._id }, sortField: "_creationTime", sortOrder: "desc" } : "skip"
  );

  const isLoading = authLoading || profileData === undefined || userBuilds === undefined;
  
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-division-orange" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Profile Not Found</h2>
        <p className="text-gray-400 mb-6">
          The profile for "{routeUsername || 'current user'}" could not be found.
        </p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }
  
  // Determine if the displayed profile is the authenticated user's own profile
  // This is for UI elements like "Edit Profile" button
  const isActuallyOwnProfile = authenticatedUser && authenticatedUser._id === profileData._id;


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {profileData.avatar_url ? (
              <img
                src={profileData.avatar_url}
                alt={profileData.username}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-division-dark-lighter flex items-center justify-center">
                <span className="text-3xl font-bold text-division-orange">
                  {profileData.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">
                {profileData.username}
              </h1>
              {/* Display email if available and appropriate (e.g., for own profile) */}
              {/* <p className="text-gray-400">{profileData.email}</p> */}
              <p className="text-gray-400 mt-2">
                Member since {new Date(profileData._creationTime).toLocaleDateString()}
              </p>
            </div>
          </div>
          {isActuallyOwnProfile && (
            <Link to="/profile/edit" className="btn-secondary">
              Edit Profile
            </Link>
          )}
        </div>
        {/* Placeholder for Bio and Social Links if added to schema */}
        {/* {profileData.bio && <p className="mt-6 text-gray-300">{profileData.bio}</p>} */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Builds Created</h3>
          <p className="text-3xl font-bold text-division-orange">
            {userBuilds?.length || 0}
          </p>
        </div>
        {/* Placeholder for Likes Count / Comments Count if added */}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          {isActuallyOwnProfile ? "My Recent Builds" : `Recent Builds by ${profileData.username}`}
        </h2>
        {userBuilds && userBuilds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBuilds.map(build => (
              <BuildCard key={build._id} build={build} />
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center text-gray-400">
            No builds yet.
            {isActuallyOwnProfile && (
              <Link to="/builds/create" className="text-division-orange hover:underline ml-1">Create one?</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}