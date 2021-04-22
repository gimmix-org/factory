import React, { FormEventHandler, useState } from 'react';
import { getAddressesForChainId } from '@gimmixfactory/contracts/dist/addresses';
import { Deployer__factory } from '@gimmixfactory/contracts/dist/typechain';
import { useWallet } from '@gimmixfactory/use-wallet';
import FormItemTextInput from '@app/components/forms/FormItemTextInput';
import FormFooter from './FormFooter';

const CreatePortfolio = () => {
  const { network, provider, account } = useWallet();

  const [name, setName] = useState('');

  const [txHash, setTXHash] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>();
  const [error, setError] = useState<string>();

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
      const blockNumber = await provider.getBlockNumber();

      const tx = await deployer.createPortfolio(
        name,
        name.replace(/ /g, '').toUpperCase()
      );
      setTXHash(tx.hash);
      await tx.wait(1);
      const filter = deployer.filters.ContractDeployed(
        account,
        'Portfolio',
        null,
        null
      );

      let events = await deployer.queryFilter(filter, blockNumber);
      while (!events.length) {
        await tx.wait(1);
        events = await deployer.queryFilter(filter, blockNumber);
      }
      const event = events[0];

      const contractAddress = event.args.contractAddress;
      setContractAddress(contractAddress);

      const config = {
        template: 'portfolio',
        name: name,
        description: `The portfolio of ${name}.`,
        contractAddress,
        creatorAddress: account,
        chainId: network.chainId,
        ipfsBase: 'https://ipfs.io/ipfs/',
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
      await fetch(`${process.env.NEXT_PUBLIC_BUILD_SERVER}/build`, {
        method: 'POST',
        body: JSON.stringify({ config }),
        headers: { 'content-type': 'application/json' }
      }).then(res => res.json());
    } catch (err) {
      console.log(err);
      setError(
        err.error?.message?.replace('execution reverted: ', '') || err.message
      );
    }
  };

  return (
    <div className="page">
      <div className="page-title">Let's set up your Portfolio</div>
      <div className="create-form">
        <div className="section">
          <form onSubmit={onDeployClick}>
            <div className="form-section">
              <FormItemTextInput
                label="Set a name"
                description="This can be your name, the name of your business, the name of
                  a collection you'd like to share, etc. This will appear on your Portfolio and anywhere your NFT collection is seen."
                value={name}
                setValue={setName}
                inputProps={{
                  required: true,
                  minLength: 3,
                  placeholder: 'Enter a name for your Portfolio...',
                  disabled: !!txHash
                }}
              />
            </div>

            <FormFooter {...{ contractAddress, txHash, error }} />
          </form>
        </div>
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
          width: 100%;
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
      `}</style>
    </div>
  );
};

export default React.memo(CreatePortfolio);
