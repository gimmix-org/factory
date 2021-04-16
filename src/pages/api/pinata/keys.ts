import APIHandler from '@server/middlewares/APIHandler';
import { createAPIKeys } from '@server/services/Pinata';
import { NextApiHandler } from 'next';

const api: NextApiHandler = async (req, res) => {
  const { txHash, account }: { txHash: string; account: string } = req.body;
  if (!txHash || !account) throw new Error('Invalid request.');
  const keys = await createAPIKeys(account);
  return res.json(keys);
};

export default APIHandler(api);
