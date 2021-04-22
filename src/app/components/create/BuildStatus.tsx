import useBuildStatus from '@app/features/useBuildStatus';
import React from 'react';

const BuildStatus = ({ contractAddress }: { contractAddress: string }) => {
  const job = useBuildStatus(contractAddress);
  console.log({ job });
  if (!job) return null;
  return (
    <>
      {!job.finishedOn ? (
        <div className="section">
          <div className="section-header">Building Your Site</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${job.progress}%` }} />
          </div>
        </div>
      ) : job.returnvalue ? (
        <div className="section">
          <div className="section-header">Your Site has been built</div>
          <div className="links">
            <a
              href={job.returnvalue.siteUrl.replace(
                'ipfs://',
                'https://ipfs.io/ipfs/'
              )}
              target="_blank"
              className="section-link"
            >
              Preview it on IPFS here →
            </a>
            <a
              href={job.returnvalue.staticZipUrl.replace(
                'ipfs://',
                'https://ipfs.io/ipfs/'
              )}
              target="_blank"
              className="section-link"
            >
              Download Static Site →
            </a>

            <a
              href={job.returnvalue.sourceZipUrl.replace(
                'ipfs://',
                'https://ipfs.io/ipfs/'
              )}
              target="_blank"
              className="section-link"
            >
              Download Source Code →
            </a>
          </div>
        </div>
      ) : null}
      <style jsx>{`
        .progress-bar {
          height: 3px;
          width: 100%;
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }
        .progress {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          height: 100%;
          background-color: blueviolet;
          transition: width 100ms linear;
        }
        .section {
          text-align: center;
        }
        .section-header {
          font-weight: 500;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .section-link {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          font-size: 14px;
          display: block;
          margin: 10px;
        }
      `}</style>
    </>
  );
};

export default BuildStatus;
