import type { ReactNode } from 'react'
import DesignProcessTimeline from './DesignProcessTimeline'
import NokiaCover from './NokiaCover'
import './NokiaCaseStudy.css'

const PROBLEM_TAGS = [
  'Complex workflows',
  'Fragmented tools',
  'Proprietary technologies with high learning curve',
  'Misalignment with industry standards',
]

const ROLE_ITEMS = [
  'Owned the design process of the platforms most complex features;',
  'Collaborated closely with stakeholders to clarify concepts and align decisions;',
  'Contributed to shifting design from execution to strategy;',
  'Research and analysis of data;',
  'Used AI tools to speed up the design process;',
]

const IMPACT_ITEMS = [
  'Reduced rework through early alignment and validation',
  'Increased trust in design as a contributor to product direction',
  'Stronger alignment and collaboration across teams',
  'Improved clarity and cohesion across key workflows',
  'Scalable foundations enabling easier addition of new features',
]

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="nokia-case__label">{children}</p>
}

function SectionTitle({
  children,
  size = 'md',
}: {
  children: ReactNode
  size?: 'md' | 'lg'
}) {
  return (
    <h2
      className={`nokia-case__title font-bricolage nokia-case__title--${size}`}
    >
      {children}
    </h2>
  )
}

function BodyText({ children }: { children: ReactNode }) {
  return <p className="nokia-case__body">{children}</p>
}

type FramedIcon = {
  src: string
  frameClass: string
}

function ToolNote({
  label,
  iconSrc,
  framedIcons,
  className = '',
  children,
}: {
  label?: string
  iconSrc?: string | string[]
  framedIcons?: FramedIcon[]
  className?: string
  children: ReactNode
}) {
  if (framedIcons) {
    return (
      <div
        className={`nokia-case__tool-note nokia-case__tool-note--with-icon ${className}`.trim()}
      >
        <div className="nokia-case__tool-icons">
          {framedIcons.map((icon) => (
            <div
              key={icon.src}
              className={`nokia-case__tool-icon-frame ${icon.frameClass}`}
            >
              <img src={icon.src} alt="" />
            </div>
          ))}
        </div>
        <p className="nokia-case__tool-body">{children}</p>
      </div>
    )
  }

  if (iconSrc) {
    const icons = Array.isArray(iconSrc) ? iconSrc : [iconSrc]

    return (
      <div
        className={`nokia-case__tool-note nokia-case__tool-note--with-icon ${className}`.trim()}
      >
        <div className="nokia-case__tool-icons">
          {icons.map((src) => (
            <img key={src} className="nokia-case__tool-icon" src={src} alt="" />
          ))}
        </div>
        <p className="nokia-case__tool-body">{children}</p>
      </div>
    )
  }

  return (
    <div className="nokia-case__tool-note">
      <p className="nokia-case__tool-label">{label}</p>
      <p className="nokia-case__tool-body">{children}</p>
    </div>
  )
}

