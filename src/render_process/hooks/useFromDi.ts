import { interfaces } from 'inversify';
import { useContext } from 'react';
import { diContext } from '../infra/diContext';
import WebIpc, { IWebIpc } from '../infra/WebIpc';

export function useFromDi<T>(
  serviceId: string | symbol | interfaces.Newable<T>
): T {
  const diContainer = useContext<interfaces.Container>(diContext);

  if (!diContainer.isBound(serviceId)) {
    throw new Error(
      `Could not inject ${serviceId.toString()} as it is currently not bound in this scope. Are you missing a Provider?`
    );
  }
  return diContainer.get<T>(serviceId);
}

export const useIpc = (): IWebIpc => useFromDi(WebIpc);
