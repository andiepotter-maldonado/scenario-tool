import { useState, useMemo, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine, CartesianGrid } from "recharts";

const CURVE_DATA = [
  {geography:"NSW",channel:"bvod",max_spend:102705.6,midpoint:78251.89,scaling_ratio:111459.14,slope:4.13,confidence:1.80},
  {geography:"NSW",channel:"digital_audio",max_spend:32483.7,midpoint:16498.56,scaling_ratio:34671.52,slope:5.05,confidence:1.79},
  {geography:"NSW",channel:"display",max_spend:17243.14,midpoint:10499.39,scaling_ratio:17028.57,slope:13.29,confidence:4.53},
  {geography:"NSW",channel:"fta_tv",max_spend:337005.3,midpoint:215328.17,scaling_ratio:215421.66,slope:6.18,confidence:1.76},
  {geography:"NSW",channel:"meta",max_spend:57838.39,midpoint:29855.07,scaling_ratio:57474.31,slope:11.37,confidence:4.37},
  {geography:"NSW",channel:"native_articles",max_spend:2293.58,midpoint:1127.87,scaling_ratio:2104.57,slope:5.48,confidence:1.75},
  {geography:"NSW",channel:"ooh",max_spend:101673.6,midpoint:32903.36,scaling_ratio:94841.97,slope:4.31,confidence:1.87},
  {geography:"NSW",channel:"podcast",max_spend:8761.94,midpoint:5177.87,scaling_ratio:8135.26,slope:5.20,confidence:1.83},
  {geography:"NSW",channel:"radio",max_spend:69424.2,midpoint:52110.7,scaling_ratio:67954.96,slope:5.63,confidence:1.77},
  {geography:"NSW",channel:"search",max_spend:51376.76,midpoint:14219.77,scaling_ratio:20007.35,slope:2.38,confidence:0.99},
  {geography:"NSW",channel:"svod",max_spend:23625,midpoint:13136.14,scaling_ratio:21077.83,slope:5.69,confidence:1.76},
  {geography:"NSW",channel:"video",max_spend:9431.6,midpoint:5595.75,scaling_ratio:9208.64,slope:5.26,confidence:1.66},
  {geography:"NSW",channel:"youtube",max_spend:60031.38,midpoint:41568.39,scaling_ratio:55884.48,slope:9.54,confidence:3.28},
  {geography:"QLD",channel:"bvod",max_spend:33702,midpoint:19496.87,scaling_ratio:22646.66,slope:6.15,confidence:1.71},
  {geography:"QLD",channel:"digital_audio",max_spend:5241.9,midpoint:3082.45,scaling_ratio:4966.32,slope:5.19,confidence:1.80},
  {geography:"QLD",channel:"display",max_spend:3706.72,midpoint:2152.5,scaling_ratio:4282.13,slope:7.32,confidence:2.79},
  {geography:"QLD",channel:"fta_tv",max_spend:96612.9,midpoint:50281.13,scaling_ratio:56980.72,slope:6.49,confidence:1.63},
  {geography:"QLD",channel:"meta",max_spend:27798,midpoint:11628.54,scaling_ratio:20458.12,slope:10.19,confidence:4.49},
  {geography:"QLD",channel:"native_articles",max_spend:1494.93,midpoint:731.69,scaling_ratio:1373.49,slope:6.03,confidence:1.76},
  {geography:"QLD",channel:"ooh",max_spend:40296.9,midpoint:10424.58,scaling_ratio:21316.59,slope:4.74,confidence:1.76},
  {geography:"QLD",channel:"podcast",max_spend:4274.11,midpoint:2526.68,scaling_ratio:3832.71,slope:5.15,confidence:1.82},
  {geography:"QLD",channel:"radio",max_spend:45431.4,midpoint:29664.39,scaling_ratio:24050.24,slope:6.26,confidence:1.73},
  {geography:"QLD",channel:"search",max_spend:24725.94,midpoint:4506.75,scaling_ratio:5883.61,slope:1.54,confidence:0.97},
  {geography:"QLD",channel:"video",max_spend:2880.21,midpoint:1700.67,scaling_ratio:2656.9,slope:5.50,confidence:1.75},
  {geography:"QLD",channel:"youtube",max_spend:7954.64,midpoint:6027.49,scaling_ratio:7349,slope:4.63,confidence:1.72},
  {geography:"SA",channel:"digital_audio",max_spend:1407,midpoint:848.22,scaling_ratio:1448.17,slope:4.89,confidence:1.85},
  {geography:"SA",channel:"display",max_spend:2091.44,midpoint:1239.67,scaling_ratio:2028.02,slope:7.89,confidence:2.63},
  {geography:"SA",channel:"meta",max_spend:7593.46,midpoint:4763.27,scaling_ratio:7192.31,slope:12.40,confidence:4.51},
  {geography:"SA",channel:"search",max_spend:3830.03,midpoint:590.43,scaling_ratio:671.07,slope:2.37,confidence:0.99},
  {geography:"SA",channel:"video",max_spend:1846.87,midpoint:1030.12,scaling_ratio:1739.75,slope:5.20,confidence:1.78},
  {geography:"SA",channel:"youtube",max_spend:2469.56,midpoint:1434.47,scaling_ratio:2022.65,slope:6.02,confidence:1.67},
  {geography:"VIC",channel:"bvod",max_spend:159798.3,midpoint:120543.96,scaling_ratio:146014.28,slope:4.91,confidence:1.68},
  {geography:"VIC",channel:"digital_audio",max_spend:33708.3,midpoint:23930.62,scaling_ratio:36637,slope:4.59,confidence:1.80},
  {geography:"VIC",channel:"display",max_spend:17711.23,midpoint:10510.98,scaling_ratio:18530.16,slope:12.30,confidence:4.49},
  {geography:"VIC",channel:"fta_tv",max_spend:719393.4,midpoint:417255.53,scaling_ratio:343982.62,slope:7.06,confidence:1.56},
  {geography:"VIC",channel:"meta",max_spend:77953.85,midpoint:44303.64,scaling_ratio:79189.05,slope:10.32,confidence:4.59},
  {geography:"VIC",channel:"native_articles",max_spend:1873.98,midpoint:858.58,scaling_ratio:1711.1,slope:5.65,confidence:1.77},
  {geography:"VIC",channel:"ooh",max_spend:188115.9,midpoint:60758.36,scaling_ratio:133303.38,slope:5.52,confidence:1.81},
  {geography:"VIC",channel:"podcast",max_spend:8334.54,midpoint:4871.88,scaling_ratio:8411.89,slope:5.41,confidence:1.82},
  {geography:"VIC",channel:"radio",max_spend:88485.6,midpoint:64035.44,scaling_ratio:81747.45,slope:5.11,confidence:1.80},
  {geography:"VIC",channel:"search",max_spend:115818.83,midpoint:48205.19,scaling_ratio:79241.44,slope:1.65,confidence:0.96},
  {geography:"VIC",channel:"svod",max_spend:23625,midpoint:12779.07,scaling_ratio:21164.14,slope:6.00,confidence:1.76},
  {geography:"VIC",channel:"video",max_spend:19253.07,midpoint:10546.34,scaling_ratio:15591.42,slope:11.62,confidence:3.48},
  {geography:"VIC",channel:"youtube",max_spend:19808.67,midpoint:14714.23,scaling_ratio:23087.18,slope:9.03,confidence:3.66},
  {geography:"National",channel:"bvod",max_spend:148102.95,midpoint:109146.36,scaling_ratio:196505.05,slope:2.53,confidence:0.63},
  {geography:"National",channel:"digital_audio",max_spend:36420.45,midpoint:22179.93,scaling_ratio:42439.74,slope:2.46,confidence:0.81},
  {geography:"National",channel:"display",max_spend:23986.09,midpoint:14272.22,scaling_ratio:25434.63,slope:7.75,confidence:2.59},
  {geography:"National",channel:"fta_tv",max_spend:576505.8,midpoint:341432.41,scaling_ratio:363058.83,slope:3.29,confidence:0.67},
  {geography:"National",channel:"meta",max_spend:129925.02,midpoint:65798.4,scaling_ratio:143803.96,slope:6.61,confidence:2.47},
  {geography:"National",channel:"native_articles",max_spend:2831.24,midpoint:1359.07,scaling_ratio:2613.31,slope:2.86,confidence:0.87},
  {geography:"National",channel:"ooh",max_spend:165043.2,midpoint:52043.15,scaling_ratio:121354.72,slope:2.43,confidence:0.89},
  {geography:"National",channel:"podcast",max_spend:10685.29,midpoint:6288.21,scaling_ratio:9725.66,slope:2.63,confidence:0.91},
  {geography:"National",channel:"radio",max_spend:102087.41,midpoint:73204.15,scaling_ratio:98752.27,slope:2.83,confidence:0.75},
  {geography:"National",channel:"search",max_spend:195751.56,midpoint:67522.14,scaling_ratio:107866.31,slope:1.99,confidence:0.91},
  {geography:"National",channel:"svod",max_spend:23625,midpoint:12957.61,scaling_ratio:20733.78,slope:2.92,confidence:0.84},
  {geography:"National",channel:"video",max_spend:16705.88,midpoint:9436.44,scaling_ratio:15200.83,slope:5.82,confidence:1.56},
  {geography:"National",channel:"youtube",max_spend:45349.88,midpoint:31992.12,scaling_ratio:73338,slope:4.91,confidence:1.33},
];

