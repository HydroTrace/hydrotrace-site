import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

type Rec = {
  crop: string;
  timing: string;
  irrigation: string;
  allocation: string;
  schedule: string;
  yield_p10: number;
  yield_p25: number;
  yield_p50: number;
  yield_p75: number;
  yield_p90: number;
  irr_applied_mean_mm: number;
  yields_raw: number[];
};

const CROPS = ["Cotton", "Wheat", "Maize", "Sorghum", "Sunflower", "SugarBeet"] as const;
const CROP_LABELS: Rec<string, string> = {
  Cotton: "Cotton",
  Wheat: "Wheat",
  Maize: "Maize",
  Sorghum: "Sorghum",
  Sunflower: "Sunflower",
  SugarBeet: "Sugar beet",
};
const TIMINGS = ["Early", "Normal", "Late"] as const;
const IRRIGATION_LABELS = ["Flood / furrow", "Sprinkler", "Drip / micro", "Rainfed"] as const;
const IRRIGATION_MAP: Rec<string, string> = {
  "Flood / furrow": "flood",
  Sprinkler: "sprinkler",
  "Drip / micro": "drip",
  Rainfed: "rainfed",
};

const CROP_DEFAULTS: Rec<string, { price: number; loan: number }> = {
  Cotton: { price: 580, loan: 4000 },
  Wheat: { price: 320, loan: 2500 },
  Maize: { price: 280, loan: 2000 },
  Sorghum: { price: 250, loan: 1500 },
  Sunflower: { price: 500, loan: 1800 },
  SugarBeet: { price: 45, loan: 3000 },
};

const OP_COST_PER_HA = 1200;
const DEBT_RATE = 0.065;

const COL = {
  bg: "#0e0e0e",
  text: "#e8e8e8",
  sub: "#888888",
  tert: "#555555",
  border: "rgba(255,255,255,0.12)",
  card: "rgba(255,255,255,0.04)",
  physical: "#4B5FDB",
  optimised: "#9B4FD4",
  breach: "#E8527A",
  danger: "#E84F3A",
  aqueduct: "#F5A623",
};

const AQUEDUCT = {
  label: "Medium - High",
  score: 2,
  scoreMax: 4,
  peakLabel: "High (40–80%)",
  peakMonth: "April",
  region: "Irrigated semi-arid",
  source: "WRI Aqueduct 4.0 baseline monthly",
  note: "Score unchanged regardless of crop type, water availability, irrigation method, or management strategy.",
};

function normalCDF(z: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))));
  return z > 0 ? 1 - p : p;
}

function computeFinancials(
  yieldsRaw: number[],
  price: number,
  farmHa: number,
  loanPerHa: number,
  dscrCovenant: number,
) {
  const n = yieldsRaw.length;
  const opCost = OP_COST_PER_HA * farmHa;
  const debtService = loanPerHa * farmHa * DEBT_RATE;
  const revenues = yieldsRaw.map((y) => y * price * farmHa);
  const dscrs = revenues.map((r) => (r - opCost) / debtService);
  const revSorted = [...revenues].sort((a, b) => a - b);
  const dscrSorted = [...dscrs].sort((a, b) => a - b);
  const revP10 = revSorted[Math.floor(n * 0.1)];
  const revP50 = revSorted[Math.floor(n * 0.5)];
  const revP90 = revSorted[Math.floor(n * 0.9)];
  const dscrP50 = dscrSorted[Math.floor(n * 0.5)];
  const dscrMean = dscrs.reduce((a, b) => a + b, 0) / n;
  const dscrStd = Math.sqrt(
    dscrs.map((d) => Math.pow(d - dscrMean, 2)).reduce((a, b) => a + b, 0) / n,
  );
  const z =
    dscrStd > 0
      ? (dscrCovenant - dscrMean) / dscrStd
      : dscrMean < dscrCovenant
        ? 99
        : -99;
  const breachProb = Math.round(normalCDF(z) * 100);
  const revAtRisk =
    revP50 > 0 ? Math.round(((revP50 - revP10) / revP50) * 1000) / 10 : 0;
  return { revP10, revP50, revP90, dscrP50, breachProb, revAtRisk, n };
}

