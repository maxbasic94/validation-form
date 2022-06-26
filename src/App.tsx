import React from 'react';
import './App.sass';
import { ValidationForm } from './components/ValidationForm/ValidationForm';

export const App: React.FC = (): JSX.Element => {
  return (
    <div className="Application-Container">
      <ValidationForm />
    </div>
  );
};
