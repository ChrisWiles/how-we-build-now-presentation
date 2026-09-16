import { useState } from 'react';
import { ArrowRight, ArrowDown, ArrowBendUpLeft, ArrowSquareOut, BookOpenText, CheckCircle, Code, GitPullRequest, ListChecks, Pulse, ShieldCheck, Stack, BellRinging, MagnifyingGlass } from '@phosphor-icons/react';

import { computeForecast, computeSources, sourceById } from './compute-data';

function PanelHeading({kicker, title}) {
  return <div className="panel-heading"><span>{kicker}</span><h2>{title}</h2></div>;
}

function SkillsPanel() {
  return <div className="insight-body skills-panel">
    <PanelHeading kicker="ROUTE BEFORE YOU BUILD" title="One feature. The right collection of skills." />
    <div className="routing-strip"><span>Feature brief</span><ArrowRight /><span>Affected domains</span><ArrowRight /><strong>Selected skills</strong></div>
    <div className="skill-columns">
      <section><h3>Domain knowledge</h3><ul className="skill-list">
        <li><Code /><div><strong>Front-end / client</strong><p>UI patterns, state, accessibility, client contracts.</p></div></li>
        <li><Stack /><div><strong>Handsontable / grid</strong><p>Editing, selection, data volume, grid behavior.</p></div></li>
        <li><BookOpenText /><div><strong>Backend domains</strong><p>Service rules, data ownership, API contracts.</p></div></li>
      </ul></section>
      <section><h3>Cross-cutting concerns</h3><ul className="concern-list"><li>Performance</li><li>Security</li><li>Migrations</li><li>Observability</li></ul><p className="small-note">Load what the change touches. Record why each skill applies.</p></section>
    </div>
    <div className="panel-outcome"><ArrowBendUpLeft /><span>Domain experts own the ongoing loop: research → apply → learn → update.</span></div>
  </div>;
}

function ReviewPanel() {
  const stages = [
    [BookOpenText, '01', 'Plan with the relevant skills', 'Acceptance criteria, domain rules, failure cases.'],
    [Code, '02', 'Implement and exercise the feature', 'Run checks. Capture screenshots. Inspect actual behavior.'],
    [MagnifyingGlass, '03', 'Local review → fix → recheck', 'A separate review pass challenges the diff before the PR.'],
    [GitPullRequest, '04', 'Open PR → CI review → sign-off', 'Independent checks and review remain part of the handoff.'],
  ];
  return <div className="insight-body review-panel">
    <PanelHeading kicker="QUALITY STARTS UPSTREAM" title="A PR should arrive with evidence." />
    <ol className="workflow-list">{stages.map(([Icon,n,title,detail],i)=><li key={n} className={i===2?'emphasized':''}><span className="workflow-number">{n}</span><Icon /><div><strong>{title}</strong><p>{detail}</p></div>{i===2&&<span className="stage-badge">BEFORE PR</span>}</li>)}</ol>
    <div className="evidence-row"><span>Tests</span><span>Screenshots</span><span>Actual behavior</span><span>Review findings</span></div>
    <p className="small-note">A separate reviewer uses the original requirements and evidence. More approval from the author alone does not establish independence.</p>
  </div>;
}

function ProductionPanel() {
  return <div className="insight-body production-panel">
    <PanelHeading kicker="PROPOSED AGENT WORKFLOW" title="From a new signal to the right person." />
    <ol className="workflow-list">
      <li><Pulse /><div><strong>Observe</strong><p>New log patterns, errors, regressions, and feature outcomes.</p></div></li>
      <li><MagnifyingGlass /><div><strong>Correlate</strong><p>Compare with the baseline. Link deployment, PR, and owner.</p></div></li>
      <li className="teal-emphasis"><BellRinging /><div><strong>Alert the author immediately</strong><p>Automatically send the evidence to the PR author when the link is credible; otherwise route promptly to the service owner with uncertainty stated.</p></div></li>
      <li><ArrowBendUpLeft /><div><strong>Learn</strong><p>Fix the issue and update the earliest skill or check that could have prevented it.</p></div></li>
    </ol>
    <div className="panel-outcome"><ShieldCheck /><span>Deduplicate alerts. Stay quiet when nothing actionable changes.</span></div>
  </div>;
}

