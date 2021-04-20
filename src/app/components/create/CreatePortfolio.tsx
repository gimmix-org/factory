import React, { FormEventHandler, useState } from 'react';
import {
  getAddressesForChainId,
  SupportedChainIds
} from '@gimmixfactory/contracts/dist/addresses';
import { Deployer__factory } from '@gimmixfactory/contracts/dist/typechain';
import { useWallet } from '@gimmixfactory/use-wallet';
import ConnectWalletButton from '@app/components/wallet/ConnectWalletButton';
import FormItemTextInput from '@app/components/forms/FormItemTextInput';
import BuildStatus from '../BuildStatus';

const CreatePortfolio = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState<string>();
  const { network, provider, account } = useWallet();
  const [txHash, setTXHash] = useState<string>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [showAdvanced, _setShowAdvanced] = useState(false);
  const [_job, setJob] = useState<any>();

  const onDeployClick: FormEventHandler = async e => {
    e.preventDefault();
    if (!network || !provider || !account) return;
    const addresses = getAddressesForChainId(network.chainId);
    if (!addresses) return;
    setError(undefined);
    const deployer = Deployer__factory.connect(
      addresses.deployer,
      provider.getSigner()
    );
    try {
      const tx = await deployer.createPortfolio(
        name,
        symbol.length
          ? symbol.toUpperCase()
          : name.replace(/ /g, '').toUpperCase()
      );
      setTXHash(tx.hash);

      console.log(tx);
      await tx.wait(1);
      const contractAddress = await deployer.contracts(account);
      setContractAddress(contractAddress);

      const config = {
        template: 'portfolio',
        name: name,
        description: `The portfolio of ${name}.`,
        contractAddress,
        creatorAddress: account,
        chainId: network.chainId,
        ipfsBase: 'https://cloudflare-ipfs.com/ipfs/',
        ipfsUploadFile: `${process.env.NEXT_PUBLIC_IPFS_SERVER}/upload/`,
        ipfsUploadJson: `${process.env.NEXT_PUBLIC_IPFS_SERVER}/uploadJSON/`,
        rpcUrl:
          network.chainId == 4
            ? process.env.NEXT_PUBLIC_RPC_4
            : network.chainId == 5
            ? process.env.NEXT_PUBLIC_RPC_5
            : network.chainId == 80001
            ? process.env.NEXT_PUBLIC_RPC_80001
            : null
      };
      const job = await fetch(`${process.env.NEXT_PUBLIC_BUILD_SERVER}/build`, {
        method: 'POST',
        body: JSON.stringify({ config }),
        headers: { 'content-type': 'application/json' }
      }).then(res => res.json());
      setJob(job);
      // const ipfsInfo = await fetch(
      //   `${
      //     process.env.NEXT_PUBLIC_IPFS_SERVER
      //   }/uploadSite?buildURL=${encodeURIComponent(
      //     `${process.env.NEXT_PUBLIC_BUILD_SERVER}/build?contractAddress=${contractAddress}&template=portfolio`
      //   )}`
      // ).then(res => res.json());
      // console.log({ ipfsInfo });
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
              <FormItemTextInput
                label="Set a Name"
                description="This can be your name, the name of your business, the name of
                  a collection you'd like to share, etc. This will appear on your Portfolio and anywhere your NFT collection is seen."
                value={name}
                setValue={setName}
                inputProps={{
                  required: true,
                  minLength: 3,
                  placeholder: 'Enter a name for your portfolio...'
                }}
              />
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

            {contractAddress ? (
              <div className="form-section">
                <>Contract: {contractAddress}</>
                <BuildStatus contractAddress={contractAddress} />
              </div>
            ) : txHash ? (
              <>Deploying.... (TX Hash: {txHash})</>
            ) : (
              <>
                {!network ? (
                  <ConnectWalletButton text={`Connect Your Wallet to Deploy`} />
                ) : SupportedChainIds.includes(network.chainId) ? (
                  <button type="submit">Deploy to {network.name}</button>
                ) : (
                  <div className="wrong-network">
                    Switch to a supported network (Rinkeby, Goerli, Mumbai) in
                    your Wallet.
                  </div>
                )}
              </>
            )}
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
          max-width: 640px;
          border: 3px solid black;
        }
        .title {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .form-section {
          margin-bottom: 20px;
        }
        .error {
          background-color: red;
          color: white;
          padding: 5px;
          font-size: 14px;
          text-align: center;
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
      `}</style>
    </div>
  );
};

export default React.memo(CreatePortfolio);
