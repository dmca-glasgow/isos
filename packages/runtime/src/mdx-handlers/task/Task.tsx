import classNames from 'classnames';
import { toChildArray } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { useState } from 'preact/hooks';

export function Task(props: HTMLAttributes<HTMLDivElement>) {
  const [show, setShow] = useState(false);
  const id = (props.id || '') as string;
  const childArray = toChildArray(props.children);

  const answerIdx = childArray.findIndex((o) => {
    // @ts-expect-error
    const props = o.props || {};
    const className = props.class || '';
    return className.includes('answer');
  });

  if (answerIdx === -1) {
    return <div {...props} />;
  }

  const taskChildren = [
    ...childArray.slice(0, answerIdx),
    ...childArray.slice(answerIdx + 1),
  ];

  const answer = childArray[answerIdx];
  // @ts-expect-error
  const answerProps = answer.props || {};
  const answerChildren = answerProps.children || [];

  function showAnswerToggle() {
    setShow(!show);
  }

  return (
    <div className={classNames('boxout', 'task')}>
      <span className="type">Task {id.replace('task-', '')}</span>
      {taskChildren}
      <span className="answer-trigger" onClick={showAnswerToggle}>
        {show ? 'Hide' : 'Show'} answer
      </span>
      <div className={classNames('answer-reveal', { show })}>
        {answerChildren}
      </div>
    </div>
  );
}
