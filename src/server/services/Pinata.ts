export const createAPIKeys = async (keyName: string) => {
  const payload = {
    keyName,
    maxUses: 100,
    permissions: {
      endpoints: {
        data: {
          pinList: true,
          userPinnedDataTotal: true
        },
        pinning: {
          pinByHash: true,
          pinFileToIPFS: true,
          pinJSONToIPFS: true
        }
      }
    }
  };
  const apiKeys = await fetch('https://api.pinata.cloud/users/generateApiKey', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PINATA_JWT}`
    }
  }).then(res => res.json());
  return apiKeys;
};
