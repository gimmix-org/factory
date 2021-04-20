import useSWR from 'swr';

const useBuildStatus = (contractAddress: string) => {
  const { data } = useSWR(
    contractAddress
      ? `${process.env.NEXT_PUBLIC_BUILD_SERVER}/build?id=${contractAddress}`
      : null,
    {
      refreshInterval: 1000,
      dedupingInterval: 1000
    }
  );
  return data;
};

export default useBuildStatus;
