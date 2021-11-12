import { UserDto } from '@microservices-realworld-example-app/models';
import useAxios from 'axios-hooks';
import React from 'react';
import { ConfigContext } from '../context/routesContext';

export const useUserDetails = () => {
  const { routesConfig: { userBaseUrl, headers } } = React.useContext(ConfigContext);

  return useAxios<UserDto>({
    url: `${userBaseUrl}/user`,
    method: 'GET',
    headers,
  }, { manual: true });
}
