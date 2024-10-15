import { styled } from '@linaria/react';

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => unknown;
};

export function Checkbox(props: Props) {
  const name = props.label.toLowerCase();
  return (
    <Wrapper>
      <label for={name}>{props.label}</label>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={props.value}
        onChange={(e) => {
          props.onChange(e.currentTarget.checked);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: middle;

  label {
    font-size: 0.9em;
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
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
    }
  }
`;
