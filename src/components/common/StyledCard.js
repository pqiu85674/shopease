import styled from "styled-components";

const StyledCard = styled.div`
  width: 100%;
  padding-top: 100%;
  background: url(${(props) => props.src}) scroll no-repeat center / cover;
`;

export default StyledCard;
