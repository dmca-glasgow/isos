import { JSX } from 'preact/jsx-runtime';

type Props = JSX.SVGAttributes<SVGSVGElement> & {
  //
};

export function IconDefs(props: Props) {
  return <Icon {...props} />;
}

export function HamburgerIcon(props: Props) {
  return <Icon {...props} />;
}

function Icon(props: Props) {
  return <svg {...props}></svg>;
}
