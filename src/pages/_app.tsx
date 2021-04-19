import type { AppProps } from 'next/app';
import MainLayout from '@app/layouts/MainLayout';

const Factory = ({ Component, pageProps }: AppProps) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default Factory;
