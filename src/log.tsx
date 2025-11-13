import classNames from 'classnames';
import { useEffect, useState } from 'preact/hooks';

import {
  LogMessageWithTopicColour,
  createTopicColours,
  createWriter,
  formatLog,
} from '@isos/logger';

export function Log() {
  const [logs, setLogs] = useState<LogMessageWithTopicColour[]>([]);

  useEffect(() => {
    const topicColours = createTopicColours();
    createWriter((data: string) => {
      const log = formatLog(data) as LogMessageWithTopicColour;
      log.topicColour = topicColours.get(log.topic);
      setLogs((prev) => [...prev, log]);
    });
  }, []);

  return (
    <div className={classNames('log')}>
      <h3>Log</h3>
      <div className="scroll">
        <ul>
          {logs.map((log, idx) => (
            <li key={idx}>
              <span className="time col-magenta">{log.time}</span>{' '}
              <span className={`level col-${log.levelColour}`}>
                {log.level}
              </span>{' '}
              <span className={`topic col-${log.topicColour}`}>
                {log.topic}
              </span>{' '}
              <span className="message">{log.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
