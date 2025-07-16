import React, { useState, useEffect } from 'react';
import { Link as LinkType } from '../types';
import { fetchTitleFromUrl, createLink, getLinks } from '../utils/api';
import LinkCard from '../components/LinkCard';
import SearchBar from '../components/SearchBar';

const Dashboard: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [links, setLinks] = useState<LinkType[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadLinks = async () => {
    const response = await getLinks();
    if (response.success) {
      setLinks(response.data);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleFetchTitle = async () => {
    if (!urlInput) return;
    setLoading(true);
    const response = await fetchTitleFromUrl(urlInput);
    setLoading(false);
    if (response.success) {
      setTitleInput(response.data.title);
    } else {
      setError(response.error || 'Failed to fetch title');
    }
  };

  const handleAddLink = async () => {
    if (!urlInput || !titleInput) {
      setError('URL and title are required');
      return;
    }
    setLoading(true);
    const response = await createLink({ url: urlInput, title: titleInput });
    setLoading(false);
    if (response.success) {
      setUrlInput('');
      setTitleInput('');
      loadLinks();
    } else {
      setError(response.error || 'Failed to add link');
    }
  };

  const filteredLinks = links.filter((l) =>
    l.title.toLowerCase().includes(query.toLowerCase()) ||
    l.tags.some((t) => t.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">My Links</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Paste URL..."
            className="flex-1 p-2 border rounded"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            onClick={handleFetchTitle}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Get Title'}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Title..."
            className="flex-1 p-2 border rounded"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <button
            onClick={handleAddLink}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Link'}
          </button>
        </div>

        <SearchBar query={query} setQuery={setQuery} />

        <div className="grid gap-4">
          {filteredLinks.map((link) => (
            <LinkCard key={link._id} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
