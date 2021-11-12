import { Button, ButtonProps } from '@mui/material';
import styled from 'styled-components';
import { StyledButtonBar } from '../../components/components.styled';

const StyledHome = styled.div``;

const StyledTabSelector = styled(StyledButtonBar)`
  justify-content: flex-start;
`;

const StyledTabContent = styled.div`
  margin: 8px;
`;

type StyledTabButtonProps = ButtonProps & { selected?: boolean };

const StyledTabButton = styled(Button)`
  ${(props: StyledTabButtonProps) =>
    props.selected
      ? 'background-color: rgba(25, 118, 209, 0.4); color: white'
      : ''};

  &:hover {
    ${(props: StyledTabButtonProps) =>
      props.selected
        ? 'background-color: rgba(25, 118, 209, 0.4); color: white'
        : ''};
  }
` as React.ComponentType<StyledTabButtonProps>;

export { StyledHome, StyledTabContent, StyledTabSelector, StyledTabButton };
