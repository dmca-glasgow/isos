import { getVersion } from '@tauri-apps/api/app';
import { relaunch } from '@tauri-apps/plugin-process';
import { Update, check } from '@tauri-apps/plugin-updater';
import classNames from 'classnames';
import { useEffect, useState } from 'preact/hooks';

export function Updater() {
  const [updateCheck, setUpdateCheck] = useState<Update | null>(null);

  useEffect(() => {
    (async () => {
      const update = await check();
      setUpdateCheck(update);
    })();
  }, []);

  return (
    <div
      id="updater"
      className={classNames({ show: updateCheck !== null })}>
      <Window update={updateCheck as Update} />
    </div>
  );
}

type Props = {
  update: Update | null;
};

function Window({ update }: Props) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    (async () => {
      if (update === null) {
        return;
      }
      const appVersion = await getVersion();
      console.log({ appVersion });

      const { currentVersion, version } = update;
      console.log({ currentVersion, version });

      let downloaded = 0;
      let contentLength: number | null = null;

      update.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            if (typeof event.data.contentLength === 'number') {
              contentLength = event.data.contentLength;
              console.log(
                `started downloading ${event.data.contentLength} bytes`,
              );
            }
            break;
          case 'Progress':
            downloaded += event.data.chunkLength;
            if (typeof contentLength === 'number') {
              setProgress((downloaded / contentLength) * 100);
              console.log(
                `downloaded ${downloaded} from ${contentLength}`,
              );
            }
            break;
          case 'Finished':
            console.log('download finished');
            break;
        }
      });
      console.log('update installed');
      await relaunch();
    })();
  }, []);

  if (update === null) {
    return null;
  }

  return (
    <div id="updater-window">
      <h3>
        Updating: {update?.currentVersion || '1.0.0'} →{' '}
        {update?.version || '2.0.0'}
      </h3>
      <p></p>
      <div id="updater-progress">
        <div style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
