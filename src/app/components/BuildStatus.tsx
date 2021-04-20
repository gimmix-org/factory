import useBuildStatus from '@app/features/useBuildStatus';
import React from 'react';

const BuildStatus = ({ contractAddress }: { contractAddress: string }) => {
  const job = useBuildStatus(contractAddress);
  if (!job) return null;
  return (
    <div className="build-status">
      {!job.finishedOn ? (
        <progress value={job.progress} max="100" />
      ) : (
        <a
          href={job.returnvalue.ipfsUrl.replace(
            'ipfs://',
            'https://ipfs.io/ipfs/'
          )}
          target="_blank"
          className="preview"
        >
          Preview your site here →
        </a>
      )}
      <style jsx>{`
        .build-status {
        }
        .preview {
          padding: 10px;
          text-align: center;
          border: 1px solid black;
          display: block;
          font-weight: 500;
          background-color: black;
          color: white;
        }
        .preview:hover {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default BuildStatus;
