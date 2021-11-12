import { ArticleDto } from '@microservices-realworld-example-app/models';
import useAxios from 'axios-hooks';
import React from 'react';
import { ConfigContext } from '../context/routesContext';

export const useGetArticleFeed = () => {
  const { routesConfig: { articleBaseUrl, headers } } = React.useContext(ConfigContext);

  return useAxios<ArticleDto[]>({
    url: `${articleBaseUrl}/articles/feed`,
    method: 'GET',
    headers,
  });
}