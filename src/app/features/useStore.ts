import create from 'zustand';

type State = {
  account?: string;
  chainId?: number;
};

const useStore = create<State>(set => ({}));

export default useStore;
