import React, { useState } from 'react';
import { validateETH } from '@app/features/validators';

const FormItemAddresses = ({
  label,
  description,
  addresses,
  setAddresses
}: {
  label: string;
  description: string;
  addresses: string[];
  setAddresses: (addresses: string[]) => void;
}) => {
  const [newAddress, setNewAddress] = useState('');
  const addAddress = () => {
    if (!validateETH(newAddress)) return;

    setAddresses([...addresses.filter(a => a != newAddress), newAddress]);
    setNewAddress('');
  };
  const removeAddress = (address: string) => {
    setAddresses(addresses.filter(a => a != address));
  };

  return (
    <>
      <label>{label}</label>
      <div className="description">{description}</div>

      <div className="addresses">
        {addresses.map(address => (
          <div
            className="address"
            key={address}
            style={{
              backgroundColor: `#${address.slice(-6)}33`
            }}
          >
            <div className="full-address">{address}</div>
            <button onClick={() => removeAddress(address)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="new-address">
        <input
          type="text"
          placeholder="0x..."
          value={newAddress}
          pattern="^(0x){1}[0-9a-fA-F]{40}$"
          onChange={e => setNewAddress(e.target.value)}
        />
        <button type="button" onClick={addAddress}>
          Add
        </button>
      </div>

      <style jsx>{`
        label {
          margin-bottom: 5px;
          font-weight: 500;
          font-size: 18px;
          display: block;
        }
        .description {
          margin-bottom: 10px;
          font-size: 14px;
          color: #777;
          line-height: 1.4em;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
        input {
          padding: 5px;
          width: 100%;
          font-size: 14px;
          border-radius: 3px;
          border: 1px solid #aaa;
          outline: none;
          margin-right: 5px;
        }
        .address {
          padding: 10px;
          border-radius: 3px;
          margin-bottom: 10px;
        }
        .address,
        .new-address {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        button {
          padding: 5px 10px;
          outline: none;
          border: none;
          border-radius: 3px;
          background-color: black;
          border: 1px solid black;
          border-radius: 5px;
          font-size: 14px;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default FormItemAddresses;
