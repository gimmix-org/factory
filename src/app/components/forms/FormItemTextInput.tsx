import React from 'react';

const FormItemTextInput = ({
  label,
  description,
  value,
  setValue,
  inputProps
}: {
  label: string;
  description: string;
  value: any;
  setValue: (value: any) => void;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}) => {
  return (
    <div className="form-item">
      <label>{label}</label>
      <div className="label-description">{description}</div>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        {...inputProps}
      />
      <style jsx>{`
        .form-item {
          margin-bottom: 10px;
        }
        label {
          margin-bottom: 5px;
          font-weight: 500;
          font-size: 18px;
          display: block;
        }
        .label-description {
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
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default FormItemTextInput;
