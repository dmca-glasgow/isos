import './checkbox.scss';

type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => unknown;
};

export function Checkbox(props: Props) {
  const name = props.label.toLowerCase();
  return (
    <div className="checkbox">
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
    </div>
  );
}
