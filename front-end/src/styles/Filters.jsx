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
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const FilterItem = styled.div`
  width: 22%;
  border-bottom: 2px solid ${props => props.theme.trader};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    align-items: start;
  }
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
  width: 180px;
  background: ${props => props.theme.trader};
  color: white;
  font-weight: bold;
  margin: 0;
  font-size: 1.2rem;
  &:hover {
    background: ${props => props.theme.trader_dark};
  }
  @media (max-width: 768px) {
    margin: 10px;
  }
`;

export {
  Filters,
  FilterLabel,
  FilterItem,
  FilterInput,
  FilterSelect,
  FilterButton
};
