import FormItemTextInput from '@app/components/forms/FormItemTextInput';
import CreateLayout from '@app/layouts/CreateLayout';
import React, { FunctionComponent, useState } from 'react';

const CreateCollectionPage: FunctionComponent = () => {
  const [name, setName] = useState('');

  const deploy = async () => {
    return {};
  };
  return (
    <CreateLayout
      title="Collection"
      version="v0.0.1"
      description="Create an auto-updating website for your NFT collection..."
      deploySite={deploy}
    >
      <FormItemTextInput
        value={name}
        setValue={setName}
        label="Set a Name"
        description="This will be displayed as the title for your website in browser tabs and windows, and in the previews when shared on social media or messaging apps."
      />
    </CreateLayout>
  );
};

export default CreateCollectionPage;
