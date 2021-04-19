import { NextApiHandler } from 'next';

const api: NextApiHandler = async (req, res) => {
  const { config } = req.body;
  const response = await fetch('https://factory-sites.gimmix.org/api/build', {
    method: 'POST',
    body: JSON.stringify({ config }),
    headers: { 'content-type': 'application/json' }
  }).then(res => res.text());
  console.log({ response });
  return res.json(response);
};

export default api;
