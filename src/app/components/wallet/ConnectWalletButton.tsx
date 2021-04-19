import React from 'react';
import { useWallet } from '@gimmixfactory/use-wallet';
import WalletConnectProvider from '@walletconnect/web3-provider';

const ConnectWalletButton = ({ text }: { text?: string }) => {
  const { connect, account, network } = useWallet();

  const onConnectClick = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID
        }
      }
    };
    connect(providerOptions);
  };

  return (
    <>
      {!!account && !!network ? (
        <div className="account">
          <div className="network">{network.name}</div>
          <div className="address">
            {account.slice(0, 6)}...{account.slice(-4)}
          </div>
        </div>
      ) : (
        <div className="connect-wallet">
          <button type="button" onClick={onConnectClick}>
            {text || 'Connect Wallet'}
          </button>
        </div>
      )}
      <style jsx>{`
        .connect-wallet {
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
        .account {
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        .address {
          margin-left: 5px;
          padding: 5px 10px;
          background-color: white;
          border-radius: 3px;
          border: 1px solid blueviolet;
          color: blueviolet;
        }
        .network {
          background-color: blueviolet;
          border: 1px solid blueviolet;
          color: white;
          padding: 5px 10px;
          text-transform: uppercase;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
};

export default ConnectWalletButton;
