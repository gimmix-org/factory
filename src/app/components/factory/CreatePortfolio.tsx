import React, { FormEventHandler, FunctionComponent, useState } from 'react';
import Addresses from '@gimmixfactory/contracts/dist/addresses';
import { Deployer__factory } from '@gimmixfactory/contracts/dist/typechain';
import { useWallet } from '@gimmixfactory/use-wallet';

const CreatePortfolio: FunctionComponent = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState<string>();
  const { network, provider, account } = useWallet();
  const [contractAddress, setContractAddress] = useState<string>();
  const [siteBuilt, setSiteBuilt] = useState(false);
  const [showAdvanced, _setShowAdvanced] = useState(false);

  const onDeployClick: FormEventHandler = async e => {
    e.preventDefault();
    if (
      !network?.name ||
      !Addresses[network?.name.toLowerCase()] ||
      !provider ||
      !account
    )
      return;

    setError(undefined);
    const deployer = Deployer__factory.connect(
      Addresses[network.name.toLowerCase()].deployer,
      provider.getSigner()
    );
    try {
      const tx = await deployer.createPortfolio(
        name,
        symbol.length
          ? symbol.toUpperCase()
          : name.replace(/ /g, '').toUpperCase()
      );
      console.log(tx);
      await tx.wait(1);
      const contractAddress = await deployer.contracts(account);
      setContractAddress(contractAddress);
      const config = {
        template: 'portfolio',
        name: name,
        description: `The portfolio of ${name}.`,
        url: 'http://localhost:3000',
        contractAddress,
        creatorAddress: account,
        chainId: network.chainId,
        ipfsBase: 'https://factory-ipfs.gimmix.org/ipfs/',
        ipfsUploadFile: 'https://factory-ipfs.gimmix.org/upload/',
        ipfsUploadJson: 'https://factory-ipfs.gimmix.org/uploadJSON/',
        rpcUrl:
          network.chainId == 4
            ? process.env.NEXT_PUBLIC_RPC_4
            : network.chainId == 5
            ? process.env.NEXT_PUBLIC_RPC_5
            : network.chainId == 80001
            ? process.env.NEXT_PUBLIC_RPC_80001
            : null
      };
      const { built } = await fetch('/api/build', {
        method: 'POST',
        body: JSON.stringify({ config }),
        headers: { 'content-type': 'application/json' }
      }).then(res => res.json());
      console.log({ built });
      setSiteBuilt(built);
    } catch (err) {
      setError(
        err.error?.message?.replace('execution reverted: ', '') || err.message
      );
    }
  };

  return (
    <div className="page">
      <div className="page-title">Customize Your Portfolio</div>
      <div className="create-form">
        <div className="section">
          <form onSubmit={onDeployClick}>
            <div className="form-section">
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
              {showAdvanced && (
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
              )}
            </div>

            {contractAddress && (
              <div className="form-section">
                <h3>Your Website</h3>
                {!siteBuilt ? (
                  <>Building...</>
                ) : (
                  <>
                    <a
                      href={`https://factory-sites.gimmix.org/api/build?contractAddress=${contractAddress}`}
                      target="_blank"
                    >
                      Download
                    </a>
                  </>
                )}
              </div>
            )}

            <button disabled={!network} type="submit">
              Deploy
            </button>
          </form>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          height: 100%;
          align-items: center;
          justify-content: center;
        }
        .page-title {
          font-weight: 500;
          font-size: 24px;
          padding: 10px;
          margin-bottom: 10px;
        }

        .create-form {
          padding: 20px;
          min-width: 400px;
          border: 3px solid black;
        }
        .title {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .form-section {
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
        input {
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default React.memo(CreatePortfolio);
