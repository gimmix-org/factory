import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import ConnectWalletButton from '@app/components/wallet/ConnectWalletButton';

const MainLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="main-layout">
      <header>
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
          background-color: ghostwhite;
        }
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }
        .header {
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background-color: hsla(240, 100%, 99%, 80%);
          backdrop-filter: blur(5px);
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
          letter-spacing: -1.5px;
        }
        .factory:hover {
          text-decoration: none;
        }
        main {
          flex: 1 1 auto;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          padding: 80px 20px;
          position: relative;
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
        @import url('https://rsms.me/inter/inter.css');
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
          font-family: 'Inter', sans-serif;
        }
        html,
        body {
          background-color: white;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        h1 {
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: -2px;
        }
        @supports (font-variation-settings: normal) {
          html {
            font-family: 'Inter var', sans-serif;
          }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
