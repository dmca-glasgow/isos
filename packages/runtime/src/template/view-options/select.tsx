import { styled } from '@linaria/react';
import { Signal } from '@preact/signals';
import startCase from 'lodash.startcase';

type Props = {
  name: string;
  label: string;
  value: Signal<string>;
  options: Readonly<string[]>;
  onChange: (value: string) => unknown;
};

export function Select({ name, label, value, options, onChange }: Props) {
  return (
    <SelectWrapper>
      <Label for={name}>{label}</Label>
      <StyledSelect>
        <select
          id={name}
          name={name}
          value={value.value}
          onChange={(e) => {
            onChange(e.currentTarget.value);
          }}>
          {options.map((value) => (
            <option key={value} value={value}>
              {startCase(value)}
            </option>
          ))}
        </select>
      </StyledSelect>
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 0;
`;

const Label = styled.label`
  font-size: 0.9em;
  /* line-height: 2; */
  width: 7em;
  flex: 0 0 auto;
`;

const StyledSelect = styled.div`
  flex: 1;
  position: relative;

  /* &:after {
    --size: 0.35em;
    content: '';
    position: absolute;
    pointer-events: none;
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid var(--textColor);
    top: 42%;
    right: 1em;
  } */

  select {
    --scale: 1.3;
    width: calc(100% / var(--scale));
    padding: 0.15em 0.2em 0.1em;
    transform: scale(var(--scale));
    transform-origin: left center;
    position: relative;
    bottom: 0.1em;
    border-radius: 0.4em;
    /* appearance: none;
    font-size: 0.9em;
    width: 100%;
    background: var(--sidebarBg);
    border: 2px solid var(--textColor);
    border-radius: 1em;
    color: var(--textColor);
    cursor: pointer; */
  }
`;
