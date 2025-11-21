export function Intro() {
  return (
    <div id="intro">
      <svg id="intro-arrow" viewBox="0 0 66 62">
        <path d="M2.363,17.202l-0.694,0.906l-1.296,-0.748l-0.21,0.103c-0.587,-2.405 0.557,-4.984 1.249,-7.289c0.836,-2.834 1.819,-5.618 2.801,-8.418c0.644,-1.827 3.167,-2.548 4.175,-0.588c2.03,3.989 4.271,7.739 6.705,11.472l0.213,1.604l0.244,0.426l0,0.051l0.018,0.99l-0.113,0.307l-0.403,0.683l-0.647,0.428l-0.76,0.172l-0.55,-0.067l-0.664,-0.374l-0.519,-0.579l-0.033,-0.119l-0.34,-0.341l-0.341,-0.682l-0.033,-0.119l-1.621,-1.328c0.865,4.111 1.941,8.17 3.518,12.041c2.78,6.872 6.951,13.195 12.091,18.356c10.377,10.441 25.682,16.369 40.004,15.37l0.002,1.348c-15.63,2.196 -31.111,-2.366 -42.962,-13.59c-8.544,-8.107 -15.251,-20.279 -16.633,-32.716l-3.2,2.702Z" />
      </svg>
      <div id="intro-text">
        <h3>Open a .tex or .md file to begin</h3>
        <p>
          The file, and any referenced files therein, will be watched for
          changes. Changes will trigger ISOS to update automatically. When
          ready, click the Save HTML button to produce a self-contained
          ISOS HTML file that can be opened with your browser.
        </p>
      </div>
    </div>
  );
}
