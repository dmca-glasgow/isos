import { styled } from '@linaria/react';

import CrestSvg from '../assets/crest.svg';
import UofGSvg from '../assets/uofg.svg';

export function Logo() {
  return (
    <StyledLogo>
      <Wrapper>
        <Crest />
        <UofG />
      </Wrapper>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  position: relative;
  padding: 1.5rem 2rem 2rem;
`;

const Wrapper = styled.div`
  .logo-wrapper {
    display: flex;
    align-items: center;
    width: 70%;
  }
`;

const Crest = styled(CrestSvg)`
  width: 25%;
  margin-right: 10%;

  path.dark-only {
    opacity: 0;
    html.theme-dark &,
    html.theme-yellow-on-black & {
      opacity: 1;
    }
  }
`;

const UofG = styled(UofGSvg)`
  width: 60%;

  path {
    html.theme-dark &,
    html.theme-yellow-on-black & {
      fill: white;
    }
  }
`;
