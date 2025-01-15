import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const CATEGORY_OPTIONS = ["General", "PvE", "PvP", "Raid", "Dark Zone", "Gear", "Weapons", "Skills"];

export default function CreateGuidePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    difficulty: 'Beginner',
    categories: [],
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }
    if (formData.categories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    try {
      // TODO: Implement guide creation with Supabase
      console.log('Creating guide:', { ...formData, author: user.id });
      navigate('/guides');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-white">Create a Guide</h1>
        <p className="mt-2 text-gray-400">Share your knowledge with the community</p>
      </header>

      {error && (
        <div className="p-4 text-red-500 bg-red-500/10 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="card p-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
            placeholder="Enter a descriptive title for your guide"
          />
        </div>

        {/* Description */}
        <div className="card p-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
            placeholder="Write a brief description of what your guide covers"
          />
        </div>

        {/* Content */}
        <div className="card p-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className="w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
            placeholder="Write your guide content here..."
          />
        </div>

        {/* Difficulty and Categories */}
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Difficulty */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
              >
                {DIFFICULTY_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.categories.includes(category)
                        ? 'bg-division-orange text-black'
                        : 'bg-division-dark-lighter text-gray-300 hover:bg-division-dark-light'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="card p-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-division-dark-lighter text-gray-300 text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
              className="flex-1 rounded-lg bg-division-dark-lighter border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-division-orange"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn-secondary"
            >
              Add
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/guides')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Create Guide
          </button>
        </div>
      </form>
    </div>
  );
} 