const CHANNEL_COLORS = {
  bvod: "#6366F1", digital_audio: "#8B5CF6", display: "#F59E0B",
  fta_tv: "#3B82F6", meta: "#0EA5E9", native_articles: "#6D7280",
  ooh: "#EC4899", podcast: "#14B8A6", radio: "#F97316",
  search: "#10B981", svod: "#A855F7", video: "#EF4444", youtube: "#DC2626",
};

const CHANNEL_LABELS = {
  bvod: "BVOD", digital_audio: "Digital Audio", display: "Display",
  fta_tv: "FTA TV", meta: "Meta", native_articles: "Native Articles",
  ooh: "OOH", podcast: "Podcast", radio: "Radio",
  search: "Search", svod: "SVOD", video: "Video", youtube: "YouTube",
};

const GEOS = ["National", "NSW", "VIC", "QLD", "SA"];

const PERIODS = [
  { label: "1 Week", weeks: 1 },
  { label: "4 Weeks", weeks: 4 },
  { label: "3 Months", weeks: 13 },
  { label: "6 Months", weeks: 26 },
  { label: "12 Months", weeks: 52 },
];

function hill(spend, mid, scale, slope) {
  if (spend <= 0) return 0;
  const sp = Math.pow(spend, slope);
  return scale * sp / (sp + Math.pow(mid, slope));
}

