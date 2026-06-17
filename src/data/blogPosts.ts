const blogAgriValuation = { url: "/images/blog/blog-agri-valuation.png" };
const blogCsrdIrrigation = { url: "/images/blog/blog-csrd-irrigation.png" };

export interface BlogReference {
  /** Short label for tooltip: "Author (Year). Title." */
  short: string;
  /** Full HTML for the reference list entry (may include <a>, <em>). */
  html: string;
}

export interface BlogSection {
  heading?: string;
  /** Paragraphs. Use [n] inline to mark a citation. */
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle?: string;
  date: string;
  image: string;
  imageAlt?: string;
  sections: BlogSection[];
  references: BlogReference[];
}

// Add new posts here — they will appear in the listing and at /blog/:slug.
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "blind-spot-agricultural-asset-valuation",
    category: "Water Risk",
    title: "The blind spot in agricultural asset valuation: crop-level water risk",
    subtitle:
      "Why basin-level screening systematically misprices the water risk embedded in irrigated farmland.",
    date: "June 16, 2026",
    image: blogAgriValuation.url,
    imageAlt: "Aerial cyanotype of terraced agricultural fields",
    sections: [
      {
        paragraphs: [
          "Irrigated agriculture is one of the most water-dependent asset classes in existence. Roughly 40% of the world's food is produced on the 20% of cropland that is irrigated [1]. That land commands a premium not simply because of soil quality, but because of reliable water access. Water is the productive asset. The land is just where it sits.",
          "Yet when capital allocators, including farmland funds, agricultural lenders, and infrastructure investors, assess water risk, they typically rely on basin-level screening tools: WRI Aqueduct scores, MSCI ESG ratings, or watershed-level drought indices. These tools can show that an asset sits in a high-stress basin. They cannot show what that stress costs.",
          "This is not a minor omission. It is the central unanswered question in agricultural asset finance: how does water stress translate into yield loss, revenue impairment, and asset value? Companies reported $425 billion in combined water-related value at risk via CDP in 2019 [12] , yet the tools most financial institutions use to assess that risk stop at the basin level.",
        ],
      },
      {
        heading: "Why basin-level screening is insufficient",
        paragraphs: [
          "Basin-level water risk tools are built for breadth, not depth. A global platform covering millions of locations cannot incorporate the mechanics of individual irrigation systems, the allocation rules that determine who receives water under stress, or the crop physiology that governs how yield responds to water deficits at specific growth stages.",
          "The output is a hazard score: useful for portfolio-level triage, but inadequate for investment-level decision-making. Rabobank's own research acknowledges this directly: physical climate risk impact varies by sector, asset, operation, supply chain, and geography [2]. That variation is precisely what basin-level scores cannot resolve.",
          "The distinction matters because the relationship between water stress and financial outcome is highly non-linear and crop-specific. A 20% reduction in available irrigation water does not produce a 20% reduction in yield. Depending on when in the growing season the deficit occurs, which crop is affected, and how the irrigation system is managed, the yield impact could range from negligible to total crop failure. A basin-level drought score captures none of this.",
          "WRI analysis shows that one-quarter of the world's crops are grown in areas where the water supply is highly stressed, highly unreliable, or both, with rice, wheat, and maize particularly vulnerable [1]. But knowing that a quarter of global crop production faces water stress does not tell a farmland fund which assets in its portfolio face revenue impairment in 2035, or by how much.",
          "The gap between hazard exposure and financial outcome is where the real risk sits, and where current tools stop.",
        ],
      },
      {
        heading: "The regulatory pressure is arriving",
        paragraphs: [
          "The gap between what asset managers know about water risk and what regulators increasingly expect them to disclose is closing rapidly.",
          "The EU's Corporate Sustainability Reporting Directive requires companies to assess and disclose physical climate risks under ESRS E1, including climate-related impacts across operations and value chains [3]. For agricultural asset managers and lenders with European operations or investors, this is no longer purely voluntary. Physical water risk disclosure is moving from qualitative acknowledgement toward quantified assessment.",
          "The direction is similar across other jurisdictions. CSRD is closely aligned with TCFD recommendations, requiring companies to integrate sustainability reporting across governance, strategy, risk management, and metrics. For agricultural lenders in Australia, APRA's CPG 229 climate risk guidance creates equivalent pressure [4]. For UK-listed farmland investors, TCFD-aligned disclosure requirements are already in force.",
          "The implication is clear: institutions need to move beyond statements that water stress is material. They need to quantify how water availability affects crop yields, revenue, collateral values, and loan performance.",
          "The stakes are already visible in lending portfolios. In 2020, Rabobank, one of the world's largest agricultural lenders, found through internal climate stress testing that increased water stress could have significant impacts on its food and agriculture portfolio in the US and Australia [5]. UNEP FI has identified water stress as one of the most important physical climate hazards facing financial institutions with agricultural exposure, with major credit, market, and operational implications [6].",
          "These are not hypothetical risks. They are present in existing loan books. What remains underdeveloped is the standard practice for quantifying them at the level where investment decisions are actually made.",
          "Across jurisdictions, the expectation is converging: physical risk needs to be quantified, not merely described.",
        ],
      },
      {
        heading: "What physically grounded assessment changes",
        paragraphs: [
          "The alternative to basin-level screening is to work from first principles: simulating how water stress translates into crop yield outcomes under specific climate scenarios, then converting those yield outcomes into financial exposure.",
          "This requires modelling at the intersection of three domains that rarely speak to each other: climate science, crop physiology, and financial risk. Climate inputs, including historical reanalysis data and multi-model ensemble projections, establish the forcing conditions. A calibrated crop-water simulation model translates those conditions into daily water balance and yield distributions. Financial translation converts those yield distributions into revenue at risk across the P10, P50, and P90 range of climate outcomes.",
          "The output is not a risk score. It is a yield distribution under named climate scenarios, sized as a revenue impact in the currency the investment committee uses.",
          "Nuveen, one of the world's largest farmland asset managers, has noted that farmland is directly exposed to less well-understood impacts from long-term chronic physical risks such as rising temperatures and changes in water availability. It has also argued that investors need to understand both acute and chronic physical risks posed by climate change [7].",
          "The chronic, cumulative nature of crop-water stress is precisely what statistical screening misses and process-based simulation captures. Even sophisticated water market models built on historical irrigation and trade data often use reduced-form statistical representations of crop water demand rather than physically grounded simulation [10]. Modelling water stress from first principles, rather than approximating it through precipitation anomaly indices or historical demand patterns, is the methodological step that makes financial quantification defensible.",
        ],
      },
      {
        heading: "The entitlement dimension",
        paragraphs: [
          "Yield risk is only the first layer. In regulated water markets, water stress also affects the value of the water rights themselves.",
          "In markets such as the Murray-Darling Basin in Australia, water allocation systems in Spain, and abstraction licence regimes in England, water entitlements are tradeable assets. Their value is a function of expected allocation reliability under future climate conditions.",
          "A general security entitlement in an over-allocated basin facing declining inflows under warming scenarios may be worth materially less in 2040 than its current market price implies. Yet current valuation frameworks often price recent trading history rather than forward climate risk. Research confirms that water market prices reflect current scarcity conditions effectively [13] — but that signal is backward-looking. It does not price the forward shift in allocation reliability that warming scenarios imply.",
          "Research shows the income differential between senior and junior water right holders can reach $141 per acre per year, a gap that compounds considerably in land valuations [8]. As climate change shifts the distribution of available water, the reliability premium attached to senior entitlements will also change. Assets valued on historical allocation reliability will need to be revalued against forward climate projections.",
          "This is a mispricing that basin-level hazard scores cannot identify, because they do not model the allocation mechanisms that determine who receives water when supply falls short.",
          "For farmland funds holding entitlement portfolios, and for lenders whose agricultural loan security includes water rights, this is an emerging but material valuation risk.",
        ],
      },
      {
        heading: "The international context",
        paragraphs: [
          "Water stress in irrigated agriculture is global, but its financial expression is highly local.",
          "The Murray-Darling Basin faces declining inflows from reduced snowmelt and shifting rainfall patterns. Mediterranean irrigated systems, including Spanish almonds, Italian durum wheat, and Moroccan citrus, face intensifying summer drought under warming scenarios. South Asian irrigation systems are exposed to shifting monsoon timing. California's Central Valley faces ongoing groundwater depletion alongside reduced Sierra Nevada snowpack.",
          "Each context has its own water governance framework, entitlement structure, irrigation system, and relationship between water availability and crop financial outcomes. A single global risk score cannot capture these distinctions. An asset-level assessment grounded in local climate data, local water rules, and crop-specific physiology can.",
          "Recent research on the Murray-Darling Basin explicitly identifies the limited systematic assessment of agricultural outcome sensitivity to water allocation scenarios under changing climate as a gap in the literature [11]. That gap has direct financial implications for capital allocated to irrigated assets in that basin and others like it.",
          "Research projecting crop yield failures across global breadbaskets finds that the probability of failure could be up to 25 times higher by 2050, with water scarcity in high-stress breadbasket areas as likely or more likely to drive failure than risks across the entire basin [9].",
          "That concentration of risk within irrigated production systems is the signal that demands asset-level rather than basin-level analysis. A farmland portfolio that appears geographically diversified at the basin level may still be deeply concentrated in water-dependent production systems when assessed from the ground up.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "The case for physically grounded crop-water risk assessment is not primarily regulatory, though regulation is accelerating. It is commercial.",
          "Capital allocated to irrigated agricultural assets on the basis of basin-level hazard scores is systematically mispricing a material and quantifiable risk. As climate conditions shift, assets that appear well-located by current screening tools may face revenue impairments that their valuations do not reflect.",
          "The institutions closest to this risk already know it. Agricultural lenders are running climate stress tests and finding material exposure in their portfolios [5]. Farmland asset managers are acknowledging that chronic water risk remains insufficiently understood [7]. Regulators are mandating disclosure at a level of specificity that generic hazard scores cannot meet [3][4].",
          "Closing the gap requires a methodology that connects the physics of water stress to the economics of crop production: at the asset level, under named climate scenarios, with explicit uncertainty ranges.",
          "That methodology exists. What lags is adoption by the institutions still underwriting irrigated assets with tools that were never designed to price crop-level water risk.",
        ],
      },
    ],
    references: [
      {
        short: "Saccoccia & Kuzma (2024). One-Quarter of World's Crops Threatened by Water Risks.",
        html: 'Saccoccia, L. &amp; Kuzma, S. (2024). <a href="https://www.wri.org/insights/growing-water-risks-food-crops" target="_blank" rel="noopener noreferrer"><em>One-Quarter of World\'s Crops Threatened by Water Risks.</em></a> World Resources Institute.',
      },
      {
        short: "RaboResearch (2024). Why companies must address physical climate risks.",
        html: 'RaboResearch (2024). <a href="https://www.rabobank.com/knowledge/d011459536-here-s-why-companies-must-address-physical-climate-risks" target="_blank" rel="noopener noreferrer"><em>Here\'s why companies must address physical climate risks.</em></a> Rabobank.',
      },
      {
        short: "European Commission (2022). Corporate Sustainability Reporting Directive (CSRD).",
        html: 'European Commission (2022). <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464" target="_blank" rel="noopener noreferrer"><em>Corporate Sustainability Reporting Directive (CSRD).</em></a> Directive 2022/2464/EU.',
      },
      {
        short: "APRA (2021). CPG 229 Climate Change Financial Risks.",
        html: 'APRA (2021). <a href="https://www.apra.gov.au/sites/default/files/2021-11/Final%20Prudential%20Practice%20Guide%20CPG%20229%20Climate%20Change%20Financial%20Risks.pdf" target="_blank" rel="noopener noreferrer"><em>CPG 229 Climate Change Financial Risks.</em></a> Australian Prudential Regulation Authority.',
      },
      {
        short: "Gauthier (2021). Federal Reserve warns of financial risks from climate change.",
        html: 'Gauthier, V. (2021). <a href="https://blogs.edf.org/growingreturns/2021/01/12/financial-risks-climate-change-agricultural-banks/" target="_blank" rel="noopener noreferrer"><em>Federal Reserve warns of financial risks from climate change. Agricultural banks must act fast.</em></a> Environmental Defense Fund, Growing Returns. Citing Rabobank July 2020 climate stress test.',
      },
      {
        short: "UNEP FI (2023). Climate Risks in the Agriculture Sector.",
        html: 'UNEP FI (2023). <a href="https://www.unepfi.org/themes/climate-change/climate-risks-in-the-agriculture-sector/" target="_blank" rel="noopener noreferrer"><em>Climate Risks in the Agriculture Sector.</em></a> United Nations Environment Programme Finance Initiative.',
      },
      {
        short: "Nuveen for PRI (2021). A climate risk framework for farmland investments.",
        html: 'Nuveen for PRI (2021). <a href="https://www.unpri.org/farmland/a-climate-risk-framework-for-farmland-investments/8879.article" target="_blank" rel="noopener noreferrer"><em>A climate risk framework for farmland investments.</em></a> Principles for Responsible Investment.',
      },
      {
        short: "FBN (2025). How Irrigation Affects Farmland Value.",
        html: 'FBN (2025). <a href="https://www.fbn.com/community/blog/how-does-irrigation-affect-farmland-value" target="_blank" rel="noopener noreferrer"><em>How Irrigation Affects Farmland Value.</em></a> Farmer\'s Business Network.',
      },
      {
        short: "Caparas et al. (2021). Increasing risks of crop failure and water scarcity in global breadbaskets by 2030.",
        html: 'Caparas, M., Zobel, Z., Castanho, A.D.A., &amp; Schwalm, C.R. (2021). <a href="https://doi.org/10.1088/1748-9326/ac22c1" target="_blank" rel="noopener noreferrer"><em>Increasing risks of crop failure and water scarcity in global breadbaskets by 2030.</em></a> Environmental Research Letters, 16(10), 104013.',
      },
      {
        short: "Hughes et al. (2023). An economic model of spatial and temporal water trade in the southern Murray-Darling Basin.",
        html: 'Hughes, N., Gupta, M., Whittle, L., &amp; Westwood, T. (2023). <a href="https://doi.org/10.1029/2022WR032559" target="_blank" rel="noopener noreferrer"><em>An economic model of spatial and temporal water trade in the Australian southern Murray-Darling Basin.</em></a> Water Resources Research, 59, e2022WR032559.',
      },
      {
        short: "Jalilov et al. (2025). Sensitivity of agricultural outcomes to water allocation scenarios in the Murray-Darling Basin.",
        html: 'Jalilov, S., Watto, M.A., Robertson, D.E., Wahid, S.M., &amp; Shokri, A. (2025). <a href="https://doi.org/10.1016/j.agwat.2025.109609" target="_blank" rel="noopener noreferrer"><em>Sensitivity of agricultural outcomes to water allocation scenarios under changing climate in the Murray-Darling Basin, Australia.</em></a> Agricultural Water Management, 317, 109609.',
      },
      {
        short: "Vatter et al. (2021). Tackling growing water risks in the food sector.",
        html: 'Vatter, J., Laporte-Bisquit, A., Camargo, R., &amp; Morgan, A. (2021). <a href="https://wwf.panda.org/discover/our_focus/freshwater_practice/water_risk_filter/wwf-wrf-tackling-growing-water-risks-in-foodsector-2021_1.pdf" target="_blank" rel="noopener noreferrer"><em>Tackling growing water risks in the food sector: How scenario analysis can help food retailers understand future risk and build resilience.</em></a> WWF Germany.',
      },
      {
        short: "Zhao, Ancev & Vervoort (2024). Water market functionality: Evidence from the Australian experience.",
        html: 'Zhao, M., Ancev, T. &amp; Vervoort, R.W. (2024). <a href="https://doi.org/10.1029/2022WR033938" target="_blank" rel="noopener noreferrer"><em>Water market functionality: Evidence from the Australian experience.</em></a> Water Resources Research, 60, e2022WR033938.',
      },
    ],
  },
  {
    id: "2",
    slug: "european-climate-disclosure-irrigated-agriculture",
    category: "Water Risk",
    title:
      "European climate disclosure and irrigated agriculture: the quantification gap nobody is talking about",
    subtitle:
      "Why the first wave of CSRD reports is likely understating the physical water risk in Mediterranean agricultural portfolios.",
    date: "May 2026",
    image: blogCsrdIrrigation.url,
    imageAlt:
      "Cyanotype of an irrigation pivot in a Mediterranean field with EU flag stars",
    sections: [
      {
        paragraphs: [
          "European agricultural lenders and farmland asset managers in the first wave of mandatory CSRD reporting completed their initial disclosure cycle in 2025, covering FY2024. With the Omnibus I Directive now in force and Wave 2 reporting delayed to 2028, attention is shifting from compliance mechanics to the quality of what is actually being disclosed. For any institution with material exposure to irrigated agriculture in Southern Europe, that shift surfaces a specific and largely unresolved problem.",
          "Physical water risk in Mediterranean irrigated systems is not a background hazard. It is the primary risk driver, and the one that current disclosure practice handles least adequately.",
        ],
      },
      {
        heading: "What the regulatory stack actually demands",
        paragraphs: [
          "CSRD and the ESRS standards came into force for Wave 1 entities reporting on FY2024 [1]. Following the Omnibus I Directive and Stop-the-Clock measures adopted in 2025, Wave 2 reporting has been delayed to 2028. The core disclosure requirements for Wave 1 institutions remain in place: a double materiality assessment, physical climate risk identification, and scenario analysis demonstrating how climate conditions affect financial resilience. ESRS E1 requires physical climate risk to be assessed under at least two climate scenarios, covering short, medium, and long-term horizons. Where physical risks are assessed as material under double materiality, quantitative financial impact disclosure is the standard to work toward.",
          "The ECB has been unambiguous about the implication for agricultural lenders. Its 2022 climate stress test found that banks' vulnerability to a drought and heat scenario is highly dependent on sectoral activities and the geographical location of their exposures, with agriculture among the hardest-hit sectors. The impact materialises through a decrease in sectoral productivity and an increase in loan losses in affected areas [2]. That finding applies directly to any European bank with loan books concentrated in Mediterranean irrigated farming regions.",
          "Yet the same 2022 stress test found that just 20% of banks considered climate risk as a variable when granting loans, and most did not include climate risk in their credit risk models [2]. ECB supervisory pressure has increased since then, but the gap between what supervisors expect and what institutions actually disclose on physical agricultural risk remains wide, and narrowing it requires more than a basin-level hazard score.",
        ],
      },
      {
        heading: "Why Mediterranean irrigated agriculture is the specific pressure point",
        paragraphs: [
          "Mediterranean countries like Spain, Italy, and Greece experience the highest levels of water stress in the EU, driven by a dry climate and heavy agricultural water consumption. Agriculture is the largest water user across EU member states and is particularly vulnerable to water scarcity [3]. That vulnerability is not evenly distributed. It is concentrated in irrigated permanent crops and field crops across the Mediterranean arc.",
          "The numbers from the ground are striking. In the Axarquía region of southern Spain, a major avocado and mango production area, reservoir levels dropped below the 8% outlet threshold between 2019 and 2024, dam water for irrigation was entirely suspended in November 2022, and socioeconomic impacts ranged from substantial crop losses to a potential long-term decline in regional economic viability [4]. This is not a projected scenario. It happened, within the loan book horizon of every agricultural lender with Spanish exposure.",
          "A systematic review of 44 studies on future water availability for Mediterranean agriculture under climate change scenarios found that future Mediterranean water reserves may not meet agricultural water demands, due to reduced reservoir inflows [5]. The direction of travel is consistent across the literature.",
          "What is not consistent is how financial institutions are translating this physical signal into credit risk and asset valuation terms.",
        ],
      },
      {
        heading: "The gap between hazard identification and financial quantification",
        paragraphs: [
          "Standard physical climate risk tools, including the basin-level drought indices and water stress scores that populate most ESRS E1 disclosures, tell an institution that a location sits in a high-stress region. They do not tell it what that stress costs.",
          "For irrigated agriculture specifically, the translation from physical hazard to financial outcome requires crop-level modelling that accounts for how different crops respond to water deficits at specific growth stages, how irrigation systems mediate between available water and crop water supply, and how climate scenarios affect yield distributions rather than just average conditions. A drought stress score for Almería province does not tell a lender whether their olive or almond borrowers face a 10% or 40% revenue reduction in a dry year equivalent to 2022 conditions.",
          "The ongoing climate crisis and growing water scarcity are exerting increasing pressure on agriculture in Southern and Western Europe, leading to reduced crop yields, greater risk of land abandonment, and deterioration of soil quality [6]. For a lender or farmland fund, each of those outcomes has a different financial mechanism: yield reduction affects revenue, land abandonment affects collateral values, and soil deterioration affects long-term productivity premia. Disaggregating these effects requires physically-grounded crop-water simulation at the asset level, not a regional hazard index.",
        ],
      },
      {
        heading: "What adequate quantification looks like",
        paragraphs: [
          "ESRS E1 scenario analysis for irrigated agricultural exposure requires a chain that most current practice does not complete: from climate forcing (temperature, precipitation, evapotranspiration) through crop water demand, irrigation water availability, and yield outcome, to revenue distribution and ultimately financial impact under named scenarios.",
          "This chain is buildable from open-source climate data and FAO-calibrated crop simulation models. The same approach applies to almonds in Andalusia, olives in Puglia, or cotton in Greece, wherever irrigated crop revenue is material to an institution's portfolio.",
          "The regulatory requirement is here. The physical risk is visible and in some regions already materialising. The gap is in the financial translation, connecting the physics of Mediterranean water stress to the asset-level revenue and collateral exposure that ESRS E1 and ECB supervisory expectations now require.",
        ],
      },
    ],
    references: [
      {
        short: "European Commission (2022). Corporate Sustainability Reporting Directive (CSRD).",
        html: 'European Commission (2022). <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464" target="_blank" rel="noopener noreferrer"><em>Corporate Sustainability Reporting Directive (CSRD).</em></a> Directive 2022/2464/EU. ESRS E1 Climate Change standard adopted as Delegated Regulation (EU) 2023/2772.',
      },
      {
        short: "ECB Banking Supervision (2022). 2022 Climate Risk Stress Test.",
        html: 'ECB Banking Supervision (2022). <a href="https://www.bankingsupervision.europa.eu/ecb/pub/pdf/ssm.climate_stress_test_report.20220708~2e3cc0999f.en.pdf" target="_blank" rel="noopener noreferrer"><em>2022 Climate Risk Stress Test.</em></a> European Central Bank.',
      },
      {
        short: "EPRS (2025). The future of water availability and use in the EU.",
        html: 'European Parliament Research Service (2025). <a href="https://www.europarl.europa.eu/RegData/etudes/STUD/2025/765769/EPRS_STU(2025)765769_EN.pdf" target="_blank" rel="noopener noreferrer"><em>The future of water availability and use in the EU.</em></a> EPRS Study PE 765769.',
      },
      {
        short: "Contreras-López et al. (2025). Severe water crisis in southern Spain under expanding irrigated agriculture.",
        html: 'Contreras-López, M. et al. (2025). <a href="https://doi.org/10.1073/pnas.2508055122" target="_blank" rel="noopener noreferrer"><em>Severe water crisis in southern Spain under expanding irrigated agriculture: A multidimensional drought analysis.</em></a> PNAS, 122(39).',
      },
      {
        short: "Torresan et al. (2024). Future agricultural water availability in Mediterranean countries under climate change.",
        html: 'Torresan, C. et al. (2024). <a href="https://doi.org/10.3390/w16172484" target="_blank" rel="noopener noreferrer"><em>Future agricultural water availability in Mediterranean countries under climate change: A systematic review.</em></a> Water, 16(17), 2484.',
      },
      {
        short: "Scalone et al. (2025). Climate crises and agricultural drought: evolutions in water scarcity context at the farm level.",
        html: 'Scalone, M. et al. (2025). <a href="https://doi.org/10.3390/earth6020056" target="_blank" rel="noopener noreferrer"><em>Climate crises and agricultural drought: evolutions in water scarcity context at the farm level.</em></a> Earth, 6(2), 56.',
      },
    ],
  },
];
