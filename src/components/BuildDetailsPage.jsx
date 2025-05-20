import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '../context/AuthContext'; // To get current user for ownership checks

// Helper to display build_data (assuming it's an object)
const BuildDataDisplay = ({ data }) => {
  if (!data || typeof data !== 'object') {
    return <p className="text-division-gray-light">No detailed build data provided.</p>;
  }
  // Example: Render gear, skills, stats if they exist in build_data
  return (
    <>
      {data.gear && (
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Gear Setup</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data.gear).map(([slot, item]) => (
              <div key={slot} className="p-4 bg-division-dark-lighter rounded-lg">
                <div className="text-division-orange font-semibold capitalize mb-2">{slot}</div>
                <div className="text-white mb-1">{item?.name || 'N/A'}</div>
                {item?.attributes && <div className="text-division-gray-light text-sm">Attributes: {item.attributes.join(', ')}</div>}
                {item?.mod && <div className="text-division-gray-light text-sm">Mod: {item.mod}</div>}
                {item?.talent && <div className="text-division-yellow text-sm">Talent: {item.talent}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.skills && (
         <div className="card mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
           <div className="space-y-3">
            {Object.entries(data.skills).map(([slot, skill]) => (
              <div key={slot}>
                <div className="text-white font-semibold">{skill?.name || 'N/A'}</div>
                {skill?.mods && <div className="text-sm text-division-gray-light">Mods: {skill.mods.join(', ')}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {data.stats && (
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-3">Key Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(data.stats).map(([key, value]) => (
              <div key={key} className="p-3 bg-division-dark-lighter rounded-lg">
                <div className="text-division-gray-light text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="text-white font-bold text-lg">{String(value)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};


export default function BuildDetailsPage() {
  const { buildId } = useParams(); // Renamed id to buildId for clarity
  const navigate = useNavigate();
  const { user: currentUser, isAuthenticated, isLoading: authLoading } = useAuth();

  const build = useQuery(api.builds.getById, buildId ? { id: buildId } : "skip");
  const comments = useQuery(api.comments.getByBuildId, buildId ? { buildId: buildId } : "skip");

  const toggleLikeMutation = useMutation(api.builds.toggleLike);
  const addCommentMutation = useMutation(api.comments.create);
  const deleteCommentMutation = useMutation(api.comments.remove);
  const deleteBuildMutation = useMutation(api.builds.remove);

  const [newCommentText, setNewCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  if (build === undefined || comments === undefined || authLoading) {
    return <div className="text-center py-12">Loading build details...</div>;
  }

  if (build === null) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-division-gray-light mb-4">Build Not Found</h2>
        <p className="text-division-gray mb-6">The build you're looking for doesn't exist or has been removed.</p>
        <Link to="/builds" className="btn-primary">Back to Builds</Link>
      </div>
    );
  }

  const isOwner = currentUser && build && currentUser._id === build.user_id;

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      alert("Please log in to like builds.");
      return;
    }
    try {
      await toggleLikeMutation({ buildId: build._id });
    } catch (error) {
      console.error("Failed to toggle like:", error);
      alert("Failed to update like. Please try again.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) {
      setCommentError("Comment cannot be empty.");
      return;
    }
    if (!isAuthenticated) {
      alert("Please log in to comment.");
      return;
    }
    try {
      await addCommentMutation({ buildId: build._id, text: newCommentText });
      setNewCommentText('');
      setCommentError('');
    } catch (error) {
      console.error("Failed to add comment:", error);
      setCommentError("Failed to post comment. Please try again.");
    }
  };
  
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteCommentMutation({ id: commentId });
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const handleDeleteBuild = async () => {
    if (!window.confirm("Are you sure you want to delete this build? This action cannot be undone.")) return;
    try {
      await deleteBuildMutation({ id: build._id });
      navigate('/builds');
    } catch (error) {
      console.error("Failed to delete build:", error);
      alert("Failed to delete build. Please try again.");
    }
  };


  return (
    <div className="space-y-6 pb-8">
      <div className="flex justify-between items-start">
        <div>
          <Link to="/builds" className="text-division-gray-light hover:text-division-orange transition-colors mb-2 inline-block">
            ← Back to Builds
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">{build.title}</h1>
          <div className="flex items-center gap-4 text-division-gray-light">
            <span>by {build.creatorUsername || "Unknown User"}</span>
            <span>•</span>
            <span>Updated {new Date(build._creationTime).toLocaleDateString()}</span>
            <span>•</span>
            <span>Game: {build.game}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <button type="button" onClick={handleToggleLike} className={`btn-secondary flex items-center gap-2 ${build.userHasLiked ? 'text-division-orange' : ''}`}>
              <span>{build.userHasLiked ? '❤️ Liked' : '🤍 Like'}</span> {build.likesCount}
            </button>
          )}
          {!isAuthenticated && (
             <span className="text-division-gray-light">🤍 {build.likesCount} Likes</span>
          )}
          {isOwner && (
            <>
              <Link to={`/builds/edit/${build._id}`} className="btn-secondary">Edit</Link>
              <button onClick={handleDeleteBuild} type="button" className="btn-danger">Delete</button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {build.description && (
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-4">Description</h2>
              <p className="text-division-gray-light whitespace-pre-wrap">{build.description}</p>
            </div>
          )}
          <BuildDataDisplay data={build.build_data} />
        </div>

        <div className="space-y-6 lg:col-span-1">
           {/* Placeholder for "Overview" card if needed, can extract from build_data */}
           {/* Example:
            <div className="card">
                <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
                <p>Difficulty: {build.build_data?.difficulty || 'N/A'}</p>
                <p>Playstyle: {build.build_data?.playstyle || 'N/A'}</p>
            </div>
           */}
           
          {/* Comments Section */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Comments ({comments?.length || 0})</h2>
            {isAuthenticated && (
              <form onSubmit={handleAddComment} className="mb-6">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="input w-full h-24 resize-none"
                  rows="3"
                />
                {commentError && <p className="text-red-500 text-sm mt-1">{commentError}</p>}
                <button type="submit" className="btn-primary mt-2">Post Comment</button>
              </form>
            )}
            {!isAuthenticated && <p className="text-division-gray-light mb-4">Log in to post comments.</p>}
            
            <div className="space-y-4">
              {comments && comments.length > 0 ? (
                comments.map(comment => (
                  <div key={comment._id} className="p-3 bg-division-dark-lighter rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {comment.commenterAvatarUrl && (
                           <img src={comment.commenterAvatarUrl} alt={comment.commenterUsername} className="w-6 h-6 rounded-full" />
                        )}
                        <span className="text-division-orange font-semibold">{comment.commenterUsername}</span>
                      </div>
                      <span className="text-xs text-division-gray-light">{new Date(comment._creationTime).toLocaleString()}</span>
                    </div>
                    <p className="text-division-gray-light whitespace-pre-wrap">{comment.text}</p>
                    {currentUser && comment.user_id === currentUser._id && (
                       <button onClick={() => handleDeleteComment(comment._id)} className="text-xs text-red-500 hover:text-red-400 mt-1">Delete</button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-division-gray-light">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}