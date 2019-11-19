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
`;

const FilterSelect = styled.select`
  width: 100%;
`;

const FilterButton = styled.button`
  margin-left: 40vw;
  width: 20vw;
  height: 20px;
`

export { Filters, FilterItem, FilterInput, FilterSelect, FilterButton };
