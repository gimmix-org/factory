import Link from 'next/link';

const IndexPage = () => {
  return (
    <div className="page">
      <div className="page-title">What do you want to make?</div>
      <div className="generators">
        <Link href="/create/portfolio">
          <a className="generator">
            <div className="title">Portfolio</div>
            <div className="status">v0.0.1</div>
          </a>
        </Link>

        <Link href="/create/bank">
          <a className="generator">
            <div className="title">Bank</div>
            <div className="status">v0.0.1</div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          height: 100%;
          align-items: center;
          justify-content: center;
        }
        .page-title {
          font-weight: 500;
          font-size: 24px;
          padding: 10px;
          margin-bottom: 10px;
        }
        .generators {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .generator {
          width: 200px;
          height: 200px;
          padding: 15px;
          background-color: ghostwhite;
          color: black;
          border: 3px solid black;
          margin: 5px;
          transition: 100ms transform;
        }
        .generator:hover {
          transform: translateY(-3px);
          text-decoration: none;
          color: blueviolet;
        }
        .title {
          font-weight: 500;
          font-size: 24px;
        }
        .status {
          font-size: 14px;
          opacity: 0.7;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
