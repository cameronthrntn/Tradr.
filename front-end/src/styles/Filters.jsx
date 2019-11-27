import styled from 'styled-components';
import { SignUpButton } from './Forms';

const Filters = styled.form`
  margin-left: 1vw;
  margin-bottom: 10px;
  width: 98vw;
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;
const FilterItem = styled.div`
  width: 22%;
  border-bottom: 2px solid ${props => props.theme.trader};
`;
const FilterInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  background: none;
  border: none;
`;

const FilterSelect = styled.select`
  width: 100%;
  background: none;
  font-size: 1.2rem;
  border: none;
  height: 100%;
`;

const FilterLabel = styled.label`
  height: 100%;
`;

const FilterButton = styled(SignUpButton)`
  width: 10%;
  background: ${props => props.theme.trader};
  color: white;
  font-weight: bold;
  margin: 0;
  font-size: 1.2rem;
  &:hover {
    background: ${props => props.theme.trader_dark};
  }
`;

export { Filters, FilterLabel, FilterItem, FilterInput, FilterSelect, FilterButton };
