import { PluggableList, unified } from 'unified';

type UpdateHander = (count: number) => unknown;

export function createProcessorWithLogs(
  plugins: PluggableList,
  onUpdate: UpdateHander
) {
  const logger = createLogger(onUpdate);

  const plugginsWithLogs = plugins.reduce((acc: PluggableList, plugin) => {
    acc.push(plugin, logger);
    return acc;
  }, []);

  return unified.use(plugginsWithLogs);
}

function createLogger(onUpdate: UpdateHander) {
  let counter = 0;
  return () => {
    onUpdate(counter++);
  };
}
