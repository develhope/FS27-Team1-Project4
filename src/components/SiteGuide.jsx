export function SiteGuide() {
  return (
    <div className="banner-guide">
      <div className="semi-circle"></div>
      {/*<div className="semi-square"></div>*/}
      <div className="stick-1"></div>
      <div className="stick-2"></div>
      <div className="stick-3"></div>
      <div className="steps">
        <div className="steps-1st-row">
          <div className="step support">
            <div className="circle-guide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="guide-icons"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
              </svg>
            </div>
            <p className="text-guide">
              get help <br />
              from one of <br />
              our assistant
            </p>
          </div>
          <div className="step cart">
            <div className="circle-guide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="guide-icons"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>
            <p className="text-guide">
              check out
              <br /> your cart
            </p>
          </div>
        </div>
        <div className="steps-2nd-row">
          <div className="step">
            <div className="circle-guide">
              <svg className="guide-icons" viewBox="0 0 24 24">
                <path d="M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2m0 2v2h8V4H8m8 4H8v2h8V8m0 10h-2v2h2v-2z" />
              </svg>
            </div>
            <p className="text-guide">
              choose
              <br /> or
              <br /> build
              <br /> your pc
            </p>
          </div>
          <div className="step">
            <div className="circle-guide">
              <svg
                className="guide-icons guide-icons-rocket"
                viewBox="0 0 24 24"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </div>
            <p className="text-guide">
              your order
              <br /> will be shipped today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