export default function NokiaCaseStudy() {
  return (
    <article className="nokia-case">
      <div id="nokia-intro">
        <div className="nokia-case__hero-group">
          <div className="nokia-case__intro">
            <h1 className="nokia-case__headline font-bricolage">
              Evolving a Network Management Platform Used by Experts
            </h1>

            <div className="nokia-case__meta">
            <div className="nokia-case__meta-row">
              <div className="nokia-case__meta-item">
                <SectionLabel>Type</SectionLabel>
                <p className="nokia-case__meta-value">Nokia project</p>
              </div>
              <div className="nokia-case__meta-item">
                <SectionLabel>Date</SectionLabel>
                <p className="nokia-case__meta-value">2026</p>
              </div>
            </div>

            <div className="nokia-case__meta-block nokia-case__meta-block--overview">
              <SectionLabel>Overview</SectionLabel>
              <BodyText>
                This project was my main assignment at Nokia. Together with two
                other designers, our goal was to redesign a platform that allows
                users to manage and configure their network. This case focuses
                on a specific delivery where we had 4 months to design a
                prototype to showcase the product&apos;s key values.
              </BodyText>
            </div>

            <div className="nokia-case__meta-block">
              <SectionLabel>NDA Agreement</SectionLabel>
              <BodyText>
                This work is covered by a non-disclosure agreement, so l am
                unable to share specific details. The case focuses on my
                approach, decisions, and impact while respecting the
                confidentiality of the product.
              </BodyText>
            </div>
          </div>
        </div>

        <div className="nokia-case__cover">
          <NokiaCover />
        </div>

        <section className="nokia-case__section">
          <SectionLabel>My role</SectionLabel>
          <ul className="nokia-case__list">
            {ROLE_ITEMS.map((item) => (
              <li key={item}>→ {item}</li>
            ))}
          </ul>
        </section>
        </div>
      </div>

      <section
        id="nokia-problem"
        className="nokia-case__section nokia-case__section--problem"
      >
          <SectionLabel>The problem</SectionLabel>
          <SectionTitle size="lg">
            The existing solution was no longer keeping pace with evolving user
            needs or a rapidly changing market.
          </SectionTitle>
          <div className="nokia-case__tags">
            {PROBLEM_TAGS.map((tag) => (
              <span key={tag} className="nokia-case__tag">
                {tag}
              </span>
            ))}
          </div>
      </section>

      <section
        id="nokia-first-delivery"
        className="nokia-case__section nokia-case__section--design-process"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>Design process</SectionLabel>
          <SectionTitle>First delivery</SectionTitle>
          <BodyText>
            We had 4 months to design a prototype for the Core User Group, a
            conference where Nokia showcases its products directly to customers.
            We worked end-to-end with continuous stakeholder validation. By
            focusing on core workflows, making scalable and reversible decisions,
            and validating frequently, we moved quickly with limited information
            while staying flexible.
          </BodyText>
        </div>
        <DesignProcessTimeline />
      </section>

      <section
        id="nokia-discovery"
        className="nokia-case__section nokia-case__section--discovery"
      >
        <div className="nokia-case__section-intro nokia-case__section-intro--discovery">
          <SectionLabel>Discovery and definition</SectionLabel>
          <SectionTitle>
            From zero domain knowledge to user journey mapping
          </SectionTitle>
          <BodyText>
            Designing for a highly technical, expert-driven product required
            building a strong understanding of the system. I was particularly
            involved in gathering and studying the available documentation,
            validating interpretations, and clarifying assumptions with
            stakeholders. From this, I developed user journey maps that connected
            personas to their tasks and workflows, providing a structured visual
            foundation of the platform&apos;s key concepts and interactions.
          </BodyText>
        </div>

        <div className="nokia-case__discovery-media">
          <figure className="nokia-case__discovery-figure">
            <img
              src="/work/nokia/discovery-journey-map.png"
              width={1374}
              height={568}
              alt="User journey map with persona, activity, task, and detail sticky notes"
            />
          </figure>

          <ToolNote
            iconSrc={[
              '/work/nokia/llm-tools-icon.png',
              '/work/nokia/cursor-tools-icon.png',
            ]}
          >
            The usage of LLMs was especially helpful at this stage, supporting the
            analysis of large volumes of documentation and reducing discovery
            time.
          </ToolNote>
        </div>
      </section>

      <section id="nokia-development" className="nokia-case__section">
        <SectionLabel>Development</SectionLabel>
        <div className="nokia-case__columns">
          <div className="nokia-case__column">
            <SectionTitle>IA</SectionTitle>
            <BodyText>
              Given that fragmentation across multiple tools and the need for a
              leaner and cleaner experience were mentioned as core issues of the
              legacy solution, we began by redefining the information
              architecture.
            </BodyText>
          </div>
          <div className="nokia-case__column">
            <SectionTitle>Userflows</SectionTitle>
            <BodyText>
              With the architecture defined, we mapped end-to-end user flows for
              priority use cases. This helped surface friction points, clarify
              dependencies, and align the team around task-based design rather
              than isolated screens.
            </BodyText>
          </div>
          <div className="nokia-case__column">
            <SectionTitle>Wireframes</SectionTitle>
            <BodyText>
              We translated user flows into defined product areas and sections,
              shaping a focused MVP scope. Core functionalities were prioritized
              while ensuring solutions remained scalable and adaptable to
              evolving requirements.
            </BodyText>
          </div>
        </div>
      </section>

      <section
        id="nokia-validation"
        className="nokia-case__section nokia-case__section--user-testing"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>User testing &amp; Interviews</SectionLabel>
          <SectionTitle>Data → Findings → Insights</SectionTitle>
          <div className="nokia-case__body-group">
            <BodyText>
              In addition to internal validation, we engaged with internal experts
              responsible for introducing products to customers. Due to their close
              exposure to real-world implementations and customer feedback, they
              served as informed proxies in the absence of direct end-user access.
            </BodyText>
            <BodyText>
              We performed usability testing with them and gathered qualitative
              feedback on the legacy solution.
            </BodyText>
          </div>
        </div>

        <div className="nokia-case__figure-wrap">
          <div className="nokia-case__figure-frame">
            <img
              src="/work/nokia/user-testing-screenshot.png"
              width={1372}
              height={477}
              alt="User testing board showing data summaries, findings, and insights"
              className="nokia-case__figure-shot"
            />
          </div>
        </div>

        <ToolNote
          iconSrc={[
            '/work/nokia/llm-tools-icon.png',
            '/work/nokia/cursor-tools-icon.png',
          ]}
        >
          We used LLM tools to analyse interview transcripts and accelerate the
          transition from raw data to structured insights, which reduced manual
          effort and time.
        </ToolNote>
      </section>

      <section
        id="nokia-contributions"
        className="nokia-case__section nokia-case__section--contributions"
      >
        <div className="nokia-case__section-intro">
          <SectionLabel>Design contributions</SectionLabel>
          <div className="nokia-case__columns nokia-case__columns--two">
            <div className="nokia-case__column">
              <SectionTitle>Re-think instead of re-skin</SectionTitle>
              <BodyText>
                I introduced a code-diff concept to help users compare versions
                while editing network functions — a capability not included in the
                initial requirements. Grounded in a clear understanding of the
                problem statement and user needs, I proposed the concept as part
                of the demo. Users recognised it as a missing capability, and the
                feature was subsequently added to the product backlog.
              </BodyText>
            </div>
            <div className="nokia-case__column">
              <SectionTitle>
                Transforming complex features into simple workflows
              </SectionTitle>
              <BodyText>
                I led the design for one of the platform&apos;s most technically
                complex features, working closely with the architect to map
                requirements into clear workflows. Early alignment and continuous
                validation resulted in minimal rework and strong stakeholder
                feedback.
              </BodyText>
            </div>
          </div>
        </div>

        <ToolNote
          framedIcons={[
            {
              src: '/work/nokia/cursor-icon.png',
              frameClass: 'nokia-case__tool-icon-frame--cursor',
            },
            {
              src: '/work/nokia/figma-make-icon.png',
              frameClass: 'nokia-case__tool-icon-frame--figma-make',
            },
          ]}
        >
          I used Cursor and Figma Make when ideating, creating and validating
          designs and interactions which significantly improved the workflow and
          collaboration.
        </ToolNote>
      </section>

      <section id="nokia-conclusion" className="nokia-case__section">
        <SectionLabel>Conclusion</SectionLabel>
        <div className="nokia-case__columns nokia-case__columns--two">
          <div className="nokia-case__column">
            <SectionTitle>Impact</SectionTitle>
            <BodyText>
              The product is still under development and has not yet been
              validated with end users, so quantitative metrics are not available
              at this stage. However, the work has already had a clear impact
              trough:
            </BodyText>
            <ul className="nokia-case__list">
              {IMPACT_ITEMS.map((item) => (
                <li key={item}>→ {item}</li>
              ))}
            </ul>
          </div>
          <div className="nokia-case__column">
            <SectionTitle>Learnings</SectionTitle>
            <BodyText>
              This project strengthened my ability to design within complex
              technical environments, make decisions with incomplete information
              and tight timelines, build trust with teams through consistent,
              evidence-based collaboration and leverage AI tools to improve
              workflows. It reinforced the importance of systems thinking and
              iterative validation when designing large-scale B2B platforms.
            </BodyText>
          </div>
        </div>
      </section>

      <section id="nokia-thanks" className="nokia-case__section">
        <SectionTitle size="lg">Thank you!</SectionTitle>
      </section>
    </article>
  )
}
