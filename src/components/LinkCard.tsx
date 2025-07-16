import React from 'react';
import { Link as LinkType } from '../types';

interface LinkCardProps {
  link: LinkType;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
        {link.title}
      </a>
      <p className="text-gray-500 text-sm mt-1 break-words">{link.url}</p>
      {link.description && <p className="text-gray-700 mt-2">{link.description}</p>}
      <div className="flex flex-wrap gap-2 mt-2">
        {link.tags.map((tag) => (
          <span key={tag._id} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LinkCard;
