import React, {
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState
} from 'react';
import {
  getAddressesForChainId,
  SupportedChainIds
} from '@gimmixfactory/contracts/dist/addresses';
import { Deployer__factory } from '@gimmixfactory/contracts/dist/typechain';
import { useWallet } from '@gimmixfactory/use-wallet';
import BuildStatus from '@app/components/create/BuildStatus';
import FormItemAddresses from '@app/components/forms/FormItemAddresses';
import FormItemTextInput from '@app/components/forms/FormItemTextInput';
import ConnectWalletButton from '@app/components/wallet/ConnectWalletButton';
import FormItemAddressShares from '../forms/FormItemAddressShares';
import FormItemPieChart from '../forms/FormItemPieChart';

const CreateBank: FunctionComponent = () => {
  const { network, provider, account } = useWallet();

  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);
  const [shares, setShares] = useState<number[]>([]);

  const [txHash, setTXHash] = useState<string>();
  const [contractAddress, setContractAddress] = useState<string>();
  const [buildJob, setBuildJob] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (account && addresses.length == 0) setAddresses([account]);
  }, [account]);

  useEffect(() => {
    if (shares.length < addresses.length) setShares([...shares, 1]);
    else if (shares.length < addresses.length)
      setShares(shares.slice(0, shares.length - 1));
  }, [addresses]);

  const onDeployClick: FormEventHandler = async e => {
    e.preventDefault();
    if (!network || !provider || !account) return;

    const chainAddresses = getAddressesForChainId(network.chainId);
    if (!chainAddresses) return;

    setError(undefined);

    const deployer = Deployer__factory.connect(
      chainAddresses.deployer,
      provider.getSigner()
    );

    try {
      // Run transaction and wait for one confirmation
      const blockNumber = await provider.getBlockNumber();
      const tx = await deployer.createBank(name, addresses, shares);
      setTXHash(tx.hash);
      await tx.wait(1);

      // Get contract address from event
      const filter = deployer.filters.ContractDeployed(
        account,
        'Bank',
        null,
        null
      );
      let events = await deployer.queryFilter(filter, blockNumber);
      if (!events.length) {
        await tx.wait(1);
        events = await deployer.queryFilter(filter, blockNumber);
        if (!events.length) throw new Error('Something went wrong!');
      }
      const event = events[0];
      const contractAddress = event.args.contractAddress;
      setContractAddress(contractAddress);

      // Create config and send to builder
      const config = {
        template: 'bank',
        name: name,
        contractAddress,
        creatorAddress: account,
        chainId: network.chainId,
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
      setBuildJob(job);
    } catch (err) {
      console.log(err);
      setError(
        err.error?.message?.replace('execution reverted: ', '') || err.message
      );
    }
  };

  return (
    <div className="page">
      <div className="page-title">Let's set up your Bank</div>
      <div className="create-form">
        <div className="section">
          <form onSubmit={onDeployClick}>
            <div className="form-section">
              <FormItemTextInput
                label="Set a Name"
                description="This will be displayed on your site but won't appear elsewhere."
                value={name}
                setValue={setName}
                inputProps={{
                  required: true,
                  minLength: 3,
                  placeholder: 'Enter a name for your Bank...'
                }}
              />
            </div>

            <div className="form-section">
              <FormItemAddresses
                label="Set addresses"
                description={`Add the addresses you'd like to share this bank with.${
                  account
                    ? ` Your own address has been added by default but can be removed.`
                    : ''
                }`}
                addresses={addresses}
                setAddresses={setAddresses}
              />
            </div>

            {addresses.length > 0 && (
              <div className="form-section">
                <FormItemAddressShares
                  label="Set shares"
                  description={`Set the shares you'd like to assign to each address. By default, each address is assigned 1 share for an equal split across all address.`}
                  addresses={addresses}
                  shares={shares}
                  setShares={setShares}
                />
              </div>
            )}

            {shares.length > 0 && (
              <div className="form-section">
                <FormItemPieChart
                  label="Preview splits"
                  description="Your configured shares result in the following splits. Please confirm this is correct before deploying, as it cannot be changed later."
                  data={addresses.map((address, i) => ({
                    title: `${address.slice(0, 6)}...${address.slice(-4)}`,
                    value: shares[i],
                    color: `#${address.slice(-6)}33`
                  }))}
                />
              </div>
            )}

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
                  <ConnectWalletButton />
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
          margin-bottom: 40px;
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

export default CreateBank;
