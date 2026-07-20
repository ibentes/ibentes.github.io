import WiseCover from './WiseCover'
import ExternalLinkArrow from './ExternalLinkArrow'
import {
  BodyText,
  CaptionText,
  SectionLabel,
  SectionTitle,
} from './case-study/CaseStudyPrimitives'
import './NokiaCaseStudy.css'

const PROBLEM_STATS = [
  {
    value: '33%',
    text: 'more energy consumption per person on tourist homes than in primary residences.',
  },
  {
    value: '1/3',
    text: 'of the accomodation market in the city of Barcelona are vacation rentals.',
  },
  {
    value: '88%',
    text: 'of hosts surveyed that they would like to control energy consumption.',
  },
]

const INTERVIEW_FINDINGS = [
  {
    title: 'Lack of awareness',
    text: 'Many people are simply not aware of energy-efficient practices and technologies available to them.',
  },
  {
    title: 'Lack of incentives',
    text: 'In some cases, individuals may not see immediate benefits in terms of reduced energy bills or environmental impacts.',
  },
  {
    title: 'Inconvenience',
    text: 'Energy-saving practices like sealing drafts or unplugging devices when not in use can be perceived as inconvenient.',
  },
]

const PERSONAS = [
  {
    role: 'Guest',
    name: 'Joana',
    detail: '31, Digital nomad',
    image: '/work/wise/persona-guest.png',
    imageClass: 'nokia-case__persona-avatar-img--guest',
    bio: 'Joana is a an adventurous freelancer who prioritizes cost savings and environmental impact during her travels. She often struggles on understanding the rental property devices usage and lacks incentive on beeing more energy-conscious due to the absence of tangible results.',
  },
  {
    role: 'Host',
    name: 'Joseph',
    detail: '56, Property owner',
    image: '/work/wise/persona-host.png',
    imageClass: 'nokia-case__persona-avatar-img--host',
    bio: "Joseph is an experienced property owner at Airbnb. He's focused on enhancing guest satisfaction and reducing energy costs in his properties. He has difficulty in controlling energy consumption and lacks ensurance that guests follow energy-saving guidelines.",
  },
]

const BENCHMARK_TAGS = [
  'Smart scheduling',
  'Monitoring and remote control',
  'Device detection',
  'Voice assistance',
  'Billing forecasting',
  'Personalized tips',
  'Weekly energy updates',
  'Reports and insights',
  'Customization',
  'Behavioral learning',
]

const USP_ROWS = [
  [
    {
      title: 'Control and monitor energy consumption',
      text: 'You can visualize and control the devices that are in operation. So you can see what is happening in real time whether you are inside or outside the house.',
    },
    {
      title: "Identify what's raising your bill",
      text: 'Through a chart of the whole house you will be able to see the peaks and identify which appliance is raising your electricity bill considerably.',
    },
    {
      title: 'Get rewarded and save money',
      text: 'Save on your monthly bill and/or get discounts for your next stay.',
    },
  ],
  [
    {
      title: 'Personalized tips',
      text: 'Suggestions on how to optimize energy consumption.',
    },
    {
      title: 'Scheduling and automation',
      text: 'Set devices to turn on and off automatically.',
    },
  ],
]

const USABILITY_FINDINGS = [
  {
    number: '1',
    text: "In some cases, the hierarchy of information doesn't translate clear information.",
  },
  {
    number: '2',
    text: 'Navigation is very intuitive and effective and users achieve goals easily.',
  },
  {
    number: '3',
    text: 'The "Check out to redeem" button is not well perceived as a disabled button.',
  },
]

function StatCard({ value, text }: { value: string; text: string }) {
  return (
    <div className="nokia-case__stat-card">
      <p className="nokia-case__stat-value">{value}</p>
      <p className="nokia-case__body">{text}</p>
    </div>
  )
}

function FindingCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="nokia-case__stat-card">
      <p className="nokia-case__finding-title">{title}</p>
      <p className="nokia-case__body">{text}</p>
    </div>
  )
}

