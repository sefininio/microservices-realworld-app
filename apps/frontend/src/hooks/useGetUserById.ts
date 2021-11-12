import { UserDto } from '@microservices-realworld-example-app/models';
import useAxios from 'axios-hooks';
import React from 'react';
import { ObjectId } from 'mongodb';
import { ConfigContext } from '../context/routesContext';

interface GetUserByIdRequest {
  id: ObjectId;
}

export const useGetUserById = ({ id }: GetUserByIdRequest) => {
  const { routesConfig: { userBaseUrl, headers } } = React.useContext(ConfigContext);

  return useAxios<UserDto>({
    url: `${userBaseUrl}/user/${id}`,
    method: 'GET',
    headers,
  });
}
