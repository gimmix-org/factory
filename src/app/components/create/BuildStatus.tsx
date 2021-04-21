import useBuildStatus from '@app/features/useBuildStatus';
import React from 'react';

const BuildStatus = ({ contractAddress }: { contractAddress: string }) => {
  const job = useBuildStatus(contractAddress);
  if (!job) return null;
  return (
    <div className="build-status">
      {!job.finishedOn ? (
        <progress value={job.progress} max="100" />
      ) : job.returnvalue ? (
        <div className="success">
          <a
            href={job.returnvalue.siteUrl.replace(
              'ipfs://',
              'https://ipfs.io/ipfs/'
            )}
            target="_blank"
            className="preview"
          >
            Preview your site here →
          </a>
          <a
            href={job.returnvalue.staticZipUrl.replace(
              'ipfs://',
              'https://ipfs.io/ipfs/'
            )}
            target="_blank"
            className="preview"
          >
            Download Static Site →
          </a>

          <a
            href={job.returnvalue.sourceZipUrl.replace(
              'ipfs://',
              'https://ipfs.io/ipfs/'
            )}
            target="_blank"
            className="preview"
          >
            Download Source Code →
          </a>
        </div>
      ) : (
        <pre>{JSON.stringify(job, null, 2)}</pre>
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
        .success a {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default BuildStatus;
