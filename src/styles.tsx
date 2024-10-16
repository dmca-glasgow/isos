import { styled } from '@linaria/react';

export const Button = styled.button`
  padding: 0.7rem 1rem;
  border-radius: 0.4rem;
  background: #fff2;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s background;

  &:hover {
    background: #f50;
  }
`;
