import React from 'react';
import Link from 'next/link';

const TemplatePreview = ({
  title,
  description,
  href,
  tags = [],
  chains = []
}: {
  title: string;
  description: string;
  href: string;
  tags?: string[];
  chains?: string[];
}) => {
  return (
    <div className="template">
      <Link href={href}>
        <a>
          <div className="preview"></div>
        </a>
      </Link>
      <div className="meta">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        <div className="tags">
          Creates{' '}
          {tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <div className="tag">{tag}</div>
              {i < tags.length - 1 ? ' & ' : ''}
            </React.Fragment>
          ))}
        </div>
        <div className="chains">
          Using{' '}
          {chains.map((chain, i) => (
            <React.Fragment key={chain}>
              <div className={`chain chain-${chain.toLowerCase()}`}>
                {chain}
              </div>
              {i < chains.length - 1 ? ' or ' : ''}
            </React.Fragment>
          ))}
        </div>
      </div>
      <style jsx>{`
        .template {
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          text-decoration: none;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        }
        .preview {
          background-color: hsl(120, 59%, 90%);
          height: 180px;
        }
        .meta {
          padding: 20px;
        }
        .title {
          font-weight: 600;
          font-size: 22px;
          margin-bottom: 5px;
          letter-spacing: -1px;
        }
        .description {
          max-width: 60%;
          line-height: 1.4em;
          opacity: 0.5;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .tags {
          margin-bottom: 10px;
        }
        .tags,
        .chains {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          color: #777;
        }
        .tag,
        .chain {
          font-size: 11px;
          background-color: hsl(242, 10%, 94%);
          padding: 3px 7px;
          text-transform: uppercase;
          border-radius: 3px;
          color: #777;
          font-weight: 500;
        }
        .chain-ethereum {
          background-color: hsl(242, 59%, 90%);
          color: hsl(242, 59%, 60%);
        }
        .chain-matic {
          background-color: hsl(280, 49%, 90%);
          color: hsl(280, 49%, 60%);
        }
      `}</style>
    </div>
  );
};

export default TemplatePreview;
