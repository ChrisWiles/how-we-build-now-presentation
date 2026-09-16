# The pipeline we’re building toward

A local React presentation of Figure 1 from [How We Build Now](https://chriswiles.github.io/how-we-build-now/), expanded into an 18-step team operating model. The vector diagram is sourced directly from the original essay. The expanded explanations, workflows, and examples are presentation copy.

## Open

**[Open the presentation](https://chriswiles.github.io/how-we-build-now-presentation/)**

For an offline copy, run `npm ci` and `npm run build:portable`, then open `../pipeline-presentation.html` in a browser. It contains the application, fonts, styles, and diagram, and works without a server or an internet connection. The essay and source links are external navigation.

The editable project also runs with `npm install` and `npm run dev -- --host 127.0.0.1 --port 4173`.

## Present

- Right arrow, Page Down, or Space: next step.
- Left arrow, Page Up, or Shift+Space: previous step.
- Home / End: first step / complete picture.
- F: toggle fullscreen, when the browser supports it.
- M: open the complete diagram. Escape closes it.
- Click the progress segments or step picker to jump to a stage.
- Swipe horizontally through the main content on a touch device.

The original diagram is revealed cumulatively, with six additional slides explaining domain-skill routing, local review before a PR, production monitoring, upstream learning, a shared project-manager agent, and readiness for better models. These are proposed workflows, not live integrations or deployed agents.

The complete map is available at any time and returns to the same step when closed. Reduced-motion preferences disable transitions. URL hashes restore individual steps.

The closing slide reproduces a published 2026–2030 global AI hardware buildout scenario. It uses performance-equivalent capacity rather than electrical power. “Chips & buildout” shows the NVIDIA roadmap, a reported Rubin efficiency benchmark, and lab infrastructure plans. Sources distinguish projections, targets, operating capacity, and workload-specific benchmarks. See [compute-research.md](compute-research.md) for the research and data provenance.

## Edit and build

- `src/steps.js`: stage order, explanations, example, and camera framing.
- `src/figure.json`: original vector elements, grouped by reveal stage.
- `src/App.jsx`: navigation, dialogs, animation, and presentation UI.
- `src/Panels.jsx`: the six operating-model slides and compute source notes.
- `src/compute-data.js`: published annual capacity values and dated sources.
- `src/styles.css`: layout, typography, colors, and responsive behavior.
- `npm run build:portable`: rebuild the app and the self-contained HTML file.

No backend, analytics, remote font requests, or paid services are needed.

## Deployment

GitHub Actions builds and deploys `dist/client` to GitHub Pages on pushes to `main`. Deployment can also be started manually from the Actions tab. Relative asset paths support the repository URL, and URL hashes link directly to individual slides.
