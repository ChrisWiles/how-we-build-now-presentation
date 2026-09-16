# Prototype Instructions

Create PR branches with the prefix `cw/`.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Presentation direction — September 16, 2026

- Title the presentation “AI Feedback Loop Engineering”; use that branding in the header and browser title. Retain attribution to the original Figure 1.
- Slide content must never overlap the navigation. At desktop widths, keep the takeaway and diagram footer visible and allow long explanations to scroll within the available height; retain normal document flow on mobile.
- Keep the original Figure 1 walkthrough and expand it with practical team workflows.
- Human intent can begin with a feature, a bug, or an investigation. An investigation can finish with supported findings and a recommendation; it need not produce a code change.
- Organizational context must explain why decisions were made, including tradeoffs and past failures. Prefer specs and decision records committed in the same repo; otherwise provide clear, accessible links from the repo so agents can retrieve the rationale.
- Repeated PR feedback, verification failures, production observations, and incidents should improve the earliest relevant docs, tech-spec skills, implementation skills, domain skills, review skills, and checks.
- Include local review before a PR, plus independent CI review and verification of tests, screenshots, and actual behavior.
- Independent verification should run frequently throughout implementation and CI. Agents should improve lint/test speed and fix flaky checks, write meaningful end-to-end tests, attach Playwright videos and results to PRs, and use a separate reviewer with fresh context plus requirements and the diff. Recordings support test evidence; they do not replace assertions.
- The confidence gate can use agents to assess risk and incident history, publish readiness sign-offs backed by independent evidence, and route PR reviewers by ownership, expertise, and availability. Human judgment should focus increasingly on intent and product decisions, with early previews for designers/project managers/engineering leads and recurring code findings fed into planning, implementation, review skills, and checks.
- Explain an orchestrator selecting domain and cross-cutting skills before implementation: client, Handsontable/grid, backend domains, performance, security, migrations, and observability.
- Domain experts author, validate, and continuously maintain their skills using best practices, research, review feedback, and production outcomes. Everyone invoking a skill should benefit from the same current expertise; skills are an ongoing responsibility.
- Orchestration also selects model size for task type, complexity, and risk; distinguishes short tasks from sustained goals such as large migrations; and allocates token budgets, time limits, checkpoints, and stop conditions.
- Keep the execution-sandbox slide focused on moving from local machines toward reproducible cloud workspaces: PR environments, scoped test databases, standard process startup, browser/mobile runtimes including iOS simulators on macOS, and evidence capture. Computer use and performance checks support exercising the environment; broader tool capabilities and UI design belong in the tool layer.
- The tool layer covers database evidence for bugs/incidents, logs, CI checks, browsers, and MCP integrations including Sentry and Datadog. Include automatic scoped credential access, maintained tool-use skills, and monitoring of availability/authentication/errors with ownership for repairs. A failed tool must not be treated as an empty result.
- Explain production agents correlating new logs with features and notifying the author or owner with actionable evidence.
- Preserve the production monitoring workflow while emphasizing immediate automatic alerts to the PR author when a new post-release issue is credibly linked to their change. Get evidence and next actions to the right person quickly; retain owner fallback, stated uncertainty, deduplication, and upstream learning.
- Include a shared project-manager agent that reduces cognitive load by reconciling tickets, PRs, reviews, blockers, and releases.
- Immediately before the compute outlook, include scheduled and event-driven agents: developer workload and worktree support; weekly/monthly docs, PR-feedback distillation, best-practice research, skill refreshes with stronger models, codebase/architecture audits, and deployment health. Use spare pre-reset token capacity for prioritized, budgeted work. Publish a shared audit history in GitHub issues with evidence and follow-ups so people and agents avoid duplicate work; routines can report or act within defined permissions.
- End with the case for building this foundation now to capture future model improvements. Date and cite compute disclosures; distinguish current operating snapshots from planned deployments, supplier programs from company totals, and compute capacity from model capability.
- These are presentation concepts, not authorization to connect services, deploy agents, or send notifications.

- Show the closing compute outlook as a graph for 2026, 2027, 2028, 2029, and 2030. Compare total computing capacity with chip performance taken into account, rather than electricity or annual supplier deployments. Label assumptions and future scenarios explicitly.

- Do not generate the compute outlook by applying a constant annual growth multiplier. Use published year-specific model outputs; research NVIDIA hardware roadmaps, efficiency evidence, and lab buildout plans. State when a model is aggressive or conditional, and do not mix commitments, watts, chip counts, and benchmark speedups into an unsupported total.
