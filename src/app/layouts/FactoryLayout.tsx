import React, { FunctionComponent } from 'react';

const FactoryLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="factory">
      <div className="main">{children}</div>
      <style jsx>{`
        .factory {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .main {
          flex: 1 1 auto;
          display: flex;
          width: 100%;
          max-width: 800px;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
        }
        .header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          justify-content: center;
        }
        .title {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default FactoryLayout;
