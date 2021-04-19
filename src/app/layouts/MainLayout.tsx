import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ConnectWalletButton from '@app/components/wallet/ConnectWalletButton';

const MainLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="main-layout">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        <div className="info-bar">
          This is an experimental tool to customize and launch your own
          decentralized / web3 / nft site. It is not production ready!
          <div className="stripes">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern
                  id="pattern_Z4YTl"
                  patternUnits="userSpaceOnUse"
                  width="5"
                  height="5"
                  patternTransform="rotate(75)"
                >
                  <line
                    x1="0"
                    y="0"
                    x2="0"
                    y2="5"
                    stroke="ghostwhite"
                    strokeWidth="5"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#pattern_Z4YTl)"
                opacity="0.1"
              />
            </svg>
          </div>
        </div>
        <div className="header">
          <div>
            <Link href="/">
              <a className="factory">FACTORY</a>
            </Link>
          </div>
          <div>
            <ConnectWalletButton />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <style jsx>{`
        .main-layout {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
        }
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }
        .info-bar {
          padding: 5px 20px;
          background-color: blueviolet;
          color: white;
          text-transform: uppercase;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-size: 12px;
          position: relative;
          overflow: hidden;
        }
        .header {
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .stripes {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .factory {
          font-weight: bold;
          font-size: 24px;
        }
        main {
          flex: 1 1 auto;
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 0;
        }
        footer {
          position: fixed;
          bottom: 0;
          left: 0;
          padding: 10px 20px;
          color: #aaa;
        }
      `}</style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html,
        body,
        input,
        textarea,
        button {
          font-family: 'Space Grotesk', sans-serif;
        }
        html,
        body {
          background-color: ghostwhite;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
