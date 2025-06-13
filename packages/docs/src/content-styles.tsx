import { styled } from '@linaria/react';

export const HTMLPreview = styled.div`
  flex: 1;
  background: rgb(47, 47, 47);
  padding: 1em;
  overflow-x: auto;

  table {
    width: 100%;
    &,
    th,
    td {
      border-color: #fff3;
    }
  }

  figure {
    figcaption {
      text-align: center;
      margin: 0.5em 0;
    }
  }

  .env-equation {
    display: flex;
    align-items: center;

    .maths {
      flex: 1;
    }
    /* .eq-count {
      flex: 0 0 auto;
    } */
  }
`;
