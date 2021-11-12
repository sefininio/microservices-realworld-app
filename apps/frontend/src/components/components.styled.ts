import styled from 'styled-components';
import { Paper, PaperTypeMap, TextField } from '@mui/material';
import { OverridableComponent } from '@mui/types';
import { NavLink } from 'react-router-dom';

const StyledPaper: OverridableComponent<PaperTypeMap> = styled(Paper)`
  &&&& {
    width: 400px;
    padding: 30px 20px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTextField = styled(TextField)`
  &&& {
    margin: 10px 0;
  }
`;

const StyledGrayLink = styled(NavLink)`
  background-color: rgba(53, 53, 53, 0.2);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  color: black;
  text-decoration: unset;
`;

const StyledButtonBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;


export { StyledPaper, StyledTextField, StyledGrayLink, StyledButtonBar };