export default function WiseCaseStudy() {
  return (
    <article className="nokia-case">
      <div id="wise-intro">
        <div className="nokia-case__hero-group">
          <div className="nokia-case__intro">
            <h1 className="nokia-case__headline font-bricolage">
              An Innovative Automated Energy Saving Service
            </h1>

            <div className="nokia-case__meta">
              <div className="nokia-case__meta-row">
                <div className="nokia-case__meta-item">
                  <SectionLabel>Type</SectionLabel>
                  <p className="nokia-case__meta-value">Course & personal project</p>
                </div>
                <div className="nokia-case__meta-item">
                  <SectionLabel>Date</SectionLabel>
                  <p className="nokia-case__meta-value">2024</p>
                </div>
              </div>

              <div className="nokia-case__meta-block nokia-case__meta-block--overview">
                <SectionLabel>Overview</SectionLabel>
                <BodyText>
                  This project was initially ideated in the context of the
                  Master of Design and Management of User Experience and
                  Digital Services at ELISAVA and then designed by me over a
                  period of 2 weeks.
                </BodyText>
              </div>
            </div>
          </div>

          <div className="nokia-case__cover">
            <WiseCover />
          </div>
        </div>
      </div>

      <section
        id="wise-discovery"
        className="nokia-case__section nokia-case__section--spacious"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>Discovery</SectionLabel>
          <h2 className="nokia-case__subtitle">Problem space</h2>
          <BodyText>
            The major issue that served as a starting point for the development
            of our service was the problem of excessive energy consumption. We
            started by researching into where this problem was most prominent and
            analyzed the market and industry trends, competitors, and existing
            solutions to identify gaps and opportunities for us to act. After a
            detailed desk research we concluded that the market of rental homes
            corresponded to a large fraction of the problem.
          </BodyText>
        </div>

        <div className="nokia-case__stat-block">
          <div className="nokia-case__stat-grid">
            {PROBLEM_STATS.map((stat) => (
              <StatCard key={stat.value} value={stat.value} text={stat.text} />
            ))}
          </div>
          <CaptionText>*on a survey conducted by Airbnb</CaptionText>
        </div>
      </section>

      <section
        id="wise-findings"
        className="nokia-case__section nokia-case__section--spacious"
      >
        <div className="nokia-case__section-intro">
          <h2 className="nokia-case__subtitle">Findings from interviews</h2>
          <BodyText>
            We wanted to understand what was causing this disproportional usage
            of energy and the underlying issue that people were facing and needed
            to be solved.
          </BodyText>
        </div>

        <div className="nokia-case__stat-grid">
          {INTERVIEW_FINDINGS.map((finding) => (
            <FindingCard
              key={finding.title}
              title={finding.title}
              text={finding.text}
            />
          ))}
        </div>
      </section>

      <section id="wise-hmw" className="nokia-case__section">
        <SectionLabel>HMW</SectionLabel>
        <SectionTitle size="lg">
          How might we make energy saving energy easy, motivating, visible and
          have a real impact on our lives and our environment?
        </SectionTitle>
      </section>

      <section
        id="wise-personas"
        className="nokia-case__section nokia-case__section--personas"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>Define</SectionLabel>
          <h2 className="nokia-case__subtitle">User personas</h2>
        </div>
        <div className="nokia-case__personas">
          <div className="nokia-case__persona-grid">
          {PERSONAS.map((persona) => (
            <div key={persona.name} className="nokia-case__persona-card">
              <div className="nokia-case__persona-header">
                <div className="nokia-case__persona-avatar">
                  <img
                    src={persona.image}
                    alt=""
                    className={persona.imageClass}
                  />
                </div>
                <div className="nokia-case__persona-meta">
                  <p className="nokia-case__persona-role">{persona.role}</p>
                  <p className="nokia-case__persona-name">{persona.name}</p>
                  <p className="nokia-case__persona-detail">{persona.detail}</p>
                </div>
              </div>
              <p className="nokia-case__persona-bio">{persona.bio}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section
        id="wise-benchmark"
        className="nokia-case__section nokia-case__section--benchmark"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>Benchmark</SectionLabel>
          <h2 className="nokia-case__subtitle">Good practices</h2>
          <div className="nokia-case__body-group">
            <BodyText>
              We looked at how others in the industry are addressing similar
              problems.
            </BodyText>
            <BodyText>
              It helped us identify best practices and innovative solutions that
              can inspire and inform our own ideas.
            </BodyText>
          </div>
        </div>

        <div className="nokia-case__tag-rows">
          <div className="nokia-case__tags nokia-case__tags--pills">
            {BENCHMARK_TAGS.slice(0, 5).map((tag) => (
              <span key={tag} className="nokia-case__tag nokia-case__tag--pill">
                {tag}
              </span>
            ))}
          </div>
          <div className="nokia-case__tags nokia-case__tags--pills">
            {BENCHMARK_TAGS.slice(5).map((tag) => (
              <span key={tag} className="nokia-case__tag nokia-case__tag--pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="wise-usps"
        className="nokia-case__section nokia-case__section--benchmark"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>USPs</SectionLabel>
          <h2 className="nokia-case__subtitle">Key functionalitites</h2>
          <BodyText>
            From gathering insights and understanding the pains and the needs of
            the target audience aswell as studying the technologies to be used,
            we were able to define the key functionalities of the app.
          </BodyText>
        </div>

        <div className="nokia-case__usp-rows">
          {USP_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="nokia-case__stat-grid">
              {row.map((item) => (
                <div key={item.title} className="nokia-case__stat-card">
                  <p className="nokia-case__finding-title">{item.title}</p>
                  {item.text ? (
                    <p className="nokia-case__body">{item.text}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="wise-value-prop" className="nokia-case__section">
        <SectionLabel>Value proposition</SectionLabel>
        <SectionTitle size="lg">
          An innovative automated energy saving service that provides benefits
          to both guests and hosts. Helping to save energy and money at home by
          easily and remotely optimizing and controlling energy consumption,
          which translates into reduced costs. Proving that taking care of the
          environment can also be fun and rewarding.
        </SectionTitle>
      </section>

      <section
        id="wise-wireframes"
        className="nokia-case__section nokia-case__section--wireframes"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>Develop</SectionLabel>
          <h2 className="nokia-case__subtitle">Information architecture</h2>
          <BodyText>
            I designed the page architecture by defining and organizing the
            sections needed to support key user actions. Separate information
            architectures were created for hosts and guests, with privacy
            constraints ensuring that hosts cannot monitor guests&apos; live device
            usage.
          </BodyText>
        </div>
        <img
          src="/work/wise/wireframes-tray.png"
          alt=""
          width={1372}
          height={762}
          className="nokia-case__wireframes-image"
        />
      </section>

      <section id="wise-visual-design" className="nokia-case__section">
        <SectionLabel>Visual design</SectionLabel>
        <h2 className="nokia-case__subtitle">Design system</h2>
        <BodyText>
          For the typography choice I took into account legibility and a
          friendly aesthetic to enhance data analysis while simplifying device
          usage. Black and grey are the predominant tones: since monitoring is
          the key component of the application, I decided to use colors to
          represent each main interaction the user can have with the app. I also
          used icons to represent the devices, so that they would be immediately
          identified.
        </BodyText>
      </section>

      <section
        id="wise-screens"
        className="nokia-case__section nokia-case__section--screens"
      >
        <div className="nokia-case__screens-header">
          <SectionLabel>Deliver</SectionLabel>
          <h2 className="nokia-case__subtitle">Screens</h2>
        </div>
        <img
          src="/work/wise/screens-deliver.png"
          alt=""
          className="nokia-case__screens-image"
        />
      </section>

      <section
        id="wise-usability-testing"
        className="nokia-case__section nokia-case__section--validate"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>Validate</SectionLabel>
          <h2 className="nokia-case__subtitle">Usability testing</h2>
          <BodyText>
            User testing was conducted throughout the development of the app using
            paper prototypes, wireframes, and low-fidelity digital prototypes for
            continuous iteration. After creating the high-fidelity prototype the
            app was finally tested so that the final solution could be validated.
            I asked 4 users to perform 3 main tasks, and arrived to the following
            insights:
          </BodyText>
        </div>

        <div className="nokia-case__stat-grid">
          {USABILITY_FINDINGS.map((finding) => (
            <div key={finding.number} className="nokia-case__stat-card">
              <p className="nokia-case__usability-number">{finding.number}</p>
              <p className="nokia-case__body">{finding.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="wise-thanks" className="nokia-case__section">
        <SectionTitle size="lg">Thank you!</SectionTitle>
        <a
          href="https://www.figma.com/proto/jGDkge7amDnDq1O0nSaBh7/Wise-App?page-id=730%3A6512&type=design&node-id=763-10532&viewport=-1637%2C-552%2C0.26&t=YmwxT7o8eFWfcoDr-1&scaling=scale-down&starting-point-node-id=992%3A2231&desktop-link-click-timestamp=1784488949826&desktop-ul-exp-bucket=po&desktop-ul-pref-conflict=1"
          className="nokia-case__nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLinkArrow />
          Link to the prototype
        </a>
      </section>
    </article>
  )
}
