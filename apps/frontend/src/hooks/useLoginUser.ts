import { TokenDto } from '@microservices-realworld-example-app/models';
import useAxios from 'axios-hooks';
import React from 'react';
import { ConfigContext } from '../context/routesContext';

export const useLoginUser = () => {
  const { routesConfig: { userBaseUrl, headers } } = React.useContext(ConfigContext);

  return useAxios<TokenDto>({
    url: `${userBaseUrl}/auth/login`,
    method: 'POST',
    headers,
  }, { manual: true });
}
