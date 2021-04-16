import React, { FunctionComponent } from 'react';
import FactoryLayout from '@app/layouts/FactoryLayout';
import Link from 'next/link';

const Factory: FunctionComponent = () => {
  return (
    <FactoryLayout>
      <Link href="/create/portfolio">
        <a className="link">Portfolio (Alpha)</a>
      </Link>
      <style jsx>{`
        .link {
          text-align: center;
          font-size: 32px;
          text-transform: uppercase;
          padding: 10px 20px;
          background-color: ghostwhite;
          color: black;
          display: inline-block;
          border: 3px solid black;
          margin: 10px;
        }

        .link:hover {
          background-color: black;
          color: ghostwhite;
          text-decoration: none;
        }
      `}</style>
    </FactoryLayout>
  );
};

export default Factory;
