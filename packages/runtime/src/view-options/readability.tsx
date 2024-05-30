import { styled } from '@linaria/react';
import classNames from 'classnames';
import { useContext } from 'preact/hooks';

import * as readability from '../constants/readability';
import { ViewOptionsContext } from '../providers/view-options-provider';

export function Readability() {
  const {
    fontSize,
    setFontSize,
    lineSpacing,
    setLineSpacing,
    letterSpacing,
    setLetterSpacing,
    lineWidth,
    setLineWidth,
  } = useContext(ViewOptionsContext);

  return (
    <ReadabilityList>
      <Item
        {...readability.fontSize}
        value={fontSize}
        setValue={setFontSize}
      />
      <Item
        {...readability.lineSpacing}
        value={lineSpacing}
        setValue={setLineSpacing}
      />
      <Item
        {...readability.letterSpacing}
        value={letterSpacing}
        setValue={setLetterSpacing}
      />
      <Item
        {...readability.lineWidth}
        value={lineWidth}
        setValue={setLineWidth}
      />
    </ReadabilityList>
  );
}

type Props = readability.Readability & {
  value: number;
  setValue: (newValue: number) => unknown;
};

function Item({
  label,
  defaultValue,
  min,
  max,
  increment,
  value,
  setValue,
}: Props) {
  return (
    <ReadabilityItem>
      <Label>{label}</Label>
      <Actions>
        <Button
          className={classNames({ disabled: value <= min })}
          onClick={() => setValue(Math.max(min, value - increment))}>
          -
        </Button>
        <Button
          className={classNames({ disabled: value >= max })}
          onClick={() => setValue(Math.min(max, value + increment))}>
          +
        </Button>
        <Reset
          className={classNames({ disabled: value === defaultValue })}
          onClick={() => setValue(defaultValue)}>
          Reset
        </Reset>
      </Actions>
    </ReadabilityItem>
  );
}

const ReadabilityList = styled.ul`
  padding: 1rem 0;
`;

const ReadabilityItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  flex: 1;
`;

const Actions = styled.span``;

const Button = styled.span`
  display: inline-block;
  width: 1.5rem;
  line-height: 1.1rem;
  box-sizing: border-box;
  text-align: center;
  border: 2px solid rgba(var(--primaryColor), 0.2);
  border-radius: 0.2rem;
  padding: 0 0.3rem 0.1rem;
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Reset = styled(Button)`
  width: auto;
  border-color: transparent;
  &:not(.disabled) {
    background: var(--errorColor);
    color: white;
  }
  &.disabled {
    background: rgba(var(--primaryColor), 0.1);
  }
`;
