import React from 'react';
import { StyledPublish } from './publish.styled';

/* eslint-disable-next-line */
export interface PublishProps {}

export function Publish(props: PublishProps) {
  return (
    <StyledPublish>
      <h1>Welcome to publish!</h1>
    </StyledPublish>
  );
}

export default Publish;
