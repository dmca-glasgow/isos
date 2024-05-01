import { App as Article } from '@isos/runtime';
import { styled } from '@linaria/react';

import { Header } from './header';

import './styles.scss';

export function App() {
  return (
    <StyledApp>
      <Header />
      <Article />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  /* background: black; */
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;
