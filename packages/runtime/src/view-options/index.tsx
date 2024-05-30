import { Themes } from './themes';
import { styled } from '@linaria/react';

import { Readability } from './readability';

export function ViewOptions() {
  return (
    <Wrapper>
      <Title>Theme</Title>
      <Themes />
      <Title>Readability</Title>
      <Readability />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 calc(2rem - 15px) 2rem 2rem;
`;

const Title = styled.h3`
  margin: 2rem 0 0 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: rgb(var(--primaryColor));
`;