function LearningPanel() {
  return <div className="insight-body learning-panel">
    <PanelHeading kicker="LEARN LATE. IMPROVE EARLY." title="One lesson, several places to apply it." />
    <div className="learning-inputs"><span>PR feedback</span><span>Local / CI checks</span><span>Logs & incidents</span></div>
    <div className="distill-row"><ArrowDown /><strong>Distill the recurring failure and its cause</strong><ArrowDown /></div>
    <table className="learning-table"><thead><tr><th>Improve this</th><th>So the next change…</th></tr></thead><tbody>
      <tr><th>Docs & domain knowledge</th><td>Starts with the right context.</td></tr>
      <tr><th>Tech-spec skill</th><td>Asks the missing question before the plan is approved.</td></tr>
      <tr><th>Implementation skill</th><td>Uses a known-good pattern on the first attempt.</td></tr>
      <tr><th>Review skill & checks</th><td>Catches the failure if prevention misses it.</td></tr>
      <tr><th>Regression coverage</th><td>Keeps the lesson executable.</td></tr>
    </tbody></table>
    <div className="panel-outcome"><ArrowBendUpLeft /><span>Assign an owner. Verify the update. Track whether the issue recurs.</span></div>
  </div>;
}

function ManagerPanel() {
  const rows = [
    ['Ready for review', 'Implementation complete, current checks passed, review requested.', 'Review or assign a reviewer.'],
    ['Needs attention', 'Failed CI, unanswered review, stale work, or a dependency.', 'Name the blocker and its owner.'],
    ['In progress', 'A linked ticket and active work with a next milestone.', 'Keep the plan and status aligned.'],
    ['Merged / deployed', 'Merge and release evidence are checked separately.', 'Close the ticket when its definition of done is met.'],
  ];
  return <div className="insight-body manager-panel">
    <PanelHeading kicker="PROPOSED SHARED ASSISTANT" title="A current answer to “where are we?”" />
    <div className="manager-inputs"><span>Tickets</span><span>PRs</span><span>CI & reviews</span><span>Deployments</span></div>
    <div className="status-list">{rows.map(([title,evidence,action],i)=><div className="status-row" key={title}><span className={`status-tag status-${i}`}>{title}</span><div><p>{evidence}</p><strong>{action}</strong></div></div>)}</div>
    <div className="panel-outcome"><ListChecks /><span>Every status has an owner, a source link, and a last-checked time.</span></div>
    <p className="small-note">People decide priorities and commitments. The agent maintains the evidence behind the shared view.</p>
  </div>;
}

function ScheduledPanel() {
  const routines = [
    ['Daily', 'Clear the path for developers', 'Surface reviews and ticket updates, reconcile workloads, and clean up finished worktrees after checking for uncommitted or unpushed work.'],
    ['Weekly', 'Turn feedback into better defaults', 'Read PR comments across the team. Distill recurring lessons into docs, domain skills, implementation skills, and checks.'],
    ['Monthly / new model', 'Revisit the foundations', 'Research current best practices. Re-evaluate skills with stronger models; audit architecture, recurring patterns, and code cleanup opportunities.'],
    ['On events / scheduled', 'Watch deployment health', 'Check releases, logs, and regressions. Report evidence, route issues to owners, or carry out a predefined response.'],
  ];
  return <div className="insight-body scheduled-panel">
    <PanelHeading kicker="A PROPOSED OPERATING RHYTHM" title="Useful work, without a fresh prompt." />
    <div className="status-list">{routines.map(([cadence,title,detail])=><div className="status-row" key={cadence}><span className="status-tag">{cadence}</span><div><strong>{title}</strong><p>{detail}</p></div></div>)}</div>
    <div className="scheduled-ledger"><GitPullRequest /><div><strong>One shared audit history in GitHub issues</strong><p>Record scope, date, model, evidence, owner, and follow-ups. Link previous runs so everyone can see what was checked and agents avoid duplicate work.</p></div></div>
    <div className="panel-outcome"><ListChecks /><span>Each routine has a trigger, a budget, and permission to report, open a PR, or take a defined action.</span></div>
  </div>;
}

