import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowCounterClockwise, ArrowsOut, ArrowsIn, X, List, Graph, Check } from '@phosphor-icons/react';
import '@fontsource/archivo/latin-400.css';
import '@fontsource/archivo/latin-500.css';
import '@fontsource/archivo/latin-600.css';
import '@fontsource/source-serif-4/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import { steps } from './steps';
import figure from './figure.json';
import { InsightPanel, SourcesPanel } from './Panels';

const number = (i) => String(i + 1).padStart(2, '0');
function initialStep() { return Math.max(0, steps.findIndex(step => step.id === window.location.hash.slice(1))); }

const completeView = [0, 0, 980, 748];
function Diagram({ step, overview = false }) {
  const svg = useRef(null);
  const view = overview ? completeView : step.view;
  const revealStage = overview ? 11 : step.diagramStage;
  const last = useRef(view);
  const full = revealStage >= 11;
  useEffect(() => {
    const end = view;
    const start = last.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const began = performance.now();
    let frame;
    const animate = (now) => {
      const t = reduce ? 1 : Math.min(1, (now - began) / 750);
      const ease = 1 - Math.pow(1 - t, 3);
      const next = end.map((value, i) => start[i] + (value - start[i]) * ease);
      last.current = next;
      svg.current?.setAttribute('viewBox', next.join(' '));
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [view]);
  // Original vector artwork, grouped for progressive disclosure.
  const prefix = overview ? 'map-' : 'walk-';
  const markup = value => value.replaceAll('id="ar', `id="${prefix}ar`).replaceAll('url(#ar', `url(#${prefix}ar`);
  return <svg ref={svg} className={`pipeline-svg ${full ? 'all-visible' : ''}`} viewBox={view.join(' ')} role="img" aria-label={full ? 'Complete pipeline from human intent to release, with context, tools, memory, human judgment, and the feedback loop.' : `Pipeline revealed through ${step.label}.`}>
    <g dangerouslySetInnerHTML={{ __html: markup(figure.defs) }} />
    <g fontFamily="IBM Plex Mono, ui-monospace, monospace">
      {figure.groups.filter(group => group.step <= revealStage).map(group => <g key={group.id} data-part={group.id} className={`figure-part ${group.kind} ${group.step === revealStage ? 'current' : 'earlier'} ${group.id === 'feedback' ? 'feedback' : ''}`} dangerouslySetInnerHTML={{ __html: markup(group.markup) }} />)}
    </g>
  </svg>;
}

function Legend() {
  return <div className="legend" aria-label="Diagram legend"><span className="commodity">Commodity</span><span className="constraint">The constraint</span><span className="compounding">Compounding assets</span></div>;
}

export function App() {
  const [index, setIndex] = useState(initialStep);
  const [fullscreen, setFullscreen] = useState(false);
  const [notice, setNotice] = useState('');
  const [modal, setModal] = useState(null);
  const dialog = useRef(null);
  const pointer = useRef(null);
  const step = steps[index];
  const last = index === steps.length - 1;
  const go = useCallback(value => setIndex(current => Math.max(0, Math.min(steps.length - 1, typeof value === 'function' ? value(current) : value))), []);
  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else setNotice('Use your browser’s fullscreen command to present.');
    } catch { setNotice('Fullscreen is unavailable here. You can use your browser’s fullscreen command.'); }
  }, []);
  useEffect(() => {
    const onHash = () => go(initialStep());
    const onFull = () => setFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener('hashchange', onHash);
    document.addEventListener('fullscreenchange', onFull);
    return () => { window.removeEventListener('hashchange', onHash); document.removeEventListener('fullscreenchange', onFull); };
  }, [go]);
  useEffect(() => {
    try { window.history.replaceState(null, '', `#${step.id}`); } catch { /* Some file previews restrict history. */ }
    document.title = `${step.label} · AI Feedback Loop Engineering`;
  }, [step]);
  useEffect(() => { if (modal) dialog.current?.showModal(); else dialog.current?.close(); }, [modal]);
  useEffect(() => {
    const onKey = event => {
      if (modal || event.altKey || event.metaKey || event.ctrlKey || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (['ArrowRight', 'PageDown'].includes(event.key)) { event.preventDefault(); go(i => i + 1); }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); go(i => i - 1); }
      if (event.key === ' ' && !event.target.closest('button, a')) { event.preventDefault(); go(i => i + (event.shiftKey ? -1 : 1)); }
      if (event.key === 'Home') { event.preventDefault(); go(0); }
      if (event.key === 'End') { event.preventDefault(); go(steps.length - 1); }
      if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); }
      if (event.key.toLowerCase() === 'm') { event.preventDefault(); setModal('map'); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, modal, toggleFullscreen]);
  useEffect(() => { if (!notice) return; const timeout = setTimeout(() => setNotice(''), 6000); return () => clearTimeout(timeout); }, [notice]);

  return <div className={`presentation tone-${step.tone}`}>
    <header className="topbar">
      <a className="brand" href="https://chriswiles.github.io/how-we-build-now/" target="_blank" rel="noreferrer">AI FEEDBACK LOOP ENGINEERING</a>
      <nav className="header-actions" aria-label="Presentation tools">
        <button className="quiet-button" onClick={() => setModal('map')} title="Complete diagram (M)"><Graph size={18} /><span>Full diagram</span></button>
        <button className="icon-button fullscreen-button" onClick={toggleFullscreen} title="Toggle fullscreen (F)" aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{fullscreen ? <ArrowsIn size={19} /> : <ArrowsOut size={19} />}</button>
      </nav>
    </header>
    <div className="deck-heading"><span>The pipeline we’re building toward</span><span className="deck-type">BUILD, VERIFY, LEARN, REPEAT</span></div>
    <main className="stage" onPointerDown={event => { if (event.pointerType === 'touch' && !event.target.closest('button, a')) pointer.current = {x:event.clientX, y:event.clientY}; }} onPointerUp={event => {
      if (!pointer.current) return;
      const dx = event.clientX - pointer.current.x, dy = event.clientY - pointer.current.y;
      pointer.current = null;
      if (Math.abs(dx) > 65 && Math.abs(dy) < 45) go(i => i + (dx < 0 ? 1 : -1));
    }} onPointerCancel={() => { pointer.current = null; }}>
      <section className="narrative" aria-labelledby="step-title">
        <div key={step.id} className="narrative-content" tabIndex={0} role="region" aria-label="Slide explanation">
          <div className="eyebrow"><span className="step-number">{number(index)}</span><span>{step.category}</span></div>
          <h1 id="step-title">{step.title}</h1>
          <p className="description">{step.description}</p>
          {step.planningLoop && <ol className="planning-loop" aria-label="Repeat the planning loop as needed">{step.planningLoop.map((phase, i) => <li key={phase}><span>{i + 1}</span>{phase}</li>)}</ol>}
          <ul className="points">{step.points.map(point => <li key={point}><span className="point-rule" />{point}</li>)}</ul>
          <aside className="example"><div className="example-label">{step.exampleLabel || <>IN PRACTICE <span>/ A RETRIED ORDER</span></>}</div><p>{step.example}</p></aside>
        </div>
        <div className="takeaway" key={`takeaway-${step.id}`}>{step.takeaway}</div>
      </section>
      {step.panel ? <InsightPanel key={step.id} kind={step.panel} onSources={() => setModal('sources')} /> : <section className="diagram-panel" aria-label="Progressively revealed pipeline">
        <div className="diagram-toolbar"><span>{step.id === 'complete' ? 'THE COMPLETE PICTURE' : 'BUILDING THE PICTURE'}</span><span>{Math.min(step.diagramStage + 1, 11)} OF 11 ELEMENTS</span></div>
        <div className="diagram-stage"><Diagram step={step} /></div>
        <div className="diagram-footer"><Legend /><button className="map-expand" onClick={() => setModal('map')} aria-label="Expand complete diagram" title="Expand complete diagram"><ArrowsOut size={17} /></button></div>
      </section>}
    </main>
    <footer className="controls">
      <div className="timeline" aria-label="Jump to a step">{steps.map((item, i) => <button key={item.id} className={`timeline-step ${i < index ? 'visited' : ''} ${i === index ? 'selected' : ''} tone-${item.tone}`} aria-label={`${number(i)} ${item.label}`} aria-current={i === index ? 'step' : undefined} title={`${number(i)} · ${item.label}`} onClick={() => go(i)}><span /></button>)}</div>
      <div className="control-row">
        <button className="step-picker quiet-button" onClick={() => setModal('steps')} aria-label="Choose a step"><List size={19} /><span className="counter">{number(index)} <span>/ {steps.length}</span></span><span className="current-label">{step.label}</span></button>
        <div className="keyboard-hint"><kbd><ArrowLeft size={13} /></kbd><kbd><ArrowRight size={13} /></kbd><span>to explore</span></div>
        <div className="navigation"><button className="previous icon-button" onClick={() => go(i => i - 1)} disabled={index === 0} aria-label="Previous step" title="Previous step"><ArrowLeft size={20} /></button><button className="next-button" onClick={() => go(last ? 0 : index + 1)} aria-label={last ? 'Restart presentation' : 'Next step'}><span>{last ? 'Start again' : 'Next step'}</span>{last ? <ArrowCounterClockwise size={19} /> : <ArrowRight size={20} />}</button></div>
      </div>
    </footer>
    <div className="sr-only" aria-live="polite" aria-atomic="true">Step {index + 1} of {steps.length}: {step.label}. {step.title}</div>
    {notice && <div className="toast" role="status">{notice}</div>}
    <dialog ref={dialog} className={`modal ${modal === 'map' ? 'map-modal' : modal === 'sources' ? 'sources-modal' : 'steps-modal'}`} onCancel={() => setModal(null)} onClose={() => setModal(null)} onClick={event => { if (event.target === dialog.current) { const rect = dialog.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setModal(null); } }} aria-labelledby="modal-title">
      <div className="modal-header"><div><span className="modal-kicker">{modal === 'sources' ? 'COMPUTE & CAPABILITY' : 'FIGURE 01'}</span><h2 id="modal-title">{modal === 'map' ? 'The pipeline we’re building toward' : modal === 'sources' ? 'Sources and interpretation' : 'Explore the pipeline'}</h2></div><button className="icon-button" autoFocus onClick={() => setModal(null)} aria-label="Close dialog"><X size={22} /></button></div>
      {modal === 'map' ? <><div className="full-diagram"><Diagram overview /></div><div className="full-map-footer"><Legend /><span>Esc to return to your step</span></div></> : modal === 'sources' ? <SourcesPanel /> : <div className="step-grid">{steps.map((item, i) => <button key={item.id} className={`step-choice ${i === index ? 'active' : ''} tone-${item.tone}`} onClick={() => { go(i); setModal(null); }} aria-current={i === index ? 'step' : undefined}><span className="choice-number">{number(i)}</span><span><strong>{item.label}</strong><small>{item.category}</small></span>{i === index && <Check size={20} />}</button>)}</div>}
    </dialog>
  </div>;
}
