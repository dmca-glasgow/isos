import { JSX } from 'preact';

// lifted from https://github.com/bentatum/react-overflow-ellipsis
// without the hard dependency on react

type Props = {
  text: string;
  startPos?: number;
};

export function OverflowMiddle({ text, startPos = 0 }: Props) {
  let start = text.slice(0, ~~(text.length / 2));
  let end = text.slice(~~(text.length / 2));

  if (startPos) {
    start = text.slice(0, startPos);
    end = text.slice(startPos);
  }

  // Fix the ends of our string since we're using RTL
  end = `\u200e${end}\u200e`;
  start = `\u200e${start}\u200e`;

  return (
    <TruncateElement
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0px, max-content))',
      }}
      title={text}>
      <TruncateElement style={{ display: 'auto' }}>
        {start}
      </TruncateElement>
      <TruncateElement
        style={{
          textOverflow: 'ellipsis',
          direction: 'rtl',
          textAlign: 'left',
          display: 'auto',
        }}>
        {end}
      </TruncateElement>
    </TruncateElement>
  );
}

type TruncProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  style: object;
};

function TruncateElement({ children, style = {} }: TruncProps) {
  return (
    <span
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'block',
        ...style,
      }}>
      {children}
    </span>
  );
}