function gwCost(irrAppliedMm: number, farmHa: number, depthM: number) {
  const volML = (irrAppliedMm * farmHa * 10) / 1000;
  const kwhPerML = depthM * 1.6;
  const cost = Math.round(volML * kwhPerML * 0.18);
  const costPerML = Math.round(kwhPerML * 0.18 * 100) / 100;
  return { volML: Math.round(volML * 10) / 10, cost, costPerML };
}

function formatRevenue(val: number) {
  if (Math.abs(val) >= 1_000_000) return `${(val / 1_000_000).toFixed(2)}M`;
  if (Math.abs(val) >= 1000) return `${Math.round(val / 1000)}k`;
  return `${Math.round(val)}`;
}

function formatInt(v: number) {
  return Math.round(v).toLocaleString("en-US");
}

// Generic styled slider
function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  disabled,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className="rx-slider"
      style={{
        background: `linear-gradient(to right, ${COL.physical} 0%, ${COL.physical} ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        opacity: disabled ? 0.35 : 1,
      }}
    />
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: COL.card,
        border: `1px solid ${COL.border}`,
        borderRadius: 10,
        padding: 14,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: COL.tert,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function Toggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              flex: 1,
              minWidth: 0,
              padding: "6px 8px",
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 12,
              borderRadius: 6,
              cursor: "pointer",
              background: active ? "rgba(75,95,219,0.15)" : "transparent",
              border: active
                ? "1px solid rgba(75,95,219,0.4)"
                : `1px solid ${COL.border}`,
              color: active ? "#8090e8" : COL.tert,
              transition: "all 150ms ease",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Dropdown({
  value,
  options,
  onChange,
  renderLabel,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  renderLabel?: (v: string) => string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: "transparent",
        border: `1px solid ${COL.border}`,
        borderRadius: 6,
        color: COL.text,
        fontFamily: "'Open Sans', sans-serif",
        fontSize: 13,
        padding: "8px 10px",
        cursor: "pointer",
      }}
    >
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "#1a1a1a" }}>
          {renderLabel ? renderLabel(o) : o}
        </option>
      ))}
    </select>
  );
}

const DEPTH_SNAPS = [5, 15, 30, 50, 80];

export default function RiskExplorer() {
  const [records, setRecords] = useState<Record[] | null>(null);
  const [index, setIndex] = useState<Map<string, Rec>>(new Map());

  // Controls
  const [crop, setCrop] = useState<string>("Cotton");
  const [timing, setTiming] = useState<(typeof TIMINGS)[number]>("Normal");
  const [source, setSource] = useState<"Surface water" | "Groundwater">(
    "Surface water",
  );
  const [allocationPct, setAllocationPct] = useState(60);
  const [depthM, setDepthM] = useState(15);
  const [irrigationMethod, setIrrigationMethod] =
    useState<(typeof IRRIGATION_LABELS)[number]>("Flood / furrow");
  const [schedule, setSchedule] = useState<"Standard" | "Deficit-optimised">(
    "Deficit-optimised",
  );

  const [farmHa, setFarmHa] = useState(500);
  const [price, setPrice] = useState(CROP_DEFAULTS.Cotton.price);
  const [loanPerHa, setLoanPerHa] = useState(CROP_DEFAULTS.Cotton.loan);
  const [dscrCovenant, setDscrCovenant] = useState(1.25);

  useEffect(() => {
    fetch("/data/sweep_results.json")
      .then((r) => r.json())
      .then((data: Rec[]) => {
        setRecords(data);
        const m = new Map<string, Rec>();
        data.forEach((r) => {
          m.set(
            `${r.crop}|${r.timing}|${r.irrigation}|${r.allocation}|${r.schedule}`,
            r,
          );
        });
        setIndex(m);
      })
      .catch((e) => console.error("Failed to load sweep_results.json", e));
  }, []);

  // Reset price/loan when crop changes
  useEffect(() => {
    const d = CROP_DEFAULTS[crop];
    setPrice(d.price);
    setLoanPerHa(d.loan);
  }, [crop]);

  const isRainfed = irrigationMethod === "Rainfed";
  const sliderDisabled = isRainfed;

  const record = useMemo(() => {
    const irrigationKey = IRRIGATION_MAP[irrigationMethod];
    const allocationKey = isRainfed ? "p100" : `p${allocationPct}`;
    const scheduleKey = schedule === "Deficit-optimised" ? "optimised" : "standard";
    const key = `${crop}|${timing}|${irrigationKey}|${allocationKey}|${scheduleKey}`;
    return index.get(key);
  }, [crop, timing, irrigationMethod, allocationPct, schedule, index, isRainfed]);

  const fin = useMemo(() => {
    if (!record) return null;
    return computeFinancials(
      record.yields_raw,
      price,
      farmHa,
      loanPerHa,
      dscrCovenant,
    );
  }, [record, price, farmHa, loanPerHa, dscrCovenant]);

  const priceMin = Math.max(
    10,
    Math.round((CROP_DEFAULTS[crop].price * 0.6) / 10) * 10,
  );
  const priceMax = Math.round((CROP_DEFAULTS[crop].price * 1.4) / 10) * 10;

  // Clamp price when crop changes range — already handled by reset on crop change
  useEffect(() => {
    if (price < priceMin) setPrice(priceMin);
    if (price > priceMax) setPrice(priceMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop]);

  const gw = useMemo(() => {
    if (!record) return null;
    return gwCost(record.irr_applied_mean_mm, farmHa, depthM);
  }, [record, farmHa, depthM]);

  const yieldPs = record
    ? [
        { k: "P10", v: record.yield_p10, op: 0.2 },
        { k: "P25", v: record.yield_p25, op: 0.4 },
        { k: "P50", v: record.yield_p50, op: 1 },
        { k: "P75", v: record.yield_p75, op: 0.6 },
        { k: "P90", v: record.yield_p90, op: 0.35 },
      ]
    : [];
  const yieldMax = yieldPs.length
    ? Math.max(...yieldPs.map((p) => p.v))
    : 1;

  // Colour logic
  const dscrColor =
    fin && fin.dscrP50 >= dscrCovenant ? COL.physical : COL.breach;
  const breachColor =
    fin && fin.breachProb > 25
      ? COL.breach
      : fin && fin.breachProb >= 10
        ? COL.aqueduct
        : COL.physical;

  return (
    <div style={{ background: COL.bg, minHeight: "100vh", color: COL.text }}>
      <style>{`
        .rx-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 3px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        .rx-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e8e8e8;
          border: 2px solid #4B5FDB;
          cursor: pointer;
        }
        .rx-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e8e8e8;
          border: 2px solid #4B5FDB;
          cursor: pointer;
          border: none;
        }
      `}</style>
      <Navbar />

      {/* Intro */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "140px 24px 32px" }}>
        <h1
          style={{
            fontFamily: "'Reckless Neue', serif",
            fontWeight: 300,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            color: COL.text,
            margin: 0,
          }}
        >
          What basin screening misses
        </h1>
        <h2
          style={{
            fontFamily: "'DM Serif Display', 'DM Serif Text', serif",
            fontSize: "clamp(18px, 2vw, 24px)",
            color: COL.sub,
            fontWeight: 400,
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          Basin-level tools tell you where water stress exists. This tool shows what it costs.
        </h2>
        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: 14,
            lineHeight: 1.6,
            color: COL.sub,
            maxWidth: 880,
            margin: 0,
          }}
        >
          This explorer draws on 1,116 AquaCrop crop-water simulations across a
          representative semi-arid irrigated agriculture profile. Adjust crop
          type, water availability, irrigation method, and financial parameters
          to see how physical water stress translates into financial exposure —
          and why basin-level screening alone cannot answer that question.
          Site-specific analysis using your actual climate data and asset
          parameters is available on request.
        </p>
      </div>

      {/* Tool */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 64px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 16,
          }}
          className="rx-grid"
        >
          {/* Controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Card>
              <SectionLabel>Crop</SectionLabel>
              <Dropdown
                value={crop}
                options={CROPS}
                onChange={(v) => setCrop(v)}
                renderLabel={(v) => CROP_LABELS[v] || v}
              />
              <div style={{ height: 12 }} />
              <SectionLabel>Planting timing</SectionLabel>
              <Toggle options={TIMINGS} value={timing} onChange={setTiming} />
            </Card>

            <Card>
              <SectionLabel>Water source</SectionLabel>
              <Toggle
                options={["Surface water", "Groundwater"] as const}
                value={source}
                onChange={setSource}
              />
              {source === "Surface water" ? (
                <div style={{ marginTop: 14 }}>
                  <SectionLabel>Water allocation</SectionLabel>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 12,
                      color: COL.text,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: COL.sub }}>
                      {isRainfed ? "—" : `${allocationPct}%`}
                    </span>
                  </div>
                  <RangeSlider
                    min={10}
                    max={100}
                    step={10}
                    value={allocationPct}
                    onChange={setAllocationPct}
                    disabled={sliderDisabled}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 10,
                      color: COL.tert,
                      marginTop: 6,
                    }}
                  >
                    <span>Low reliability</span>
                    <span>Full allocation</span>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 14 }}>
                  <SectionLabel>Water table depth</SectionLabel>
                  <div
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 12,
                      color: COL.sub,
                      marginBottom: 6,
                    }}
                  >
                    {depthM} m
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={DEPTH_SNAPS.length - 1}
                    step={1}
                    value={DEPTH_SNAPS.indexOf(depthM)}
                    onChange={(e) =>
                      setDepthM(DEPTH_SNAPS[Number(e.target.value)])
                    }
                    className="rx-slider"
                    style={{
                      background: `linear-gradient(to right, ${COL.physical} 0%, ${COL.physical} ${
                        (DEPTH_SNAPS.indexOf(depthM) / (DEPTH_SNAPS.length - 1)) * 100
                      }%, rgba(255,255,255,0.08) ${
                        (DEPTH_SNAPS.indexOf(depthM) / (DEPTH_SNAPS.length - 1)) * 100
                      }%, rgba(255,255,255,0.08) 100%)`,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 10,
                      color: COL.tert,
                      marginTop: 6,
                    }}
                  >
                    {DEPTH_SNAPS.map((d) => (
                      <span key={d}>{d}m</span>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <SectionLabel>Irrigation method</SectionLabel>
              <Dropdown
                value={irrigationMethod}
                options={IRRIGATION_LABELS}
                onChange={(v) =>
                  setIrrigationMethod(v as (typeof IRRIGATION_LABELS)[number])
                }
              />
              <div style={{ height: 12 }} />
              <SectionLabel>Scheduling</SectionLabel>
              <Toggle
                options={["Standard", "Deficit-optimised"] as const}
                value={schedule}
                onChange={setSchedule}
              />
            </Card>

            <Card>
              <SectionLabel>Financial parameters</SectionLabel>
              <FinancialSlider
                label="Farm area"
                value={farmHa}
                display={`${formatInt(farmHa)} ha`}
                min={50}
                max={2000}
                step={50}
                onChange={setFarmHa}
              />
              <FinancialSlider
                label="Commodity price"
                value={price}
                display={`$${formatInt(price)} /t`}
                min={priceMin}
                max={priceMax}
                step={10}
                onChange={setPrice}
              />
              <FinancialSlider
                label="Loan per hectare"
                value={loanPerHa}
                display={`$${formatInt(loanPerHa)} /ha`}
                min={500}
                max={8000}
                step={500}
                onChange={setLoanPerHa}
              />
              <FinancialSlider
                label="DSCR covenant"
                value={dscrCovenant}
                display={`${dscrCovenant.toFixed(2)}×`}
                min={1.1}
                max={1.4}
                step={0.05}
                onChange={setDscrCovenant}
              />
            </Card>
          </div>

          {/* Outputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Metric strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
              }}
              className="rx-metrics"
            >
              <MetricTile
                label="Yield P50"
                value={record ? `${record.yield_p50.toFixed(2)} t/ha` : "—"}
                color={COL.physical}
                subtext={
                  record
                    ? `P10: ${record.yield_p10.toFixed(2)} · P90: ${record.yield_p90.toFixed(2)}`
                    : ""
                }
              />
              <MetricTile
                label="Revenue P50"
                value={fin ? `$${formatRevenue(fin.revP50)}` : "—"}
                color={COL.physical}
                subtext={`${formatInt(farmHa)}ha · $${formatInt(price)}/t`}
              />
              <MetricTile
                label="DSCR P50"
                value={fin ? `${fin.dscrP50.toFixed(2)}×` : "—"}
                color={dscrColor}
                subtext={`covenant ${dscrCovenant.toFixed(2)}×`}
              />
              <MetricTile
                label="Breach probability"
                value={fin ? `${fin.breachProb}%` : "—"}
                color={breachColor}
                subtext="of simulated seasons"
              />
            </div>

            {/* Comparison panels */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
              className="rx-compare"
            >
              {/* Aqueduct */}
              <div
                style={{
                  background: COL.card,
                  border: "1px solid rgba(245,166,35,0.2)",
                  borderRadius: 10,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', 'DM Serif Text', serif",
                      fontSize: 18,
                      color: COL.text,
                      margin: 0,
                    }}
                  >
                    Basin screening — Aqueduct 4.0
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 10,
                      color: COL.aqueduct,
                      border: "1px solid rgba(245,166,35,0.3)",
                      background: "rgba(245,166,35,0.08)",
                      borderRadius: 999,
                      padding: "3px 8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Irrigated semi-arid · April peak
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Serif Display', 'DM Serif Text', serif",
                    fontSize: 28,
                    color: COL.aqueduct,
                    marginTop: 14,
                  }}
                >
                  {AQUEDUCT.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 12,
                    color: COL.sub,
                    marginTop: 4,
                  }}
                >
                  Score {AQUEDUCT.score} / {AQUEDUCT.scoreMax} · Peak season:{" "}
                  {AQUEDUCT.peakLabel}
                </div>
                <div
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 11,
                    fontStyle: "italic",
                    color: COL.tert,
                    marginTop: 10,
                  }}
                >
                  {AQUEDUCT.note}
                </div>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Yield estimate", "Revenue at risk", "DSCR stress", "Covenant breach"].map(
                    (l) => (
                      <div
                        key={l}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: 12,
                          color: COL.sub,
                          borderTop: `1px solid ${COL.border}`,
                          paddingTop: 8,
                        }}
                      >
                        <span>{l}</span>
                        <span style={{ color: "#333" }}>—</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Physical */}
              <div
                style={{
                  background: COL.card,
                  border: "1px solid rgba(75,95,219,0.25)",
                  borderRadius: 10,
                  padding: 18,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', 'DM Serif Text', serif",
                    fontSize: 18,
                    color: COL.text,
                    margin: 0,
                  }}
                >
                  Physical crop-water model · HydroTrace
                </h3>
                <div
                  style={{
                    marginTop: 16,
                    height: 110,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 10,
                  }}
                >
                  {yieldPs.map((p) => {
                    const h = (p.v / yieldMax) * 100;
                    return (
                      <div
                        key={p.k}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                          height: "100%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontSize: 10,
                            color: COL.sub,
                          }}
                        >
                          {p.v.toFixed(2)}
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: `${h}%`,
                            background: COL.physical,
                            opacity: p.op,
                            borderRadius: "3px 3px 0 0",
                            transition: "height 200ms ease",
                          }}
                        />
                        <div
                          style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontSize: 10,
                            color: COL.tert,
                          }}
                        >
                          {p.k}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderTop: `1px solid ${COL.border}`,
                    paddingTop: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 12,
                      color: COL.sub,
                    }}
                  >
                    Revenue at risk
                  </span>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 14,
                      color: COL.breach,
                    }}
                  >
                    {fin
                      ? `${fin.revAtRisk.toFixed(1)}% — $${formatRevenue(
                          fin.revP50 - fin.revP10,
                        )}`
                      : "—"}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderTop: `1px solid ${COL.border}`,
                    paddingTop: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: 11,
                        color: COL.tert,
                      }}
                    >
                      DSCR P50
                    </div>
                    <div
                      style={{
                        fontFamily:
                          "'DM Serif Display', 'DM Serif Text', serif",
                        fontSize: 24,
                        color: dscrColor,
                        marginTop: 2,
                      }}
                    >
                      {fin ? `${fin.dscrP50.toFixed(2)}×` : "—"}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 11,
                      color: COL.tert,
                      textAlign: "right",
                    }}
                  >
                    covenant {dscrCovenant.toFixed(2)}×
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    borderTop: `1px solid ${COL.border}`,
                    paddingTop: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: 12,
                        color: COL.breach,
                      }}
                    >
                      Breach probability {fin ? `${fin.breachProb}%` : "—"}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: 11,
                        color: COL.tert,
                      }}
                    >
                      {fin ? `${fin.n} seasons simulated` : ""}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      height: 3,
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${fin ? fin.breachProb : 0}%`,
                        height: "100%",
                        background: COL.breach,
                        transition: "width 200ms ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Groundwater strip */}
            {source === "Groundwater" && (
              <div
                style={{
                  background: COL.card,
                  border: `1px solid ${COL.border}`,
                  borderRadius: 10,
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 12,
                    color: COL.sub,
                  }}
                >
                  Annual pumping cost at {depthM}m depth
                </span>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', 'DM Serif Text', serif",
                    fontSize: 20,
                    color: COL.text,
                  }}
                >
                  ${gw ? formatInt(gw.cost) : "—"}
                </span>
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: 11,
                    color: COL.tert,
                  }}
                >
                  {gw
                    ? `${gw.volML.toFixed(1)} ML abstracted · $${gw.costPerML.toFixed(2)} /ML`
                    : ""}
                </span>
              </div>
            )}

            {/* Upsell */}
            <div
              style={{
                background: COL.card,
                border: `1px solid ${COL.border}`,
                borderRadius: 10,
                padding: "14px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 12,
                  color: COL.sub,
                  maxWidth: 720,
                  lineHeight: 1.5,
                }}
              >
                This uses a representative semi-arid climate profile.
                Site-specific analysis uses your actual climate forcing, water
                licence data, soil profile, and CMIP6 projections to 2050.
              </span>
              <a
                href="mailto:info@hydrotrace.io"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 13,
                  color: "#8090e8",
                  border: "1px solid rgba(75,95,219,0.4)",
                  background: "rgba(75,95,219,0.1)",
                  padding: "8px 14px",
                  borderRadius: 6,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .rx-grid { grid-template-columns: 1fr !important; }
          .rx-metrics { grid-template-columns: repeat(2, 1fr) !important; }
          .rx-compare { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function FinancialSlider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 11,
          color: COL.tert,
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        <span>{label}</span>
        <span style={{ color: COL.text, textTransform: "none" }}>{display}</span>
      </div>
      <RangeSlider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function MetricTile({
  label,
  value,
  color,
  subtext,
}: {
  label: string;
  value: string;
  color: string;
  subtext: string;
}) {
  return (
    <div
      style={{
        background: COL.card,
        border: `1px solid ${COL.border}`,
        borderRadius: 10,
        padding: 14,
      }}
    >
      <div
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: COL.tert,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'DM Serif Display', 'DM Serif Text', serif",
          fontSize: 26,
          color,
          marginTop: 6,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 11,
          color: COL.tert,
          marginTop: 4,
        }}
      >
        {subtext}
      </div>
    </div>
  );
}
