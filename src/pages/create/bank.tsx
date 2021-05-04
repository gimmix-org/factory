import FormItemAddresses from '@app/components/forms/FormItemAddresses';
import FormItemAddressShares from '@app/components/forms/FormItemAddressShares';
import FormItemPieChart from '@app/components/forms/FormItemPieChart';
import FormItemTextInput from '@app/components/forms/FormItemTextInput';
import FormItemToggle from '@app/components/forms/FormItemToggle';
import CreateLayout from '@app/layouts/CreateLayout';
import { Deployer } from '@gimmixfactory/contracts/dist/typechain';
import { useWallet } from '@gimmixfactory/use-wallet';
import React, { useEffect, useState } from 'react';

const CreateBankPage = () => {
  const { account } = useWallet();

  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);
  const [shares, setShares] = useState<number[]>([]);
  const [isPrivate, setPrivate] = useState(false);

  // This effect keeps the shares array in sync with the addresses array. New addresses are assigned 1 share by default.
  useEffect(() => {
    if (shares.length < addresses.length) setShares([...shares, 1]);
    else if (shares.length < addresses.length)
      setShares(shares.slice(0, shares.length - 1));
  }, [addresses]);

  const deployContract = async (deployer: Deployer) => {
    const fee = await deployer.deployFee();
    const tx = await deployer.createBank(name, addresses, shares, {
      value: fee
    });
    return tx;
  };

  const deploySite = async () => {
    const config = {
      template: 'bank',
      name: name
    };
    return config;
  };

  return (
    <CreateLayout
      title="Bank"
      version="v0.0.1"
      description="Create a shared bank for a group with personalized splits. All funds sent to this address will be split accordingly, and those funds can be withdrawn in just one-click by any member of the bank."
      children={
        <>
          <FormItemTextInput
            label="Set a name"
            description="This will be displayed on your site so it's easy to figure out which Bank it is, but won't appear in transactions or anywhere else."
            value={name}
            setValue={setName}
            inputProps={{
              required: true,
              minLength: 3,
              placeholder: 'Enter a name for your Bank...'
            }}
          />
          <FormItemAddresses
            label="Set addresses to include"
            description={`Add the addresses you'd like to share this bank with.${
              account
                ? ` Your own address has been added by default but can be removed.`
                : ''
            }`}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <FormItemAddressShares
            label="Set shares for each address"
            description={`Set the shares you'd like to assign to each address. By default, each address is assigned 1 share for an equal split across all address.`}
            addresses={addresses}
            shares={shares}
            setShares={setShares}
          />
          <FormItemToggle
            label="Make bank transfers private"
            description="If enabled, you won't be able to view bank activity until after you log in. This data is still public and can be found elsewhere, but it'll be much less convenient if you enable this option."
            state={isPrivate}
            toggleState={() => setPrivate(p => !p)}
          />
        </>
      }
      preview={
        <>
          <FormItemPieChart
            label="Preview splits"
            description="Your configured shares result in the following splits. Please confirm this is correct before deploying, as it cannot be changed later."
            data={addresses.map((address, i) => ({
              title: `${address.slice(0, 6)}...${address.slice(-4)}`,
              value: shares[i],
              color: `#${address.slice(-6)}33`
            }))}
          />
        </>
      }
      deployContract={deployContract}
      deploySite={deploySite}
    />
  );
};

export default CreateBankPage;
