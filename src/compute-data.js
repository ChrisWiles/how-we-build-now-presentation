// Published model outputs, not a fitted annual growth rate.
// Source sections 1.1/1.2 report Jan-1 stocks. Section 2.1 reports end-2029
// stock for its no-deal counterfactual, presented here as start-2030.
export const computeForecast = [
  { year: 2026, millions: 22.4, status: 'Estimate' },
  { year: 2027, millions: 57.1, status: 'Projection' },
  { year: 2028, millions: 135.2, status: 'Projection' },
  { year: 2029, millions: 289.0, status: 'Projection' },
  { year: 2030, millions: 537.0, status: 'Projection · no-deal path' },
];

export const computeSources = [
  {
    id: 'forecast', label: 'Romeo Dean / AI 2040 · compute buildout model',
    date: 'Accessed September 16, 2026 · sections 1.1, 1.2 and 2.1',
    url: 'https://ai-2040.com/supplements/compute-supplement',
    note: 'Annual chart values come directly from this model. It combines investment and financing, chip price-performance, and EUV manufacturing constraints. It assumes rapid AI progress and very strong revenue growth; this is an aggressive scenario, not an industry consensus. The 2030 point uses its no-deal counterfactual, excluding the fictional Plan A agreement.',
  },
  {
    id: 'epoch', label: 'Epoch AI · What will AI look like in 2030?',
    date: 'September 16, 2025 · PDF page 69',
    url: 'https://epoch.ai/files/AI_2030.pdf#page=69',
    note: 'A separate report discusses roughly 600 million H100-equivalents of installed compute by 2030 if trends continue. This is a scale comparison, not another annual series or a confidence bound: dates and equivalent-chip definitions are not fully harmonized. The report was commissioned by Google DeepMind; its authors state that the conclusions are independent.',
  },
  {
    id: 'roadmap', label: 'NVIDIA · published architecture roadmap',
    date: 'GTC 2025 roadmap · targets, not guaranteed deliveries',
    url: 'https://images.nvidia.com/nvimages/gtc/pdf/GTC2025_Highlights_v2.pdf',
    note: 'Rubin in 2026, Rubin Ultra in 2027, and Feynman in 2028. Memory, interconnects and system design evolve alongside the GPU. No precise 2029–2030 chip-efficiency multipliers are assumed in this presentation.',
  },
  {
    id: 'rubin', label: 'NVIDIA / CoreWeave · measured Rubin efficiency',
    date: 'July 21, 2026 · DeepSeek-R1 benchmark',
    url: 'https://blogs.nvidia.com/blog/vera-rubin/',
    note: 'NVIDIA reports CoreWeave measured 10× tokens per second per megawatt on Vera Rubin NVL72 versus Grace Blackwell NVL72. This is a specific inference benchmark on a new system, not a universal compute or intelligence multiplier. It is not multiplied into the fleet forecast.',
  },
  {
    id: 'keynote', label: 'NVIDIA · GTC 2026 keynote coverage and video',
    date: 'March 2026',
    url: 'https://blogs.nvidia.com/blog/gtc-2026-news/',
    note: 'Official keynote coverage describes Rubin and the following Feynman platform. The linked page includes the keynote video. The presentation uses NVIDIA’s written disclosures and roadmap rather than estimating performance from the video.',
  },
  {
    id: 'openai', label: 'OpenAI · Stargate infrastructure update',
    date: 'April 29, 2026',
    url: 'https://openai.com/index/building-the-compute-infrastructure-for-the-intelligence-age/',
    note: 'OpenAI says it has surpassed its initial milestone of securing 10 GW of US infrastructure by 2029. Secured capacity includes future projects; this is not a claim that all of it is operating. These plans provide buildout context, not additional units to add to the global forecast.',
  },
  {
    id: 'jpm', label: 'J.P. Morgan · 2026 infrastructure outlook',
    date: 'January 1, 2026 · Michael Cembalest',
    url: 'https://privatebank.jpmorgan.com/nam/en/insights/latest-and-featured/eotm/outlook',
    note: 'The report’s podcast transcript describes OpenAI’s long-term targets as requiring 30 GW by 2030, while questioning power availability and financing. This is an analysis of the company’s ambition, not confirmation of delivered capacity.',
  },
  {
    id: 'anthropic', label: 'Anthropic · Amazon compute agreement',
    date: 'April 20, 2026',
    url: 'https://www.anthropic.com/news/anthropic-amazon-compute',
    note: 'Anthropic reports over one million Trainium2 chips in use and an agreement for up to 5 GW of new capacity, with nearly 1 GW of Trainium2/3 capacity expected online by the end of 2026. The ten-year agreement spans Trainium2 through Trainium4; its full 5 GW is not assigned to 2030 here.',
  },
  {
    id: 'altman', label: 'Sam Altman · Abundant intelligence',
    date: 'September 2025',
    url: 'https://blog.samaltman.com/abundant-intelligence',
    note: 'Altman describes an eventual ambition to add a gigawatt of infrastructure each week. This is a statement of intended scale, without a firm completion date, so it is not converted into an annual compute series.',
  },
];

export const sourceById = id => computeSources.find(source => source.id === id);
