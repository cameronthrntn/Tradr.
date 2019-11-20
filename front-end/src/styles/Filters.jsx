import styled from 'styled-components';

const Filters = styled.form`
  width: 98vw;
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const FilterItem = styled.div`
  width: 25%;
`;
const FilterInput = styled.input`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.orange};
  font-size: 1.5rem;
  background: none;
  border: none;
`;

const FilterSelect = styled.select`
  width: 100%;
  background: none;
  border: none;
`;

const FilterButton = styled.button`
  margin-left: 40vw;
  width: 20vw;
  height: 20px;
`

export { Filters, FilterItem, FilterInput, FilterSelect, FilterButton };
