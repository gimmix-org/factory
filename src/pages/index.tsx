import Globe from '@app/components/graphics/Globe';
import TemplatePreview from '@app/components/TemplatePreview';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

const Index: FunctionComponent = () => {
  return (
    <div className="index">
      <div className="grid">
        <div className="hero">
          <div className="hero-meta">
            <div className="hero-title">
              Customize and launch your very own Web3 project right from your
              browser.
            </div>
            <div className="hero-subtitle">
              Create your own fully-featured website and/or smart contract on
              the decentralized web without writing any code. You have sole,
              independent control over anything you create, and you get a copy
              of your source code too.
            </div>
            <Link href="/about">
              <a className="learn-more">Learn more</a>
            </Link>
          </div>
          <div className="hero-image">
            <Globe />
          </div>
        </div>
        <TemplatePreview
          title="Frame"
          description="Make an auto-updating digital frame for your NFT collection."
          href="/create/frame"
          tags={['Website']}
          chains={['Ethereum', 'Matic']}
        />
        <TemplatePreview
          title="Collection"
          description="Show off your NFT collection on your own domain."
          href="/create/collection"
          tags={['Website']}
          chains={['Ethereum', 'Matic']}
        />
        <TemplatePreview
          title="Bank"
          description="Automatically split payments across a group of addresses."
          href="/create/bank"
          tags={['Contract', 'Website']}
          chains={['Matic', 'Rinkeby']}
        />
        <TemplatePreview
          title="Voting Booth"
          description="Easily set up polls for private groups or public voting."
          href="/create/voting-booth"
          tags={['Contract', 'Website']}
          chains={['Mumbai', 'Rinkeby']}
        />
        <TemplatePreview
          title="Feed"
          description="Launch a blog-like feed, with RSS and podcast support."
          href="/create/feed"
          tags={['Contract', 'Website']}
          chains={['Mumbai', 'Rinkeby']}
        />
        <TemplatePreview
          title="Shop"
          description="Launch an NFT shop and sell your work your own way."
          href="/create/shop"
          tags={['Contract', 'Website']}
          chains={['Mumbai', 'Rinkeby']}
        />
        <TemplatePreview
          title="Commissions"
          description="Set up commissions with escrows and reviews."
          href="/create/commissions"
          tags={['Contract', 'Website']}
          chains={['Mumbai', 'Rinkeby']}
        />

        <div className="footer">...</div>
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          gap: 30px;
          grid-template-columns: repeat(3, 1fr);
        }
        .hero {
          padding: 40px;
          grid-area: auto / auto / auto / span 2;
          background-color: hsl(242, 61%, 90%);
          border-radius: 10px;
          display: grid;
          align-items: center;
          gap: 20px;
          grid-template-columns: 2fr 1fr;
          overflow: hidden;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        }
        .hero-image {
          padding: 0 0px;
        }
        .hero-title {
          font-weight: 600;
          font-size: 24px;
          line-height: 1.4em;
          margin-bottom: 20px;
        }
        .hero-subtitle {
          line-height: 1.4em;
          opacity: 0.8;
          margin-bottom: 20px;
        }
        .learn-more {
          border-radius: 20px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 14px;
          background-color: black;
          color: white;
          display: inline-block;
          text-decoration: none;
        }
        .footer {
          background-color: white;
          grid-area: auto / auto/ auto / span 3;
          padding: 20px;
          text-align: center;
          font-size: 18px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Index;
