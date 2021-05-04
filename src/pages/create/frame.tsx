import FormItemAddresses from '@app/components/forms/FormItemAddresses';
import FormItemTextInput from '@app/components/forms/FormItemTextInput';
import CreateLayout from '@app/layouts/CreateLayout';
import React, { FunctionComponent, useState } from 'react';

const CreateFramePage: FunctionComponent = () => {
  const [name, setName] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);
  const deploy = async () => {
    return {};
  };
  return (
    <CreateLayout
      title="Frame"
      version="v0.0.1"
      description="Make an auto-updating digital frame for your NFT collection. Your frame automatically pulls from the Ethereum and Matic collections associated with your address."
      deploySite={deploy}
    >
      <FormItemTextInput
        value={name}
        setValue={setName}
        label="Set a Name"
        description="This will be displayed as the title for your website in browser tabs and windows, and in the previews when shared on social media or messaging apps."
      />
      <FormItemAddresses
        addresses={addresses}
        setAddresses={setAddresses}
        label="Set address"
        description="Set your address"
        maxAddresses={1}
      />
    </CreateLayout>
  );
};

export default CreateFramePage;
