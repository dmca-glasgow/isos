import { run } from '@mdx-js/mdx';
import { MDXModule } from 'mdx/types';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Fragment, JSX } from 'preact/jsx-runtime';

import { createRunOptions } from '@isos/processor';

type Props = {
  jsString: string;
  onRendered?: () => unknown;
};

export function Article({ jsString, onRendered }: Props) {
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    (async () => {
      setMDX(await run(jsString, createRunOptions()));
    })();
  }, [jsString]);

  const mdxRef = useCallback((instance: JSX.Element) => {
    if (instance !== null) {
      onRendered && onRendered();
    }
  }, []);

  return <MDXContent ref={mdxRef} />;
}