function SourceLink({ id, children }) {
  return <a href={sourceById(id).url} target="_blank" rel="noreferrer">{children}</a>;
}

function BuildoutEvidence() {
  return <div className="buildout-evidence">
    <div className="chip-roadmap">
      <div><span>2026</span><strong>Vera Rubin</strong><small>Production ramp</small></div>
      <div><span>2027</span><strong>Rubin Ultra</strong><small>Roadmap target</small></div>
      <div><span>2028</span><strong>Feynman</strong><small>Roadmap target</small></div>
      <div><span>2029–30</span><strong>Next generations</strong><small>Performance uncertain</small></div>
    </div>
    <div className="efficiency-evidence"><strong>10×</strong><div><b>More tokens per watt on a Rubin benchmark</b><p>CoreWeave’s DeepSeek-R1 test vs. Grace Blackwell NVL72. Workload-specific; reported by <SourceLink id="rubin">NVIDIA ↗</SourceLink>.</p></div></div>
    <div className="buildout-rows">
      <div><strong>OpenAI</strong><p><SourceLink id="openai">Over 10 GW secured</SourceLink>; <SourceLink id="jpm">30 GW ambition for 2030</SourceLink> discussed by J.P. Morgan. Targets are not live capacity.</p></div>
      <div><strong>Anthropic</strong><p><SourceLink id="anthropic">Up to 5 GW of new AWS capacity</SourceLink>, spanning Trainium2–4. Nearly 1 GW expected online by end-2026.</p></div>
    </div>
    <p className="compute-note">Buildout plans show scale. Chip and system improvements change how much work that power supports. The chart uses performance-equivalent compute; these announcements are not added on top.</p>
    <p className="evidence-links"><SourceLink id="roadmap">NVIDIA roadmap ↗</SourceLink><SourceLink id="keynote">GTC keynote & video ↗</SourceLink><SourceLink id="altman">Altman’s buildout vision ↗</SourceLink></p>
  </div>;
}

function RunwayPanel({ onSources }) {
  const [view, setView] = useState('outlook');
  const x = year => 58 + (year - 2026) * 132;
  const y = value => 255 - value / 600 * 215;
  const points = computeForecast.map(item => `${x(item.year)},${y(item.millions)}`).join(' ');
  return <div className="insight-body runway-panel">
    <PanelHeading kicker="2026–2030 · GLOBAL AI HARDWARE CAPACITY" title="More compute. A bigger opportunity." />
    <div className="scenario-controls" aria-label="Compute outlook view">
      <button aria-pressed={view === 'outlook'} onClick={() => setView('outlook')}>Published projection</button>
      <button aria-pressed={view === 'evidence'} onClick={() => setView('evidence')}>Chips & buildout</button>
    </div>
    {view === 'outlook' ? <div className="forecast-view">
      <div className="compute-chart-heading"><strong>Millions of H100-equivalent compute</strong><span>Start of each year</span></div>
      <svg className="compute-chart" viewBox="0 0 640 300" role="img" aria-labelledby="compute-chart-title compute-chart-desc">
        <title id="compute-chart-title">Published global AI hardware projection, 2026 to 2030</title>
        <desc id="compute-chart-desc">AI 2040 aggressive buildout scenario. Millions of H100-equivalents at the start of each year: {computeForecast.map(item => `${item.year}: ${item.millions}, ${item.status}`).join('; ')}. Performance-weighted hardware capacity, not chip count or model intelligence. The 2030 value uses the source’s no-deal path.</desc>
        <defs><linearGradient id="compute-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#55c9a5" stopOpacity=".2"/><stop offset="100%" stopColor="#55c9a5" stopOpacity=".01"/></linearGradient></defs>
        {[0, 150, 300, 450, 600].map(value => <g key={value}><line className="compute-grid" x1="58" x2="608" y1={y(value)} y2={y(value)}/><text className="compute-axis" x="44" y={y(value)+4} textAnchor="end">{value}</text></g>)}
        <text className="compute-projection-label" x="72" y="25">AGGRESSIVE BUILDOUT SCENARIO</text>
        <polygon points={`58,255 ${points} 586,255`} fill="url(#compute-fill)"/>
        <polyline className="compute-curve" points={points} fill="none" strokeDasharray="7 6"/>
        {computeForecast.map(item => <g key={item.year}><circle className={`compute-point ${item.year === 2026 ? 'estimate-point' : ''}`} cx={x(item.year)} cy={y(item.millions)} r="5"/><text className="compute-value" x={x(item.year)} y={y(item.millions)-15} textAnchor="middle">{Math.round(item.millions)}M</text><text className="compute-year" x={x(item.year)} y="282" textAnchor="middle">{item.year}</text></g>)}
      </svg>
      <p className="forecast-credit"><SourceLink id="forecast">Source: Romeo Dean / AI 2040 ↗</SourceLink><span>2026 estimate · 2027–30 projections</span></p>
      <p className="compute-note">A newer, faster chip counts for more than one H100. This published model combines investment, hardware improvements, and manufacturing limits. It assumes rapid AI progress and strong revenue growth; it is not a consensus forecast.</p>
    </div> : <BuildoutEvidence />}
    <div className="readiness-statement"><strong>Build the system now.</strong><span>Put the next wave of models to work faster.</span></div>
    <button className="sources-button" onClick={onSources}>Sources, data & assumptions <ArrowSquareOut size={14} /></button>
  </div>;
}

