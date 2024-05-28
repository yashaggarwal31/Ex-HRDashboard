'use client'
import { useState } from 'react';

const CopyToClipboard = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div>
      <button onClick={copyTextToClipboard} >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyToClipboard;