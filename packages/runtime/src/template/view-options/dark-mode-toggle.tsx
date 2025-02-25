import { styled } from '@linaria/react';
import { Signal } from '@preact/signals';

type Props = {
  value: Signal<'light' | 'dark'>;
  onChange: (value: 'light' | 'dark') => unknown;
};

export function DarkModeToggle({ value, onChange }: Props) {
  return (
    <DarkModeWrapper>
      <Label>
        <Input
          type="radio"
          name="theme"
          value="light"
          checked={value.value === 'light'}
          onChange={() => onChange('light')}
        />
        <Span>Light</Span>
      </Label>
      <Label>
        <Input
          type="radio"
          name="theme"
          value="dark"
          checked={value.value === 'dark'}
          onChange={() => onChange('dark')}
        />
        <Span>Dark</Span>
      </Label>
    </DarkModeWrapper>
  );
}

const DarkModeWrapper = styled.div`
  display: flex;
  border: 1px solid var(--textColor);
  box-shadow: inset 0 0 0 1px var(--textColor);
  border-radius: 1em;
  margin: 0.2em 0 0.8em 0;
  overflow: hidden;
`;

const Label = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3em 0;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;

  &:has(input:checked) {
    background: var(--textColor);
    color: var(--bg);
  }
`;

const Input = styled.input`
  display: none;
`;

const Span = styled.span``;
