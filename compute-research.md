# Compute outlook: evidence and interpretation

Research checked September 16, 2026. This replaces the presentation’s constant-growth extrapolations. The annual graph now reproduces a published model, with its uncertainty visible.

## Annual series selected

[Romeo Dean’s AI 2040 compute supplement](https://ai-2040.com/supplements/compute-supplement), sections 1.1, 1.2 and 2.1, provides explicit annual installed-stock estimates. Its model connects investment, financing, hardware price-performance, and semiconductor manufacturing constraints. It is aggressive and assumes rapid AI progress and strong revenue growth; it is not a consensus forecast.

| Date represented | Million H100-equivalents | Source location |
|---|---:|---|
| January 1, 2026 | 22.4 | §1.2, AI H100e trajectory; §1.1 installed-stock chart |
| January 1, 2027 | 57.1 | Same |
| January 1, 2028 | 135.2 | Same |
| January 1, 2029 | 289.0 | Same |
| January 1, 2030 | 537.0 | §2.1, end-2029 **no-deal** installed stock |

The last value excludes the source’s hypothetical Plan A policy agreement. The displayed chart rounds to whole millions, uses a zero-based linear axis, and joins these published points. No annual growth constant produces the series. January 2026 is a historical estimate, not a September 2026 measurement.

The source normalizes dense processing performance and bit precision to an H100 (TPP). This measures hardware capacity; it is not a literal GPU count, delivered API throughput, or intelligence score. Memory, networking, software, and utilization still matter.

## Other evidence considered

| Evidence | What it supports | How used |
|---|---|---|
| [Epoch AI, *What will AI look like in 2030?*, PDF p. 69](https://epoch.ai/files/AI_2030.pdf#page=69), September 2025 | Approximately 600M H100-equivalents by 2030 if trends continue | Separate scale comparison in source notes. Not combined into a range: definitions and timing are not harmonized. Report commissioned by Google DeepMind. |
| [NVIDIA GTC roadmap](https://images.nvidia.com/nvimages/gtc/pdf/GTC2025_Highlights_v2.pdf), 2025 | Rubin 2026, Rubin Ultra 2027, Feynman 2028 | Roadmap targets, not delivery guarantees. |
| [NVIDIA’s Rubin update](https://blogs.nvidia.com/blog/vera-rubin/), July 2026 | CoreWeave reports 10× tokens/sec/MW on DeepSeek-R1 versus Grace Blackwell NVL72 | Workload-specific efficiency example; never multiplied into the entire fleet. |
| [GTC 2026 coverage and keynote video](https://blogs.nvidia.com/blog/gtc-2026-news/) | Rubin/Feynman system roadmap | Links for presenter reference. Research used the written coverage; no claim to have watched the video. |
| [OpenAI’s infrastructure update](https://openai.com/index/building-the-compute-infrastructure-for-the-intelligence-age/), April 2026 | Surpassed the initial goal of securing 10 GW by 2029 | Secured infrastructure, not wholly operating capacity. |
| [J.P. Morgan’s 2026 outlook](https://privatebank.jpmorgan.com/nam/en/insights/latest-and-featured/eotm/outlook), podcast transcript | OpenAI’s long-term targets require 30 GW by 2030; power and finance are constraints | Analyst discussion of ambition, not a delivered-capacity forecast. |
| [Anthropic/Amazon agreement](https://www.anthropic.com/news/anthropic-amazon-compute), April 2026 | Up to 5 GW of new capacity; nearly 1 GW expected online by end-2026; Trainium2–4 | Ten-year agreement: the full 5 GW is not assigned to 2030. |
| [Altman, *Abundant intelligence*](https://blog.samaltman.com/abundant-intelligence), September 2025 | Eventual ambition to add 1 GW/week | Directional ambition with no firm completion date, not annual forecast data. |

Also examined [Diffusion Capital’s inference supply analysis](https://www.diffusion-capital.com/en/insights/ai-inference-supply-and-demand) and [CSIS’s AI power scenarios](https://www.csis.org/analysis/ai-power-surge-growth-scenarios-genai-datacenters-through-2030). Their geographies, coverage, and capacity definitions differ from the plotted global installed-stock series, so their numbers were not spliced into it.

## Presenter framing

“The buildout is substantial, and better chips increase what that infrastructure can do. This is one published aggressive scenario, not a precise promise. We should build our context, skills, feedback loops, and verification now, so stronger models can immediately inherit a system that works.”

More hardware does not establish a numeric increase in model quality or our team’s output. Evaluate new models on real tasks, then increase scope and concurrency where results justify it. Supplier announcements may overlap; do not sum them into a new global total.