export function SourcesPanel() {
  return <div className="source-content">
    <p>Research checked September 16, 2026. The chart reproduces one published global AI hardware scenario. Other reports, chip roadmaps, and lab plans provide context; they are not averaged into a synthetic forecast.</p>
    <div className="source-interpretation"><h3>The actual values behind the graph</h3>
      <table className="projection-data"><caption>Installed compute at January 1 · million H100-equivalents</caption><thead><tr><th>Year</th><th>Capacity</th><th>Evidence</th></tr></thead><tbody>{computeForecast.map(item => <tr key={item.year}><th>{item.year}</th><td>{item.millions.toFixed(1)}M</td><td>{item.status}</td></tr>)}</tbody></table>
      <p>The source’s end-2029 no-deal stock is shown as start-2030. The 2026 estimate describes January, not today’s available capacity. Lines connect the published points; no constant annual multiplier generates them.</p>
      <h3>What an H100-equivalent means</h3><p>The source normalizes rated hardware processing performance to an NVIDIA H100, using dense operations and numerical precision (TPP). One million equivalents need not mean one million physical chips. Memory, networking, utilization, and software affect useful throughput; these values are hardware capacity, not a forecast of model intelligence or team productivity.</p>
    </div>
    <ol>{computeSources.map(source => <li key={source.id}><span>{source.date}</span><h3><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowSquareOut size={15} /></a></h3><p>{source.note}</p></li>)}</ol>
    <div className="source-interpretation"><h3>How to present the conclusion</h3><p>Capacity could expand substantially as more systems arrive and hardware improves. The practical opportunity is more capable models and more parallel agent work. Capture that opportunity by preparing context, skills, tools, feedback loops, and independent verification now—and expand delegation as actual results support it.</p><p>Power connections, financing, chip supply, demand, and deployment delays can change the trajectory. Supplier commitments can overlap; watts, spending, chip counts, and benchmark speedups are not interchangeable measures.</p></div>
  </div>;
}

const panelNames = {skills:'DOMAIN-SKILL ORCHESTRATION',review:'BEFORE AND AFTER THE PR',production:'AFTER DEPLOYMENT',learning:'THE LEARNING SYSTEM',manager:'COORDINATING THE WORK',scheduled:'SCHEDULED & EVENT-DRIVEN AGENTS',runway:'READY FOR THE NEXT MODELS'};
export function InsightPanel({ kind, onSources }) {
  const components = {skills:SkillsPanel,review:ReviewPanel,production:ProductionPanel,learning:LearningPanel,manager:ManagerPanel,scheduled:ScheduledPanel,runway:RunwayPanel};
  const Content = components[kind];
  return <section className={`diagram-panel insight-panel insight-${kind}`} aria-label={panelNames[kind]}><div className="diagram-toolbar"><span>{panelNames[kind]}</span><span>{kind==='runway'?'THE OPPORTUNITY':'HOW WE PUT IT TO WORK'}</span></div><Content onSources={onSources} /></section>;
}