function fmt(v) {
  if (Math.abs(v) >= 1e6) return `$${(v/1e6).toFixed(1)}M`;
  if (Math.abs(v) >= 1e3) return `$${(v/1e3).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
}
function fmtN(v) {
  if (v >= 1e6) return `${(v/1e6).toFixed(2)}M`;
  if (v >= 1e3) return `${(v/1e3).toFixed(1)}K`;
  return v.toFixed(0);
}
function fmtF(v) { return v.toLocaleString("en-AU", { minimumFractionDigits: 1, maximumFractionDigits: 1 }); }

function CurveChart({ channel, params, currentSpend }) {
  const data = useMemo(() => {
    const mx = params.max_spend * 2.5;
    return Array.from({ length: 61 }, (_, i) => {
      const s = (i / 60) * mx;
      return { spend: s, output: hill(s, params.midpoint, params.scaling_ratio, params.slope) };
    });
  }, [params]);
  const co = hill(currentSpend, params.midpoint, params.scaling_ratio, params.slope);
  const c = CHANNEL_COLORS[channel] || "#6366F1";

  return (
    <div style={{ width: "100%", height: 190 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 18, left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F4" />
          <XAxis dataKey="spend" tickFormatter={fmt} tick={{ fill: "#9CA3AF", fontSize: 10 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
          <YAxis tickFormatter={fmtN} tick={{ fill: "#9CA3AF", fontSize: 10 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} width={48} />
          <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }} formatter={v => [`$${fmtF(v)}`, "Output"]} labelFormatter={v => `Spend: ${fmt(v)}`} />
          <Line type="monotone" dataKey="output" stroke={c} strokeWidth={2} dot={false} />
          {currentSpend > 0 && <ReferenceLine x={currentSpend} stroke={c} strokeDasharray="4 4" strokeOpacity={0.5} />}
        </LineChart>
      </ResponsiveContainer>
      {currentSpend > 0 && (
        <div style={{ textAlign: "center", marginTop: -6 }}>
          <span style={{ background: c, color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
            {fmt(currentSpend)} → ${fmtF(co)} output
          </span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [geo, setGeo] = useState("National");
  const [budgets, setBudgets] = useState({});
  const [totalBudget, setTotalBudget] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [tab, setTab] = useState("inputs");
  const [weeks, setWeeks] = useState(1);
  const [disabled, setDisabled] = useState({});

  const periodLabel = PERIODS.find(p => p.weeks === weeks)?.label || `${weeks} Weeks`;
  const toggleChannel = (ch) => setDisabled(p => ({ ...p, [ch]: !p[ch] }));

  const channels = useMemo(() => CURVE_DATA.filter(d => d.geography === geo).sort((a, b) => b.scaling_ratio - a.scaling_ratio), [geo]);

  const forecasts = useMemo(() => channels.map(ch => {
    const totalSpend = disabled[ch.channel] ? 0 : (parseFloat(budgets[ch.channel]) || 0);
    const weeklySpend = totalSpend / weeks;
    const weeklyOutput = hill(weeklySpend, ch.midpoint, ch.scaling_ratio, ch.slope);
    const o = weeklyOutput * weeks;
    const sat = ch.scaling_ratio > 0 ? (weeklyOutput / ch.scaling_ratio) * 100 : 0;
    return { channel: ch.channel, spend: totalSpend, output: o, eff: totalSpend > 0 ? o / totalSpend : 0, sat, maxOut: ch.scaling_ratio, conf: ch.confidence, disabled: !!disabled[ch.channel] };
  }).sort((a, b) => b.output - a.output), [channels, budgets, weeks, disabled]);

  const tSpend = forecasts.reduce((a, f) => a + f.spend, 0);
  const tOut = forecasts.reduce((a, f) => a + f.output, 0);
  const tROI = tSpend > 0 ? ((tOut - tSpend) / tSpend * 100) : 0;
  const active = forecasts.filter(f => f.spend > 0);

  const set = useCallback((ch, v) => setBudgets(p => ({ ...p, [ch]: v })), []);

  const splitEven = () => {
    const t = parseFloat(totalBudget) || 0;
    if (t <= 0) return;
    const enabled = channels.filter(ch => !disabled[ch.channel]);
    if (enabled.length === 0) return;
    const b = {};
    channels.forEach(ch => { b[ch.channel] = disabled[ch.channel] ? "0" : (t / enabled.length).toFixed(0); });
    setBudgets(b);
  };
  const splitCurve = () => {
    const t = parseFloat(totalBudget) || 0;
    if (t <= 0) return;
    const enabled = channels.filter(ch => !disabled[ch.channel]);
    if (enabled.length === 0) return;
    const tm = enabled.reduce((a, c) => a + c.max_spend, 0);
    const b = {};
    channels.forEach(ch => { b[ch.channel] = disabled[ch.channel] ? "0" : ((ch.max_spend / tm) * t).toFixed(0); });
    setBudgets(b);
  };
  const clear = () => { setBudgets({}); setTotalBudget(""); };

  const confBadge = c => ({
    fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, display: "inline-block",
    background: c >= 3 ? "#ECFDF5" : c >= 1.5 ? "#FFFBEB" : "#FEF2F2",
    color: c >= 3 ? "#059669" : c >= 1.5 ? "#D97706" : "#DC2626",
  });
  const satColor = p => p > 80 ? "#DC2626" : p > 50 ? "#D97706" : "#059669";

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", fontFamily: "'Be Vietnam Pro', sans-serif", color: "#1B1F27" }}>
      <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "14px 32px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#1B1F27", color: "#fff" }}>Forecast</span>
        <span style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB" }}>Saturation Curves</span>
        <span style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB" }}>Portfolio: Powershop</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 0, background: "#F3F4F6", borderRadius: 8, padding: 2 }}>
            {PERIODS.map(p => (
              <button key={p.weeks} onClick={() => setWeeks(p.weeks)} style={{
                padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: weeks === p.weeks ? 600 : 400,
                background: weeks === p.weeks ? "#1B1F27" : "transparent",
                color: weeks === p.weeks ? "#fff" : "#6B7280",
                border: "none", cursor: "pointer", fontFamily: "'Be Vietnam Pro'", whiteSpace: "nowrap",
              }}>{p.label}</button>
            ))}
          </div>
          <select value={geo} onChange={e => { setGeo(e.target.value); setBudgets({}); }} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 13, fontFamily: "'Be Vietnam Pro'", color: "#1B1F27", cursor: "pointer", outline: "none", minWidth: 160 }}>
            {GEOS.map(g => <option key={g} value={g}>{g === "National" ? "All Geographies" : g}</option>)}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E5E7EB", background: "#fff", paddingLeft: 32 }}>
        {["inputs", "summary"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "12px 22px", fontSize: 14, fontWeight: tab === t ? 600 : 400,
            color: tab === t ? "#1B1F27" : "#9CA3AF",
            borderBottom: tab === t ? "2px solid #E8326E" : "2px solid transparent",
            cursor: "pointer", background: "none", border: "none", borderBottomStyle: "solid",
            fontFamily: "'Be Vietnam Pro'", textTransform: "capitalize",
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "24px 32px", maxWidth: 1240 }}>
        {/* Summary row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Simulated Spend ({periodLabel})</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>${fmtF(tSpend)}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{active.length} of {channels.length} channels active</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Simulated Output ({periodLabel})</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>${fmtF(tOut)}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Based on historical S-curves × {weeks} week{weeks > 1 ? "s" : ""}</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Simulated ROI ({periodLabel})</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: tSpend > 0 ? (tROI >= 0 ? "#059669" : "#DC2626") : "#1B1F27" }}>
              {tSpend > 0 ? `${tROI.toFixed(2)}%` : "—"}
            </div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
              {tSpend > 0 ? `Efficiency: ${(tOut / tSpend).toFixed(3)}` : "Enter budgets to begin"}
            </div>
          </div>
        </div>

        {tab === "inputs" && (
          <>
            {/* Budget controls */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Budget Allocation</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 18 }}>Enter a total budget for {periodLabel.toLowerCase()} to auto-distribute, or set individual channel budgets below.</div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ width: 200 }}>
                  <label style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500, display: "block", marginBottom: 4 }}>Total Budget</label>
                  <input type="number" placeholder="e.g. 500,000" value={totalBudget} onChange={e => setTotalBudget(e.target.value)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#FAFBFC", color: "#1B1F27", fontSize: 14, fontFamily: "'Be Vietnam Pro'", outline: "none", width: "100%", boxSizing: "border-box" }} />
                </div>
                <button onClick={splitEven} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Be Vietnam Pro'", background: "#F7F8FA", color: "#5A5F6B", border: "1px solid #E5E7EB" }}>Split Evenly</button>
                <button onClick={splitCurve} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Be Vietnam Pro'", background: "#1B1F27", color: "#fff", border: "none" }}>Split by Curve Weight</button>
                <button onClick={clear} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Be Vietnam Pro'", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}>Clear All</button>
              </div>
            </div>

            {/* Channel Inputs */}
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Channel Inputs</div>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 18 }}>Set spend per channel. Click "Show curve" to inspect the saturation curve.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {channels.map(ch => {
                const isDis = !!disabled[ch.channel];
                const totalSpend = isDis ? 0 : (parseFloat(budgets[ch.channel]) || 0);
                const weeklySpend = totalSpend / weeks;
                const weeklyOutput = hill(weeklySpend, ch.midpoint, ch.scaling_ratio, ch.slope);
                const o = weeklyOutput * weeks;
                const s = totalSpend;
                const sat = ch.scaling_ratio > 0 ? (weeklyOutput / ch.scaling_ratio) * 100 : 0;
                const isExp = expanded === ch.channel;
                const c = CHANNEL_COLORS[ch.channel] || "#6366F1";

                return (
                  <div key={ch.channel} style={{ background: "#fff", border: `1px solid ${isDis ? "#E5E7EB" : s > 0 ? "#E8326E22" : "#E5E7EB"}`, borderRadius: 12, padding: "16px 20px", opacity: isDis ? 0.5 : 1, transition: "opacity 0.2s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{CHANNEL_LABELS[ch.channel] || ch.channel}</span>
                        <span style={confBadge(ch.confidence)}>Conf: {ch.confidence.toFixed(1)}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button onClick={() => setExpanded(isExp ? null : ch.channel)} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "'Be Vietnam Pro'" }}>
                          {isExp ? "Hide curve ▴" : "Show curve ▾"}
                        </button>
                        <button onClick={() => toggleChannel(ch.channel)} style={{
                          width: 36, height: 20, borderRadius: 10, border: "none", cursor: "pointer",
                          background: isDis ? "#E5E7EB" : "#059669", position: "relative", transition: "background 0.2s",
                        }}>
                          <div style={{
                            width: 16, height: 16, borderRadius: 8, background: "#fff",
                            position: "absolute", top: 2, left: isDis ? 2 : 18, transition: "left 0.2s",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                          }} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>Spend ($) — {periodLabel}</label>
                        <input type="number" placeholder="0" disabled={isDis} value={isDis ? "" : (budgets[ch.channel] || "")} onChange={e => set(ch.channel, e.target.value)} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: isDis ? "#F3F4F6" : "#FAFBFC", color: isDis ? "#9CA3AF" : "#1B1F27", fontSize: 14, fontFamily: "'Be Vietnam Pro'", outline: "none", width: "100%", boxSizing: "border-box", marginTop: 2 }} />
                      </div>
                      <div style={{ textAlign: "right", minWidth: 100 }}>
                        <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>Output</div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: isDis ? "#D1D5DB" : s > 0 ? "#1B1F27" : "#D1D5DB", marginTop: 2 }}>
                          {isDis ? "Excluded" : s > 0 ? `$${fmtF(o)}` : "—"}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 48 }}>
                        <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>Sat%</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: isDis ? "#D1D5DB" : s > 0 ? satColor(sat) : "#D1D5DB", marginTop: 2 }}>
                          {isDis ? "—" : s > 0 ? `${sat.toFixed(0)}%` : "—"}
                        </div>
                      </div>
                    </div>

                    <div style={{ height: 4, background: "#F1F2F4", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${Math.min(s > 0 ? sat : 0, 100)}%`, background: s > 0 ? satColor(sat) : "#F1F2F4", borderRadius: 2, transition: "width 0.3s" }} />
                    </div>

                    {isExp && (
                      <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #F1F2F4" }}>
                        <CurveChart channel={ch.channel} params={ch} currentSpend={weeklySpend} />
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 10 }}>
                          {[
                            { l: "Weekly Midpoint", v: fmt(ch.midpoint) },
                            { l: "Weekly Max Spend", v: fmt(ch.max_spend) },
                            { l: "Scaling Ratio", v: fmtN(ch.scaling_ratio) },
                            { l: "Slope", v: ch.slope.toFixed(2) },
                          ].map(p => (
                            <div key={p.l} style={{ background: "#FAFBFC", borderRadius: 8, padding: "8px 12px" }}>
                              <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.l}</div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#5A5F6B", marginTop: 2 }}>{p.v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === "summary" && (
          <>
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Channel Breakdown</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 20 }}>
                This is how the model estimates output will be distributed across channels based on your budget allocation.
              </div>

              {active.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: "#C4C9D2" }}>
                  <p>Switch to Inputs tab and allocate budget to see results here.</p>
                </div>
              ) : (
                <>
                  {/* Channel summary cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
                    {active.sort((a, b) => b.output - a.output).slice(0, 6).map(f => {
                      const roi = f.spend > 0 ? ((f.output - f.spend) / f.spend * 100) : 0;
                      const sp = tSpend > 0 ? (f.spend / tSpend * 100) : 0;
                      const op = tOut > 0 ? (f.output / tOut * 100) : 0;
                      return (
                        <div key={f.channel} style={{ border: "1px solid #E5E7EB", borderRadius: 10, padding: "16px 20px", borderLeft: `3px solid ${CHANNEL_COLORS[f.channel] || "#6366F1"}` }}>
                          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{CHANNEL_LABELS[f.channel]}</div>
                          <div style={{ fontSize: 13, color: roi >= 0 ? "#059669" : "#DC2626", fontWeight: 500, marginBottom: 14 }}>
                            {roi.toFixed(2)}% ROI
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Spend</div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>${fmtF(f.spend)} ({sp.toFixed(0)}%)</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Output</div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>${fmtF(f.output)} ({op.toFixed(0)}%)</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bar chart */}
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Output by Channel</div>
                  <div style={{ height: 300, marginBottom: 28 }}>
                    <ResponsiveContainer>
                      <BarChart data={active.sort((a, b) => b.output - a.output)} margin={{ top: 8, right: 16, bottom: 36, left: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F4" />
                        <XAxis dataKey="channel" tickFormatter={c => CHANNEL_LABELS[c] || c} tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} angle={-30} textAnchor="end" />
                        <YAxis tickFormatter={fmtN} tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }} formatter={v => [`$${fmtF(v)}`, "Output"]} labelFormatter={c => CHANNEL_LABELS[c] || c} />
                        <Bar dataKey="output" radius={[4, 4, 0, 0]}>
                          {active.sort((a, b) => b.output - a.output).map(e => (
                            <Cell key={e.channel} fill={CHANNEL_COLORS[e.channel] || "#6366F1"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Table */}
                  <div style={{ border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: "#FAFBFC", borderBottom: "1px solid #E5E7EB" }}>
                          {["Channel", "Spend", "Output", "ROI", "Efficiency", "Saturation", "Confidence"].map(h => (
                            <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#9CA3AF" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {forecasts.filter(f => f.spend > 0).map(f => {
                          const roi = ((f.output - f.spend) / f.spend * 100);
                          return (
                            <tr key={f.channel} style={{ borderBottom: "1px solid #F3F4F6" }}>
                              <td style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: CHANNEL_COLORS[f.channel] }} />
                                <span style={{ fontWeight: 600 }}>{CHANNEL_LABELS[f.channel]}</span>
                              </td>
                              <td style={{ padding: "10px 16px", color: "#6B7280" }}>${fmtF(f.spend)}</td>
                              <td style={{ padding: "10px 16px", fontWeight: 600 }}>${fmtF(f.output)}</td>
                              <td style={{ padding: "10px 16px", fontWeight: 600, color: roi >= 0 ? "#059669" : "#DC2626" }}>{roi.toFixed(2)}%</td>
                              <td style={{ padding: "10px 16px", color: "#6B7280" }}>{f.eff.toFixed(3)}</td>
                              <td style={{ padding: "10px 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <div style={{ flex: 1, maxWidth: 70, height: 4, background: "#F1F2F4", borderRadius: 2, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${Math.min(f.sat, 100)}%`, background: satColor(f.sat), borderRadius: 2 }} />
                                  </div>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: satColor(f.sat) }}>{f.sat.toFixed(0)}%</span>
                                </div>
                              </td>
                              <td style={{ padding: "10px 16px" }}><span style={confBadge(f.conf)}>{f.conf.toFixed(1)}</span></td>
                            </tr>
                          );
                        })}
                        {active.length > 1 && (
                          <tr style={{ background: "#FAFBFC", fontWeight: 700 }}>
                            <td style={{ padding: "10px 16px" }}>Total</td>
                            <td style={{ padding: "10px 16px" }}>${fmtF(tSpend)}</td>
                            <td style={{ padding: "10px 16px" }}>${fmtF(tOut)}</td>
                            <td style={{ padding: "10px 16px", color: tROI >= 0 ? "#059669" : "#DC2626" }}>{tROI.toFixed(2)}%</td>
                            <td style={{ padding: "10px 16px" }}>{(tOut / tSpend).toFixed(3)}</td>
                            <td colSpan={2} />
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            {/* Formula */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px 20px", fontSize: 12, color: "#9CA3AF" }}>
              <strong style={{ color: "#6B7280" }}>S-Curve Formula:</strong>{" "}
              <code style={{ fontFamily: "monospace", color: "#6366F1", background: "#F5F3FF", padding: "2px 6px", borderRadius: 4 }}>
                output = scaling_ratio × (spend^slope / (spend^slope + midpoint^slope))
              </code>
              <br />
              <span style={{ display: "inline-block", marginTop: 6 }}>
                Parameters sourced from GrowthOS saturation curve outputs. Confidence scores indicate model fit reliability.
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
