import React, { FormEventHandler, FunctionComponent, useState } from 'react';
import Addresses from '@gimmixfactory/contracts/dist/addresses';
import { Deployer__factory } from '@gimmixfactory/contracts/dist/typechain';
import { useWallet } from '@gimmixfactory/use-wallet';

const CreatePortfolio: FunctionComponent = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState<string>();
  const { account, network, provider } = useWallet();

  const onDeployClick: FormEventHandler = async e => {
    e.preventDefault();
    if (!network?.name || !Addresses[network?.name.toLowerCase()] || !provider)
      return;
    setError(undefined);
    const deployer = Deployer__factory.connect(
      Addresses[network.name.toLowerCase()].deployer,
      provider.getSigner()
    );
    try {
      const tx = await deployer.createERC721(name, symbol.toUpperCase());
      console.log(tx);
      const keys = await fetch('/api/pinata/keys', {
        method: 'post',
        body: JSON.stringify({ txHash: tx.hash, account }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      console.log({ keys });
    } catch (err) {
      setError(
        err.error?.message?.replace('execution reverted: ', '') || err.message
      );
    }
  };

  return (
    <div className="create-contract">
      <div className="section">
        <h1>Design your Portfolio</h1>
        <form onSubmit={onDeployClick}>
          <div className="form-section">
            <h3>Smart Contract</h3>
            <div className="form-item">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name..."
                value={name}
                onChange={e => setName(e.target.value)}
                required
                minLength={3}
              />
            </div>
            <div className="form-item">
              <label>Symbol</label>
              <input
                type="text"
                placeholder="Symbol name..."
                value={symbol}
                onChange={e => setSymbol(e.target.value.toUpperCase())}
                required
                minLength={3}
              />
            </div>
          </div>
          <div className="form-section">
            <h3>Your Website</h3>
          </div>
          <div className="form-section">
            <div className="form-item">
              <button disabled={!network} type="submit">
                Deploy
              </button>
            </div>
          </div>
        </form>
      </div>
      {error && <div className="error">{error}</div>}
      <style jsx>{`
        .create-contract {
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
          padding: 20px;
          border: 2px solid black;
        }
        .title {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .form-section {
          padding: 10px;
          border: 1px solid #999;
          margin-bottom: 20px;
        }
        .form-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .error {
          background-color: red;
          color: white;
          padding: 5px;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default React.memo(CreatePortfolio);
