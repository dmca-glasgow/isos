import { styled } from '@linaria/react';
import { run } from '@mdx-js/mdx';
import { MDXModule } from 'mdx/types';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { markdownToSidebarJs } from '@isos/processor';

type Props = {
  markdown: string;
};

export function Sidebar({ markdown }: Props) {
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    if (markdown !== '') {
      (async () => {
        const { jsString, runOptions } = await markdownToSidebarJs(
          markdown
        );
        const newMdx = await run(jsString, runOptions);
        setMDX(newMdx);
      })();
    }
  }, [markdown]);

  return (
    <StyledSidebar>
      <MDXContent />
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  /* background: black; */
`;
