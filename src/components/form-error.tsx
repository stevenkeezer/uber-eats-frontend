import React from 'react';

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span role="alert" className="font-sm text-red-600">
    {errorMessage}
  </span>
);
