import { SupportedChainIds } from '@gimmixfactory/contracts/dist/addresses';
import { useWallet } from '@gimmixfactory/use-wallet';
import React from 'react';
import ConnectWalletButton from '../wallet/ConnectWalletButton';
import BuildStatus from './BuildStatus';

const FormFooter = ({
  contractAddress,
  txHash,
  error
}: {
  contractAddress?: string;
  txHash?: string;
  error?: string;
}) => {
  const { network } = useWallet();
  return (
    <div className="form-footer">
      {contractAddress ? (
        <div className="building">
          <div className="section">
            <div className="section-header">
              Your contract has been deployed to {contractAddress}
            </div>
            <div className="section-link">
              <a
                href={`http://rinkeby.etherscan.io/address/${contractAddress}`}
                target="_blank"
              >
                View contract on Etherscan →
              </a>
            </div>
          </div>
          <BuildStatus contractAddress={contractAddress} />
        </div>
      ) : txHash && !!network ? (
        <div className="section">
          <div className="section-header">Deploying to {network.name}...</div>
          <div className="section-link">
            <a
              href={`http://rinkeby.etherscan.io/tx/${txHash}`}
              target="_blank"
            >
              View transaction on Etherscan →
            </a>
          </div>
        </div>
      ) : (
        <>
          {!network ? (
            <ConnectWalletButton />
          ) : SupportedChainIds.includes(network.chainId) ? (
            <button type="submit">Deploy to {network.name}</button>
          ) : (
            <div className="wrong-network">
              Switch to a supported network (Rinkeby, Goerli, Mumbai) in your
              Wallet.
            </div>
          )}
        </>
      )}
      {error && <div className="error">{error}</div>}
      <style jsx>{`
        .form-footer {
          border-top: 1px solid black;
          margin: -20px;
          padding: 20px;
          margin-top: 0;
          background-color: #f1f1f1;
        }
        button {
          padding: 5px 10px;
          outline: none;
          border: none;
          border-radius: 3px;
          background-color: black;
          border-radius: 5px;
          font-size: 14px;
          color: white;
          cursor: pointer;
        }
        .error {
          margin-top: 20px;
          border-radius: 3px;
          border: 2px solid red;
          color: red;
          padding: 5px;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
        }
        .section {
          text-align: center;
          margin-bottom: 20px;
        }
        .section:last-of-type {
          margin-bottom: 0;
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
        }
      `}</style>
    </div>
  );
};

export default FormFooter;
