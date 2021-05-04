import React from 'react';

const FormItemToggle = ({
  label,
  description,
  state,
  toggleState
}: {
  label: string;
  description: string;
  state: boolean;
  toggleState: () => void;
}) => {
  return (
    <div className="form-item">
      <label>{label}</label>
      <div className="description">{description}</div>
      <div className="toggle" onClick={toggleState}>
        {state ? 'ON' : 'OFF'}
      </div>
      <style jsx>{`
        .toggle {
          display: inline-block;
          border-radius: 3px;
          cursor: pointer;
          background-color: black;
          color: white;
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default FormItemToggle;
