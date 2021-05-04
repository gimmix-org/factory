import FormFooter from '@app/components/create/FormFooter';
import { ContractTransaction } from '@ethersproject/contracts';
import { getAddressesForChainId } from '@gimmixfactory/contracts/dist/addresses';
import {
  Deployer,
  Deployer__factory
} from '@gimmixfactory/contracts/dist/typechain';
import { useWallet } from '@gimmixfactory/use-wallet';
import React, { FormEventHandler, ReactNode, useState } from 'react';

const CreateLayout = ({
  title,
  version,
  description,
  children,
  preview,
  deployContract,
  deploySite
}: {
  title: string;
  version: string;
  description: string;
  children: ReactNode;
  preview?: ReactNode;
  deployContract?: (deployer: Deployer) => Promise<ContractTransaction>;
  deploySite?: () => Promise<Record<string, string | number>>;
}) => {
  const { network, provider, account } = useWallet();
  const [txHash, setTXHash] = useState<string>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [error, setError] = useState<string>();

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();
    let _contractAddress;
    if (deployContract) {
      if (!network || !provider || !account) return;
      const chainAddresses = getAddressesForChainId(network.chainId);
      if (!chainAddresses) return;
      setError(undefined);

      const deployer = Deployer__factory.connect(
        chainAddresses.deployer,
        provider.getSigner()
      );

      const tx = await deployContract(deployer);

      const blockNumber = await provider.getBlockNumber();
      setTXHash(tx.hash);
      await tx.wait(1);

      // Get contract address from event
      const filter = deployer.filters.ContractDeployed(
        account,
        'Bank',
        null,
        null
      );
      let events = await deployer.queryFilter(filter, blockNumber - 1);
      let i = 1;
      while (!events.length) {
        i++;
        await tx.wait(i);
        events = await deployer.queryFilter(filter, blockNumber - 1);
      }

      const event = events[0];
      _contractAddress = event.args.contractAddress;
      await setContractAddress(_contractAddress);
    }
    if (deploySite) {
      // Create config and send to builder
      const config = await deploySite();
      if (_contractAddress) config.contractAddress = _contractAddress;
      if (account) config.creatorAddress = account;
      if (network) config.chainId = network.chainId;
      if (network)
        config.rpcUrl =
          network.chainId == 4
            ? (process.env.NEXT_PUBLIC_RPC_4 as string)
            : network.chainId == 5
            ? (process.env.NEXT_PUBLIC_RPC_5 as string)
            : network.chainId == 80001
            ? (process.env.NEXT_PUBLIC_RPC_80001 as string)
            : '';
      await fetch(`${process.env.NEXT_PUBLIC_BUILD_SERVER}/build`, {
        method: 'POST',
        body: JSON.stringify({ config }),
        headers: { 'content-type': 'application/json' }
      }).then(res => res.json());
    }
  };

  return (
    <div className="create-layout">
      <div className="panel">
        <div className="title">{title}</div>
        <div className="version">{version}</div>
        <div className="description">{description}</div>
        <form onSubmit={onSubmit} className="form-items">
          {children}
          <div className="footer">
            <FormFooter {...{ txHash, contractAddress, error }} />
          </div>
        </form>
      </div>
      <div className="panel">{preview}</div>
      <style jsx>{`
        .create-layout {
          display: grid;
          grid-template-columns: 3fr 3fr;
          grid-gap: 20px;
        }
        .panel {
          background-color: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        }
        .title {
          font-weight: 600;
          font-size: 42px;
          text-transform: uppercase;
          letter-spacing: -1.5px;
        }
        .version {
          color: #777;
          font-size: 14px;
          margin-bottom: 30px;
        }
        .description {
          color: #777;
          line-height: 1.5em;
          margin-bottom: 50px;
        }
        .form-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default CreateLayout;
