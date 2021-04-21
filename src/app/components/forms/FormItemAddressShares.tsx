import React from 'react';

const FormItemAddressShares = ({
  label,
  description,
  addresses,
  shares,
  setShares
}: {
  label: string;
  description: string;
  addresses: string[];
  shares: number[];
  setShares: (shares: number[]) => void;
}) => {
  const setSharesForIndex = (value: string, index: number) => {
    const _shares = [...shares];
    _shares[index] = parseInt(value) || 1;
    setShares(_shares);
  };
  return (
    <>
      <label>{label}</label>
      <div className="description">{description}</div>

      <div className="addresses">
        {addresses.map((address, i) => (
          <div
            className="address"
            key={address}
            style={{
              backgroundColor: `#${address.slice(-6)}33`
            }}
          >
            <div className="full-address">{address}</div>
            <div className="shares">
              <input
                type="number"
                step={1}
                min={1}
                value={shares[i] || 0}
                onChange={e => setSharesForIndex(e.target.value, i)}
              />
            </div>
          </div>
        ))}
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
          width: 50px;
          text-align: center;
        }
        .address {
          padding: 10px;
          border-radius: 3px;
          margin-bottom: 10px;
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

export default FormItemAddressShares;
