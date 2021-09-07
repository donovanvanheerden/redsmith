import { interfaces } from 'inversify';
import { createContext } from 'react';

export const diContext: React.Context<interfaces.Container> =
  createContext(null);
