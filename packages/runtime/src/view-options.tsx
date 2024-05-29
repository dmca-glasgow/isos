import { styled } from '@linaria/react';

export function ViewOptions() {
  return (
    <Wrapper>
      <Title>Theme</Title>
      <ThemeList>
        <ThemeItem name="light" />
      </ThemeList>
    </Wrapper>
  );
}

type ThemeProps = {
  name: string
}

function ThemeItem({name}: Props) {

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

const ThemeList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  padding: 1rem 0;
`;

const ThemeItem = styled.li`
  list-style: none;
  padding: 0.75rem 0.5rem 0.5rem;
  height: 4.5rem;
  border-radius: 0.3rem;
  line-height: 1.4;
  cursor: pointer;
`;
