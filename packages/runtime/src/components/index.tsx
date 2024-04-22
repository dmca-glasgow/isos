import classnames from 'classnames';

type SectionProps = {
  children: React.ReactNode;
};

export function Section({ children }: SectionProps) {
  // const [show, setShow] = useState(false);

  return (
    <>
      {children}
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Title) {
            return React.cloneElement<any>(child, { setShow, show });
          } else if (child.type === Content) {
            return React.cloneElement<any>(child, { show });
          }
        }
        return child;
      })} */}
    </>
  );
}

type TitleProps = {
  children: React.ReactNode;
  setShow: (fn: (current: boolean) => unknown) => unknown;
  show: boolean;
};

export function Title({ children, setShow, show }: TitleProps) {
  return (
    <h2
      className={classnames('title', { show })}
      onClick={() => setShow((prev) => !prev)}>
      {children}
    </h2>
  );
}

type ContentProps = {
  children: React.ReactNode;
  show: boolean;
};

export function Content({ children, show }: ContentProps) {
  return <div className={classnames('content', { show })}>{children}</div>;
}
