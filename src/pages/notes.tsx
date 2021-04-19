const NotesPage = () => {
  return (
    <div className="notes">
      <h1>Development Notes</h1>

      <div className="section">
        <div className="section-title">Overview</div>
        <p>
          This project, tentatively called "Factory", is a simple way for anyone
          to customize and launch a Web3 site. Our "Factory Templates" try to
          serve common use cases for anyone interested in starting or enhancing
          their own digital art or media businesses.
        </p>
        <p>
          Factory Templates make it easy for anyone to configure and launch
          their own site in just minutes. Our systems handle deploying a
          customized smart contract and generating a full-featured site. The
          contract is configured to be 100% owned and solely manageable by the
          creator. The generated site is uploaded to IPFS automatically, which
          is easy to{' '}
          <a
            href="https://docs.ipfs.io/how-to/websites-on-ipfs/link-a-domain/#domain-name-service-dns"
            target="_blank"
          >
            point a domain to
          </a>
          . Users can also download the generated site as static & minified HTML
          / CSS / JS for self-hosting elsewhere, or the generated Next.js
          project if they'd like to customize it even further.
        </p>
        <p>
          The first Factory Template is "Portfolio". This template allows the
          owner to mint their own NFTs (image, video, etc) and add basic
          metadata (title, description). These NFTs are automatically displayed
          on the portfolio home page.
        </p>
        <p>
          Because Factory uses shared token standards, all these new
          independently-owned sites work within a larger ecosystem of sites and
          services. For example, any work minted on a Factory-generated site
          shows up automatically in mobile wallets like Rainbow.me, can be sold
          on OpenSea, and has transaction logs on Etherscan.
        </p>
      </div>

      <div className="section">
        <div className="section-title">Future Template Possibilites</div>
        <ul>
          <li>
            Digital Print Shop
            <ul>
              <li>Mint and list NFTs for sale.</li>
              <li>
                For each NFT, owners can set a fixed number of editions to sell
                or make it unlimited. Buyers will pay for gas / minting fees as
                part of the purchase flow.
              </li>
              <li>
                Re-sale fees can also be configured during the minting process.
                (i.e. send the creator 10% of the purchase price on any sale).
              </li>
              <li>
                For this template and all others that incorporate payments,
                funds go directly to the creator from the purchaser (in other
                words, payments are never routed through a Factory-owned service
                for handling).
              </li>
            </ul>
          </li>
          <li>
            Solo Show
            <ul>
              <li>Mint and auction NFTs as part of a solo gallery.</li>
              <li>
                Uses reserve auctions - owners can set a minimum price, and
                bidding lasts 24 hours from the first bid to meet the minimum
                requirement. Any bid in the last 15 minutes will extend bidding
                another 15 minutes.
              </li>
              <li>
                Auction mechanics & re-sale fees etc can be pre-configured
                during the creation process.
              </li>
            </ul>
          </li>
          <li>
            Group Show
            <ul>
              <li>Same as Solo Show but easy to use for groups.</li>
              <li>
                Includes more artist-specific metadata on the pages and handles
                paying individual artists directly.
              </li>
              <li>
                Auction mechanics & re-sale fees etc can be pre-configured
                during the creation process.
              </li>
            </ul>
          </li>
          <li>
            Voting Booth
            <ul>
              <li>Simple, decentralized polling / voting</li>
              <li>Site makes it easy to vote and see results</li>
            </ul>
          </li>
          <li>
            Banker
            <ul>
              <li>
                Automated payment splits. Configure different percentages to go
                to different addresses anytime a payment comes in.
              </li>
              <li>
                Site makes it easy to track payments that have come in and how
                they were paid out.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="section">
        <div className="section-title">Technical Overview</div>
        <p>
          Factory is currently enabled on the Rinkeby and Goerli test networks
          (both proof-of-authority Ethereum blockchains), and the Mumbai test
          network (the test network for Matic, a proof-of-stake L2 blockchain).
          These networks work with other platforms in the ecosystem like OpenSea
          and Etherscan.
        </p>
        <p>
          The plan is to build on these test networks for a while to ensure our
          smart contract templates and generators are secure and functional.
          Staying on the test networks also helps give the development process
          more of a toy-development mode as everything will be limited to using
          fake "play money" without a rush to actually monetize. This toy-dev
          vibe can hopefully be reflected in the product as well, making the
          process of creating these things simple, fun, and creative.
        </p>
      </div>

      <div className="section">
        <div className="section-title">Things To Consider Still</div>
        <ul>
          <li>
            It might not be possible to decentralize 100% of the Factory service
            <ul>
              <li>
                IPFS server
                <ul>
                  <li>
                    Currently Factory uses a self-hosted IPFS node and API to
                    manage storing content and metadata. Technically, this can
                    be used for permanent storage, or can be used a temporary
                    storage so the content can be "pinned" elsewhere (like{' '}
                    <a href="https://pinata.cloud" target="_blank">
                      Pinata
                    </a>
                    ).
                  </li>
                  <li>
                    We can auto-generate Pinata API keys for each build with
                    hard API limits. This could be used to get people started,
                    with the expectation that they'll sign up for their own
                    Pinata account and replace the keys if they exceed their
                    limit using the keys we provide.
                  </li>
                </ul>
              </li>
              <li>
                Build server
                <ul>
                  <li>
                    A basic Node.js server handles building sites and sending
                    them to the IPFS server. This process takes 30 - 60 seconds
                    in full, and can handle relatively low throughput (~ 2 - 3
                    builds at a time). It may be possible to move this to a
                    serverless architecture to get higher concurrency, or more
                    servers can be added with a shared job queuing system.
                  </li>
                  <li>
                    This is fairly inexpensive at low scale but will benefit
                    from some kind of rate limiting - like setting a max # of
                    deployments per account per day, or charging a small fee as
                    part of any deployment.
                  </li>
                </ul>
              </li>
              <li>
                RPC urls
                <ul>
                  <li>
                    A personal RPC url is needed for each blockchain to allow
                    content to load even when the user hasn't connected a
                    wallet.{' '}
                    <a href="https://infura.io" target="_blank">
                      Infura
                    </a>{' '}
                    provides URLs for Ethereum and its test networks. MaticVigil
                    is the equivalent for Matic and its test networks. Both
                    services have very high limits on their free plan for an
                    individual site, but the limits are likely too low for a
                    platform.
                  </li>
                  <li>
                    Neither service allows these URLs to be generated
                    dynamically, so we'll either need to put in one of our own,
                    or ask users to sign up and paste their URL during the
                    creation process.
                  </li>
                  <li>
                    It may make sense to charge users a small fee if they'd like
                    to use our URL, or otherwise require them to provide their
                    own. That fee would cover us upgrading our plan when needed.
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            What's the right level of flexibility to offer in customization for
            things?
            <ul>
              <li>
                Each customization option adds complexity which needs to be
                designed, tested, and maintained.
              </li>
              <li>
                Because users will get the original source code for their site,
                they can customize it entirely if they have React experience or
                can find a React developer to help them.
              </li>
              <li>
                It seems ideal to keep options limited to start and focus on
                things that are high variance + very easy to test (like colors
                or re-sale fees), and less on things like layouts or
                functionality.
              </li>
            </ul>
          </li>

          <li>
            What's the right approach to make this genuinely useful to people
            over time?
            <ul>
              <li>
                This project is still in an "explore things, have fun, and
                consider the possibilities" phase, but hopefully at some point
                transitions into a useful & production-ready service.
              </li>
              <li>
                Ideally Factory can be developed in public, with a community of
                interested users to help guide things with feedback, suggestions
                and testing.
              </li>
              <li>
                It'd be possible to utilize DAO concepts (
                <a href="https://aragon.org/dao" target="_blank">
                  here's a nice explainer page
                </a>
                ) to fund development, make decisions with community support,
                incentivize early adopters, etc. I haven't done enough research
                yet to have any idea of what the right approach would look like
                for something like this. It's likely only worth doing if our
                model can be made easy to explain & understand.
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .notes {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
        h1 {
          margin-bottom: 100px;
        }
        .section {
          margin-bottom: 100px;
        }
        .section-title {
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: 500;
        }
        p {
          line-height: 1.5em;
          margin-bottom: 20px;
          font-size: 20px;
          color: #333;
        }
        li {
          margin-left: 20px;
          padding: 5px;
          line-height: 1.5em;
          font-size: 20px;
          color: #333;
        }
        a {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default NotesPage;
