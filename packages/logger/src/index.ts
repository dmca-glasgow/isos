import { Message, MessageContext, ROARR, Roarr } from 'roarr';

// api:
// const log = logger('topic');
// log.info('message');

export function logger(topic: string) {
  const logger = Roarr.child({ topic });
  return logger;
}

export type LogMessage = {
  time: string;
  level: string;
  levelColour: string;
  topic: string;
  message: any;
};

export type LogMessageWithTopicColour = LogMessage & {
  topicColour: string;
};

export function createWriter(fn: (data: string) => unknown) {
  ROARR.write = fn;
}

export function createTopicColours() {
  let idx = 0;
  const map: Record<string, number> = {};
  const selection = [
    // 'red',
    // 'green',
    // 'yellow',
    'blue',
    'magenta',
    'cyan',
    'redBright',
    // 'black',
    'greenBright',
    'white',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'gray',
    'cyanBright',
    'whiteBright',
  ];
  return {
    get(topic: string) {
      if (!(topic in map)) {
        map[topic] = idx++;
      }
      const i = map[topic];
      return selection[i];
    },
  };
}

type LogContext = MessageContext & {
  logLevel: number;
  topic: string;
};

type LogData = Message<LogContext>;

export function formatLog(data: string): LogMessage {
  const json = JSON.parse(data) as LogData;
  const { topic, logLevel } = json.context;
  const { message } = json;

  const time = formatTime(json.time);
  const level = getLogLevelName(logLevel);
  const levelColour = getLevelColour(logLevel);

  return {
    time,
    level,
    levelColour,
    topic,
    message,
  };
}

function formatTime(time: number) {
  return new Date(time).toISOString().slice(11, -1);
}

function getLogLevelName(logLevel: number) {
  if (logLevel <= 10) {
    return 'trace';
  }

  if (logLevel <= 20) {
    return 'debug';
  }

  if (logLevel <= 30) {
    return 'info';
  }

  if (logLevel <= 40) {
    return 'warn';
  }

  if (logLevel <= 50) {
    return 'error';
  }

  return 'fatal';
}

function getLevelColour(logLevel: number) {
  if (logLevel <= 10) {
    //
  }

  if (logLevel <= 20) {
    //
  }

  if (logLevel <= 30) {
    return 'green';
  }

  if (logLevel <= 40) {
    return 'yellow';
  }

  if (logLevel <= 50) {
    return 'red';
  }

  return 'white';
}
