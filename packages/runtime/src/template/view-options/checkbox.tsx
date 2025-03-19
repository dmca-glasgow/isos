import { styled } from '@linaria/react';
import { FormEvent } from 'preact/compat';

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => unknown;
};

export function Checkbox(props: Props) {
  const name = props.label.toLowerCase();
  return (
    <CheckboxWrapper>
      <Input
        type="checkbox"
        id={name}
        name={name}
        checked={props.value}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          props.onChange(e.currentTarget.checked);
        }}
      />
      <Label for={name}>{props.label}</Label>
    </CheckboxWrapper>
  );
}

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: middle;
  padding: 0.4em 0;
`;

const Label = styled.label`
  font-size: 0.9em;
  /* line-height: 1; */
  flex: 1;
`;

const Input = styled.input`
  transform: scale(1.5);
  margin-right: 1em;
  /* appearance: none;
  background-color: white;
  margin: 0;
  font: inherit;
  width: 1.5em;
  height: 1.5em;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 0.4em;
  display: grid;
  place-content: center;

  &::before {
    content: '';
    width: 1.5ex;
    height: 1.5ex;
    border-radius: 0.2em;
    box-shadow: inset 1em 1em black;
    opacity: 0;
    transition: 0.2s transform;
  }

  &:checked::before {
    opacity: 1;
  } */
`;
