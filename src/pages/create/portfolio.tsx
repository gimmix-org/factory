import CreatePortfolio from '@app/components/factory/CreatePortfolio';
import FactoryLayout from '@app/layouts/FactoryLayout';
import React, { FunctionComponent } from 'react';

const Contract: FunctionComponent = () => {
  return (
    <FactoryLayout>
      <CreatePortfolio />
    </FactoryLayout>
  );
};

export default Contract;
