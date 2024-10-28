import { styled } from '@linaria/react';
import classNames from 'classnames';

import { Readability } from '../constants/readability';

type Props = Readability & {
  value: number;
  onChange: (value: number) => unknown;
};

export function RangeInput(props: Props) {
  const name = props.label.toLowerCase();
  return (
    <Wrapper>
      <label for={name}>{props.label}</label>
      <input
        type="range"
        id={name}
        name={name}
        min={props.min}
        max={props.max}
        step={props.increment}
        value={props.value}
        defaultValue={String(props.defaultValue)}
        onChange={(e) => {
          props.onChange(Number(e.currentTarget.value));
        }}
      />
      <button
        className={classNames({
          disabled: props.value === props.defaultValue,
        })}
        onClick={(e) => {
          e.preventDefault();
          props.onChange(props.defaultValue);
        }}>
        Reset
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2em 0;

  label {
    font-size: 0.9em;
    width: 45%;
    flex: 0 0 auto;
  }

  input[type='range'] {
    flex: 1;
  }

  button {
    flex: 0 0 auto;
    margin-left: 1em;
    width: 18%;

    border-radius: 0.4em;
    font-weight: 800;

    border: 0;
    box-shadow: inset 0 0 0 2px var(--errorColor);
    background: var(--errorColor);
    color: white;
    cursor: pointer;

    &.disabled {
      box-shadow: inset 0 0 0 2px rgba(var(--primaryColor), 0.1);
      background: transparent;
      color: var(--textColor);
      font-weight: 400;
    }
  }
`;
