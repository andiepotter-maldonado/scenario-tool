import { useState, useMemo, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine, CartesianGrid } from "recharts";

const CURVE_DATA = [
  {geography:"NSW",channel:"bvod",bcp:"brand",max_spend:51352.80,midpoint:39125.94,scaling_ratio:57786.68,slope:2.065867,confidence:0.951592},
  {geography:"NSW",channel:"digital_audio",bcp:"brand",max_spend:16241.85,midpoint:8249.28,scaling_ratio:18209.10,slope:2.523822,confidence:0.942571},
  {geography:"NSW",channel:"display",bcp:"brand",max_spend:6324.15,midpoint:4020.56,scaling_ratio:6600.48,slope:2.306353,confidence:0.950244},
  {geography:"NSW",channel:"display",bcp:"category",max_spend:1119.11,midpoint:557.13,scaling_ratio:1011.03,slope:3.144248,confidence:0.932553},
  {geography:"NSW",channel:"display",bcp:"product",max_spend:2356.62,midpoint:1344.00,scaling_ratio:2547.31,slope:2.386722,confidence:0.931840},
  {geography:"NSW",channel:"fta_tv",bcp:"brand",max_spend:168502.65,midpoint:107664.09,scaling_ratio:125580.83,slope:3.088292,confidence:0.895815},
  {geography:"NSW",channel:"meta",bcp:"brand",max_spend:11776.56,midpoint:6779.25,scaling_ratio:11506.10,slope:2.280452,confidence:0.918672},
  {geography:"NSW",channel:"meta",bcp:"category",max_spend:5481.36,midpoint:3716.29,scaling_ratio:5660.59,slope:2.244351,confidence:0.951679},
  {geography:"NSW",channel:"meta",bcp:"product",max_spend:23322.56,midpoint:8863.99,scaling_ratio:24080.65,slope:2.319840,confidence:0.969216},
  {geography:"NSW",channel:"native_articles",bcp:"category",max_spend:1146.79,midpoint:563.93,scaling_ratio:1055.35,slope:2.737900,confidence:0.873349},
  {geography:"NSW",channel:"ooh",bcp:"brand",max_spend:50836.80,midpoint:16451.68,scaling_ratio:46363.87,slope:2.155089,confidence:0.943900},
  {geography:"NSW",channel:"podcast",bcp:"brand",max_spend:4380.97,midpoint:2588.93,scaling_ratio:4212.86,slope:2.601470,confidence:0.912679},
  {geography:"NSW",channel:"radio",bcp:"brand",max_spend:34712.10,midpoint:26055.35,scaling_ratio:40014.03,slope:2.815794,confidence:0.962543},
  {geography:"NSW",channel:"search",bcp:"product",max_spend:51376.76,midpoint:14219.77,scaling_ratio:20007.35,slope:2.376138,confidence:0.985657},
  {geography:"NSW",channel:"svod",bcp:"brand",max_spend:11812.50,midpoint:6568.07,scaling_ratio:10751.90,slope:2.845266,confidence:0.913265},
  {geography:"NSW",channel:"video",bcp:"brand",max_spend:4715.80,midpoint:2797.88,scaling_ratio:4945.43,slope:2.629460,confidence:0.931673},
  {geography:"NSW",channel:"youtube",bcp:"brand",max_spend:29349.25,midpoint:20433.67,scaling_ratio:29012.85,slope:2.154643,confidence:0.953601},
  {geography:"NSW",channel:"youtube",bcp:"category",max_spend:666.44,midpoint:350.52,scaling_ratio:652.76,slope:2.614782,confidence:0.901428},
  {geography:"QLD",channel:"bvod",bcp:"brand",max_spend:16851.00,midpoint:9748.43,scaling_ratio:11835.25,slope:3.073948,confidence:0.870995},
  {geography:"QLD",channel:"digital_audio",bcp:"brand",max_spend:2620.95,midpoint:1541.23,scaling_ratio:2643.84,slope:2.597194,confidence:0.927899},
  {geography:"QLD",channel:"display",bcp:"brand",max_spend:1373.89,midpoint:849.20,scaling_ratio:1652.89,slope:2.270363,confidence:0.946925},
  {geography:"QLD",channel:"display",bcp:"product",max_spend:958.93,midpoint:454.10,scaling_ratio:1111.33,slope:2.776050,confidence:0.931281},
  {geography:"QLD",channel:"fta_tv",bcp:"brand",max_spend:48306.45,midpoint:25140.56,scaling_ratio:31315.11,slope:3.243601,confidence:0.850730},
  {geography:"QLD",channel:"meta",bcp:"brand",max_spend:6380.67,midpoint:3380.70,scaling_ratio:5499.80,slope:2.022513,confidence:0.905833},
  {geography:"QLD",channel:"meta",bcp:"category",max_spend:1687.47,midpoint:1192.77,scaling_ratio:1691.45,slope:2.210955,confidence:0.955564},
  {geography:"QLD",channel:"meta",bcp:"product",max_spend:11661.73,midpoint:2481.59,scaling_ratio:6414.19,slope:1.723295,confidence:0.968009},
  {geography:"QLD",channel:"native_articles",bcp:"category",max_spend:747.46,midpoint:365.85,scaling_ratio:686.52,slope:3.016933,confidence:0.903110},
  {geography:"QLD",channel:"ooh",bcp:"brand",max_spend:20148.45,midpoint:5212.29,scaling_ratio:10366.48,slope:2.371117,confidence:0.887138},
  {geography:"QLD",channel:"podcast",bcp:"brand",max_spend:2137.05,midpoint:1263.34,scaling_ratio:2000.44,slope:2.574958,confidence:0.908815},
  {geography:"QLD",channel:"radio",bcp:"brand",max_spend:22715.70,midpoint:14832.19,scaling_ratio:13533.86,slope:3.129096,confidence:0.914099},
  {geography:"QLD",channel:"search",bcp:"product",max_spend:24725.94,midpoint:4506.75,scaling_ratio:5883.61,slope:1.542224,confidence:0.972728},
  {geography:"QLD",channel:"video",bcp:"brand",max_spend:1440.11,midpoint:850.34,scaling_ratio:1466.71,slope:2.751634,confidence:0.930311},
  {geography:"QLD",channel:"youtube",bcp:"brand",max_spend:3977.32,midpoint:3013.75,scaling_ratio:3901.03,slope:2.316388,confidence:0.959548},
  {geography:"SA",channel:"digital_audio",bcp:"brand",max_spend:703.50,midpoint:424.11,scaling_ratio:764.76,slope:2.443178,confidence:0.931599},
  {geography:"SA",channel:"display",bcp:"brand",max_spend:582.53,midpoint:340.78,scaling_ratio:569.61,slope:2.770021,confidence:0.923985},
  {geography:"SA",channel:"display",bcp:"product",max_spend:926.38,midpoint:558.12,scaling_ratio:906.28,slope:2.351055,confidence:0.924861},
  {geography:"SA",channel:"meta",bcp:"brand",max_spend:1967.08,midpoint:1228.42,scaling_ratio:1861.55,slope:2.430922,confidence:0.926503},
  {geography:"SA",channel:"meta",bcp:"category",max_spend:574.83,midpoint:357.45,scaling_ratio:638.17,slope:2.384294,confidence:0.941480},
  {geography:"SA",channel:"meta",bcp:"product",max_spend:2509.64,midpoint:1591.52,scaling_ratio:2301.38,slope:2.770893,confidence:0.957064},
  {geography:"SA",channel:"search",bcp:"product",max_spend:3830.03,midpoint:590.43,scaling_ratio:671.07,slope:2.374101,confidence:0.985499},
  {geography:"SA",channel:"video",bcp:"brand",max_spend:923.43,midpoint:515.06,scaling_ratio:929.78,slope:2.598334,confidence:0.923644},
  {geography:"SA",channel:"youtube",bcp:"brand",max_spend:1234.78,midpoint:717.24,scaling_ratio:1082.97,slope:3.010504,confidence:0.918011},
  {geography:"VIC",channel:"bvod",bcp:"brand",max_spend:79899.15,midpoint:60271.98,scaling_ratio:78010.31,slope:2.454529,confidence:0.947392},
  {geography:"VIC",channel:"digital_audio",bcp:"brand",max_spend:16854.15,midpoint:11965.31,scaling_ratio:18747.41,slope:2.294016,confidence:0.948331},
  {geography:"VIC",channel:"display",bcp:"brand",max_spend:6324.15,midpoint:3791.39,scaling_ratio:6880.86,slope:2.463493,confidence:0.948956},
  {geography:"VIC",channel:"display",bcp:"category",max_spend:1338.32,midpoint:725.64,scaling_ratio:1372.85,slope:2.568274,confidence:0.943292},
  {geography:"VIC",channel:"display",bcp:"product",max_spend:2386.29,midpoint:1476.94,scaling_ratio:2846.89,slope:2.232624,confidence:0.952200},
  {geography:"VIC",channel:"fta_tv",bcp:"brand",max_spend:359696.70,midpoint:208627.76,scaling_ratio:223314.76,slope:3.530573,confidence:0.896466},
  {geography:"VIC",channel:"meta",bcp:"brand",max_spend:9953.88,midpoint:5822.57,scaling_ratio:10007.51,slope:2.179729,confidence:0.914875},
  {geography:"VIC",channel:"meta",bcp:"category",max_spend:3436.84,midpoint:2274.66,scaling_ratio:3973.29,slope:2.068899,confidence:0.950735},
  {geography:"VIC",channel:"meta",bcp:"product",max_spend:51172.40,midpoint:28109.18,scaling_ratio:52314.88,slope:1.823182,confidence:0.957261},
  {geography:"VIC",channel:"native_articles",bcp:"category",max_spend:936.99,midpoint:429.29,scaling_ratio:855.90,slope:2.825040,confidence:0.886443},
  {geography:"VIC",channel:"ooh",bcp:"brand",max_spend:94057.95,midpoint:30379.18,scaling_ratio:68084.10,slope:2.762251,confidence:0.907698},
  {geography:"VIC",channel:"podcast",bcp:"brand",max_spend:4167.27,midpoint:2435.94,scaling_ratio:4434.82,slope:2.704949,confidence:0.909354},
  {geography:"VIC",channel:"radio",bcp:"brand",max_spend:44242.80,midpoint:32017.72,scaling_ratio:45822.92,slope:2.556000,confidence:0.941765},
  {geography:"VIC",channel:"search",bcp:"product",max_spend:115818.83,midpoint:48205.19,scaling_ratio:79241.44,slope:1.652622,confidence:0.963721},
  {geography:"VIC",channel:"svod",bcp:"brand",max_spend:11812.50,midpoint:6389.54,scaling_ratio:10761.52,slope:3.002215,confidence:0.915133},
  {geography:"VIC",channel:"video",bcp:"brand",max_spend:3951.57,midpoint:2101.31,scaling_ratio:3585.29,slope:2.651644,confidence:0.898018},
  {geography:"VIC",channel:"video",bcp:"category",max_spend:5674.97,midpoint:3171.86,scaling_ratio:4717.61,slope:3.157682,confidence:0.900324},
  {geography:"VIC",channel:"youtube",bcp:"brand",max_spend:9298.35,midpoint:7007.45,scaling_ratio:11369.53,slope:2.089971,confidence:0.968362},
  {geography:"VIC",channel:"youtube",bcp:"category",max_spend:605.99,midpoint:349.67,scaling_ratio:626.98,slope:2.426584,confidence:0.930814},
  {geography:"National",channel:"bvod",bcp:"brand",max_spend:148102.95,midpoint:109146.36,scaling_ratio:196505.05,slope:2.531448,confidence:0.627562},
  {geography:"National",channel:"digital_audio",bcp:"brand",max_spend:36420.45,midpoint:22179.93,scaling_ratio:42439.74,slope:2.464552,confidence:0.813198},
  {geography:"National",channel:"display",bcp:"brand",max_spend:14604.72,midpoint:9001.93,scaling_ratio:15334.43,slope:2.452558,confidence:0.780300},
  {geography:"National",channel:"display",bcp:"category",max_spend:2753.14,midpoint:1437.13,scaling_ratio:2677.72,slope:2.856261,confidence:0.885244},
  {geography:"National",channel:"display",bcp:"product",max_spend:6628.23,midpoint:3833.16,scaling_ratio:7422.49,slope:2.436613,confidence:0.922829},
  {geography:"National",channel:"fta_tv",bcp:"brand",max_spend:576505.80,midpoint:341432.41,scaling_ratio:363058.83,slope:3.287489,confidence:0.667760},
  {geography:"National",channel:"meta",bcp:"brand",max_spend:30078.19,midpoint:17210.94,scaling_ratio:29911.26,slope:2.228404,confidence:0.764369},
  {geography:"National",channel:"meta",bcp:"category",max_spend:11180.49,midpoint:7541.17,scaling_ratio:12359.43,slope:2.227125,confidence:0.821469},
  {geography:"National",channel:"meta",bcp:"product",max_spend:88666.33,midpoint:41046.28,scaling_ratio:101533.27,slope:2.159303,confidence:0.879844},
  {geography:"National",channel:"native_articles",bcp:"category",max_spend:2831.24,midpoint:1359.07,scaling_ratio:2613.31,slope:2.859957,confidence:0.873336},
  {geography:"National",channel:"ooh",bcp:"brand",max_spend:165043.20,midpoint:52043.15,scaling_ratio:121354.72,slope:2.429485,confidence:0.886955},
  {geography:"National",channel:"podcast",bcp:"brand",max_spend:10685.29,midpoint:6288.21,scaling_ratio:9725.66,slope:2.627126,confidence:0.910283},
  {geography:"National",channel:"radio",bcp:"brand",max_spend:102087.41,midpoint:73204.15,scaling_ratio:98752.27,slope:2.833630,confidence:0.749460},
  {geography:"National",channel:"search",bcp:"product",max_spend:195751.56,midpoint:67522.14,scaling_ratio:107866.32,slope:1.986271,confidence:0.914613},
  {geography:"National",channel:"svod",bcp:"brand",max_spend:23625.00,midpoint:12957.61,scaling_ratio:20733.78,slope:2.923740,confidence:0.844044},
  {geography:"National",channel:"video",bcp:"brand",max_spend:11030.91,midpoint:6264.58,scaling_ratio:10618.09,slope:2.657768,confidence:0.715981},
  {geography:"National",channel:"video",bcp:"category",max_spend:5674.97,midpoint:3171.86,scaling_ratio:4582.74,slope:3.157682,confidence:0.841701},
  {geography:"National",channel:"youtube",bcp:"brand",max_spend:43859.69,midpoint:31172.11,scaling_ratio:71893.44,slope:2.392877,confidence:0.440051},
  {geography:"National",channel:"youtube",bcp:"category",max_spend:1490.19,midpoint:820.02,scaling_ratio:1444.54,slope:2.520683,confidence:0.889963},
];

const BCP_PRIORITY = { product: 3, category: 2, brand: 1 };
const BCP_LABELS = { brand: "Brand", category: "Consideration", product: "Conversion" };
const FUNNEL_OPTIONS = [
  { value: "best", label: "All (Best)" },
  { value: "brand", label: "Brand" },
  { value: "category", label: "Consideration" },
  { value: "product", label: "Conversion" },
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

const REVENUE_PER_UNIT = 261.66;

function hill(spend, mid, scale, slope) {
  if (spend <= 0) return 0;
  const sp = Math.pow(spend, slope);
  return scale * sp / (sp + Math.pow(mid, slope));
}

// Axis tick format (abbreviated)
function fmtAxis(v) {
  if (Math.abs(v) >= 1e6) return `$${(v/1e6).toFixed(1)}M`;
  if (Math.abs(v) >= 1e3) return `$${(v/1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

// Dollar format with commas: $1,039,067
function fmtD(v) {
  return "$" + Math.round(v).toLocaleString("en-AU");
}

// Number format with commas: 3,124
function fmtN(v) {
  return Math.round(v).toLocaleString("en-AU");
}

// Dollar with 1 decimal: $1,039,067.0
function fmtD1(v) {
  return "$" + v.toLocaleString("en-AU", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// Axis number format (abbreviated, no $)
function fmtAxisN(v) {
  if (v >= 1e6) return `${(v/1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v/1e3).toFixed(0)}K`;
  return v.toFixed(0);
}

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
          <XAxis dataKey="spend" tickFormatter={fmtAxis} tick={{ fill: "#9CA3AF", fontSize: 10 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
          <YAxis tickFormatter={fmtAxisN} tick={{ fill: "#9CA3AF", fontSize: 10 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} width={48} />
          <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }} formatter={v => [fmtD(v), "Revenue"]} labelFormatter={v => `Spend: ${fmtAxis(v)}`} />
          <Line type="monotone" dataKey="output" stroke={c} strokeWidth={2} dot={false} />
          {currentSpend > 0 && <ReferenceLine x={currentSpend} stroke={c} strokeDasharray="4 4" strokeOpacity={0.5} />}
        </LineChart>
      </ResponsiveContainer>
      {currentSpend > 0 && (
        <div style={{ textAlign: "center", marginTop: -6 }}>
          <span style={{ background: c, color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
            {fmtAxis(currentSpend)} → {fmtD(co)} revenue
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
  const [funnel, setFunnel] = useState("best");

  const periodLabel = PERIODS.find(p => p.weeks === weeks)?.label || `${weeks} Weeks`;
  const toggleChannel = (ch) => setDisabled(p => ({ ...p, [ch]: !p[ch] }));

  // All curves for this geography
  const allCurves = useMemo(() => CURVE_DATA.filter(d => d.geography === geo), [geo]);

  // Unique channel list with primary (best) curve per channel
  const channelList = useMemo(() => {
    const map = {};
    allCurves.forEach(c => {
      if (!map[c.channel] || BCP_PRIORITY[c.bcp] > BCP_PRIORITY[map[c.channel].bcp]) {
        map[c.channel] = c;
      }
    });
    return Object.values(map).sort((a, b) => b.scaling_ratio - a.scaling_ratio);
  }, [allCurves]);

  // Get curve for channel at specific BCP level
  const getCurve = useCallback((channel, bcp) => allCurves.find(c => c.channel === channel && c.bcp === bcp), [allCurves]);

  // Get the active curve for a channel based on funnel selection
  const getActiveCurve = useCallback((channel) => {
    if (funnel === "best") {
      return channelList.find(c => c.channel === channel);
    }
    return getCurve(channel, funnel) || null;
  }, [funnel, channelList, getCurve]);

  // Available BCP levels per channel
  const channelBcps = useMemo(() => {
    const map = {};
    allCurves.forEach(c => {
      if (!map[c.channel]) map[c.channel] = [];
      if (!map[c.channel].includes(c.bcp)) map[c.channel].push(c.bcp);
    });
    return map;
  }, [allCurves]);

  const forecasts = useMemo(() => {
    return channelList.map(primary => {
      const chName = primary.channel;
      const curve = getActiveCurve(chName);
      const isDis = !!disabled[chName];
      const totalSpend = isDis ? 0 : (parseFloat(budgets[chName]) || 0);
      const weeklySpend = totalSpend / weeks;

      // Main output from active curve
      let o = 0, sat = 0, conf = 0, bcp = "brand";
      if (curve) {
        const weeklyOutput = hill(weeklySpend, curve.midpoint, curve.scaling_ratio, curve.slope);
        o = weeklyOutput * weeks;
        sat = curve.scaling_ratio > 0 ? (weeklyOutput / curve.scaling_ratio) * 100 : 0;
        conf = curve.confidence;
        bcp = curve.bcp;
      }

      const units = o / REVENUE_PER_UNIT;
      const cpa = units > 0 ? totalSpend / units : 0;

      // Funnel breakdown: compute output at each available BCP level
      const funnelData = {};
      ["brand", "category", "product"].forEach(b => {
        const c = getCurve(chName, b);
        if (c && totalSpend > 0) {
          const wo = hill(weeklySpend, c.midpoint, c.scaling_ratio, c.slope);
          const out = wo * weeks;
          funnelData[b] = { output: out, units: out / REVENUE_PER_UNIT };
        }
      });

      return {
        channel: chName, spend: totalSpend, output: o, units, cpa,
        eff: totalSpend > 0 ? o / totalSpend : 0, sat, conf, bcp,
        maxSpend: primary.max_spend, disabled: isDis, funnelData,
        hasCurve: !!curve,
      };
    }).sort((a, b) => b.output - a.output);
  }, [channelList, budgets, weeks, disabled, getActiveCurve, getCurve]);

  const tSpend = forecasts.reduce((a, f) => a + f.spend, 0);
  const tOut = forecasts.reduce((a, f) => a + f.output, 0);
  const tUnits = forecasts.reduce((a, f) => a + f.units, 0);
  const tCpa = tUnits > 0 ? tSpend / tUnits : 0;
  const tROI = tSpend > 0 ? ((tOut - tSpend) / tSpend * 100) : 0;
  const active = forecasts.filter(f => f.spend > 0);

  const set = useCallback((ch, v) => setBudgets(p => ({ ...p, [ch]: v })), []);

  const splitEven = () => {
    const t = parseFloat(totalBudget) || 0;
    if (t <= 0) return;
    const enabled = channelList.filter(ch => !disabled[ch.channel]);
    if (enabled.length === 0) return;
    const b = {};
    channelList.forEach(ch => { b[ch.channel] = disabled[ch.channel] ? "0" : (t / enabled.length).toFixed(0); });
    setBudgets(b);
  };
  const splitCurve = () => {
    const t = parseFloat(totalBudget) || 0;
    if (t <= 0) return;
    const enabled = channelList.filter(ch => !disabled[ch.channel]);
    if (enabled.length === 0) return;
    const tm = enabled.reduce((a, c) => a + c.max_spend, 0);
    const b = {};
    channelList.forEach(ch => { b[ch.channel] = disabled[ch.channel] ? "0" : ((ch.max_spend / tm) * t).toFixed(0); });
    setBudgets(b);
  };
  const clear = () => { setBudgets({}); setTotalBudget(""); };

  const confPct = c => (c * 100);
  const confBadge = c => {
    const p = confPct(c);
    return {
      fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, display: "inline-block",
      background: p >= 95 ? "#ECFDF5" : p >= 85 ? "#FFFBEB" : "#FEF2F2",
      color: p >= 95 ? "#059669" : p >= 85 ? "#D97706" : "#DC2626",
    };
  };
  const satColor = p => p > 80 ? "#DC2626" : p > 50 ? "#D97706" : "#059669";

  const thStyle = { padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#9CA3AF", whiteSpace: "nowrap" };
  const tdStyle = { padding: "8px 14px", fontSize: 13 };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F8FA", fontFamily: "'Be Vietnam Pro', sans-serif", color: "#1B1F27" }}>
      <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "14px 32px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#1B1F27", color: "#fff" }}>Forecast</span>
        <span style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB" }}>Saturation Curves</span>
        <span style={{ padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB" }}>Portfolio: Powershop</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          {/* Funnel selector */}
          <div style={{ display: "flex", gap: 0, background: "#F3F4F6", borderRadius: 8, padding: 2 }}>
            {FUNNEL_OPTIONS.map(f => (
              <button key={f.value} onClick={() => setFunnel(f.value)} style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: funnel === f.value ? 600 : 400,
                background: funnel === f.value ? "#6366F1" : "transparent",
                color: funnel === f.value ? "#fff" : "#6B7280",
                border: "none", cursor: "pointer", fontFamily: "'Be Vietnam Pro'", whiteSpace: "nowrap",
              }}>{f.label}</button>
            ))}
          </div>
          {/* Period selector */}
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

      <div style={{ padding: "24px 32px", maxWidth: 1400 }}>
        {/* Summary row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Simulated Spend ({periodLabel})</div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{fmtD(tSpend)}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{active.length} of {channelList.length} channels active</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Simulated Revenue ({periodLabel})</div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{fmtD(tOut)}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
              {funnel !== "best" ? `Funnel: ${BCP_LABELS[funnel]}` : "Best available funnel"} × {weeks}w
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Est. Units ({periodLabel})</div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{tSpend > 0 ? fmtN(tUnits) : "—"}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
              {tSpend > 0 ? "Derived from revenue" : "Enter budgets to begin"}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>CPA ({periodLabel})</div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{tSpend > 0 ? fmtD(tCpa) : "—"}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
              {tSpend > 0 ? "Cost per acquisition" : "Varies by channel mix"}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 4 }}>Simulated ROI ({periodLabel})</div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: tSpend > 0 ? (tROI >= 0 ? "#059669" : "#DC2626") : "#1B1F27" }}>
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
                  <input type="number" placeholder="e.g. 500000" value={totalBudget} onChange={e => setTotalBudget(e.target.value)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#FAFBFC", color: "#1B1F27", fontSize: 14, fontFamily: "'Be Vietnam Pro'", outline: "none", width: "100%", boxSizing: "border-box" }} />
                </div>
                <button onClick={splitEven} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Be Vietnam Pro'", background: "#F7F8FA", color: "#5A5F6B", border: "1px solid #E5E7EB" }}>Split Evenly</button>
                <button onClick={splitCurve} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Be Vietnam Pro'", background: "#1B1F27", color: "#fff", border: "none" }}>Split by Curve Weight</button>
                <button onClick={clear} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Be Vietnam Pro'", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}>Clear All</button>
              </div>
            </div>

            {/* Channel Inputs - Table format */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Channel Inputs</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Set spend per channel. Click a row to inspect the saturation curve.</div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#FAFBFC", borderBottom: "1px solid #E5E7EB" }}>
                    <th style={{ ...thStyle, width: 44 }}></th>
                    <th style={thStyle}>Channel</th>
                    <th style={{ ...thStyle, width: 180 }}>Spend ({periodLabel})</th>
                    <th style={thStyle}>Revenue</th>
                    <th style={thStyle}>Units</th>
                    <th style={thStyle}>CPA</th>
                    <th style={thStyle}>Saturation</th>
                    <th style={thStyle}>Confidence</th>
                    <th style={{ ...thStyle, width: 30 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {channelList.map(ch => {
                    const f = forecasts.find(f => f.channel === ch.channel);
                    if (!f) return null;
                    const isDis = f.disabled;
                    const s = f.spend;
                    const isExp = expanded === ch.channel;
                    const c = CHANNEL_COLORS[ch.channel] || "#6366F1";
                    const bcps = channelBcps[ch.channel] || [];

                    return [
                      <tr key={ch.channel} style={{ borderBottom: isExp ? "none" : "1px solid #F3F4F6", opacity: isDis ? 0.5 : 1, transition: "opacity 0.2s" }}>
                        {/* Toggle */}
                        <td style={{ ...tdStyle, textAlign: "center" }}>
                          <button onClick={() => toggleChannel(ch.channel)} style={{
                            width: 32, height: 18, borderRadius: 9, border: "none", cursor: "pointer",
                            background: isDis ? "#E5E7EB" : "#059669", position: "relative", transition: "background 0.2s", display: "inline-block", verticalAlign: "middle",
                          }}>
                            <div style={{
                              width: 14, height: 14, borderRadius: 7, background: "#fff",
                              position: "absolute", top: 2, left: isDis ? 2 : 16, transition: "left 0.2s",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                            }} />
                          </button>
                        </td>
                        {/* Channel */}
                        <td style={tdStyle}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, background: c, flexShrink: 0 }} />
                            <span style={{ fontWeight: 600, fontSize: 13 }}>{CHANNEL_LABELS[ch.channel] || ch.channel}</span>
                            {funnel !== "best" && !f.hasCurve && (
                              <span style={{ fontSize: 10, color: "#D97706", background: "#FFFBEB", padding: "1px 6px", borderRadius: 10 }}>No {BCP_LABELS[funnel]} data</span>
                            )}
                          </div>
                        </td>
                        {/* Spend input */}
                        <td style={tdStyle}>
                          <input
                            type="number" placeholder="0" disabled={isDis}
                            value={isDis ? "" : (budgets[ch.channel] || "")}
                            onChange={e => set(ch.channel, e.target.value)}
                            style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #E5E7EB", background: isDis ? "#F3F4F6" : "#FAFBFC", color: isDis ? "#9CA3AF" : "#1B1F27", fontSize: 13, fontFamily: "'Be Vietnam Pro'", outline: "none", width: "100%", boxSizing: "border-box" }}
                          />
                        </td>
                        {/* Revenue */}
                        <td style={{ ...tdStyle, fontWeight: 600, color: isDis ? "#D1D5DB" : s > 0 ? "#1B1F27" : "#D1D5DB" }}>
                          {isDis ? "Excluded" : s > 0 ? fmtD1(f.output) : "—"}
                        </td>
                        {/* Units */}
                        <td style={{ ...tdStyle, fontWeight: 600, color: isDis ? "#D1D5DB" : s > 0 ? "#1B1F27" : "#D1D5DB" }}>
                          {isDis ? "—" : s > 0 ? fmtN(f.units) : "—"}
                        </td>
                        {/* CPA */}
                        <td style={{ ...tdStyle, color: isDis ? "#D1D5DB" : s > 0 ? "#6B7280" : "#D1D5DB" }}>
                          {isDis ? "—" : s > 0 && f.units > 0 ? fmtD(f.cpa) : "—"}
                        </td>
                        {/* Saturation */}
                        <td style={tdStyle}>
                          {isDis ? <span style={{ color: "#D1D5DB" }}>—</span> : s > 0 ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ flex: 1, maxWidth: 60, height: 4, background: "#F1F2F4", borderRadius: 2, overflow: "hidden" }}>
                                <div style={{ height: "100%", width: `${Math.min(f.sat, 100)}%`, background: satColor(f.sat), borderRadius: 2 }} />
                              </div>
                              <span style={{ fontSize: 12, fontWeight: 600, color: satColor(f.sat) }}>{f.sat.toFixed(0)}%</span>
                            </div>
                          ) : <span style={{ color: "#D1D5DB" }}>—</span>}
                        </td>
                        {/* Confidence */}
                        <td style={tdStyle}>
                          <span style={confBadge(f.conf)}>{confPct(f.conf).toFixed(0)}%</span>
                        </td>
                        {/* Expand */}
                        <td style={tdStyle}>
                          <button onClick={() => setExpanded(isExp ? null : ch.channel)} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", fontSize: 12, fontFamily: "'Be Vietnam Pro'", padding: 0 }}>
                            {isExp ? "▴" : "▾"}
                          </button>
                        </td>
                      </tr>,

                      /* Expanded row */
                      isExp && (
                        <tr key={ch.channel + "-exp"} style={{ borderBottom: "1px solid #F3F4F6" }}>
                          <td colSpan={9} style={{ padding: "0 20px 16px 20px", background: "#FAFBFC" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 12 }}>
                              {/* Curve chart */}
                              <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 8 }}>Saturation Curve (Weekly)</div>
                                <CurveChart channel={ch.channel} params={ch} currentSpend={s / weeks} />
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 10 }}>
                                  {[
                                    { l: "Weekly Midpoint", v: fmtAxis(ch.midpoint) },
                                    { l: "Weekly Max Spend", v: fmtAxis(ch.max_spend) },
                                    { l: "Scaling Ratio", v: fmtAxisN(ch.scaling_ratio) },
                                    { l: "Slope", v: ch.slope.toFixed(2) },
                                  ].map(p => (
                                    <div key={p.l} style={{ background: "#fff", borderRadius: 6, padding: "6px 10px", border: "1px solid #E5E7EB" }}>
                                      <div style={{ fontSize: 9, color: "#9CA3AF", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.l}</div>
                                      <div style={{ fontSize: 12, fontWeight: 600, color: "#5A5F6B", marginTop: 1 }}>{p.v}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Funnel breakdown */}
                              <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 8 }}>Funnel Breakdown</div>
                                {s > 0 ? (
                                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                                    <thead>
                                      <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                                        <th style={{ padding: "6px 10px", textAlign: "left", color: "#9CA3AF", fontWeight: 600 }}>Funnel</th>
                                        <th style={{ padding: "6px 10px", textAlign: "right", color: "#9CA3AF", fontWeight: 600 }}>Revenue</th>
                                        <th style={{ padding: "6px 10px", textAlign: "right", color: "#9CA3AF", fontWeight: 600 }}>Units</th>
                                        <th style={{ padding: "6px 10px", textAlign: "right", color: "#9CA3AF", fontWeight: 600 }}>CPA</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {["brand", "category", "product"].map(b => {
                                        const fd = f.funnelData[b];
                                        const available = bcps.includes(b);
                                        return (
                                          <tr key={b} style={{ borderBottom: "1px solid #F3F4F6" }}>
                                            <td style={{ padding: "6px 10px", fontWeight: 500 }}>
                                              {BCP_LABELS[b]}
                                              {f.bcp === b && funnel === "best" && <span style={{ fontSize: 9, color: "#6366F1", marginLeft: 6 }}>ACTIVE</span>}
                                            </td>
                                            <td style={{ padding: "6px 10px", textAlign: "right", fontWeight: 600, color: available && fd ? "#1B1F27" : "#D1D5DB" }}>
                                              {available && fd ? fmtD(fd.output) : "N/A"}
                                            </td>
                                            <td style={{ padding: "6px 10px", textAlign: "right", color: available && fd ? "#1B1F27" : "#D1D5DB" }}>
                                              {available && fd ? fmtN(fd.units) : "N/A"}
                                            </td>
                                            <td style={{ padding: "6px 10px", textAlign: "right", color: available && fd ? "#6B7280" : "#D1D5DB" }}>
                                              {available && fd && fd.units > 0 ? fmtD(s / fd.units) : "N/A"}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                ) : (
                                  <div style={{ padding: 20, textAlign: "center", color: "#C4C9D2", fontSize: 12 }}>
                                    Enter spend to see funnel breakdown
                                  </div>
                                )}
                                <div style={{ marginTop: 10, fontSize: 11, color: "#9CA3AF" }}>
                                  Available funnels: {bcps.map(b => BCP_LABELS[b]).join(", ")}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ),
                    ];
                  })}
                  {/* Total row */}
                  {active.length > 0 && (
                    <tr style={{ background: "#FAFBFC", fontWeight: 700 }}>
                      <td style={tdStyle}></td>
                      <td style={tdStyle}>Total</td>
                      <td style={tdStyle}>{fmtD(tSpend)}</td>
                      <td style={tdStyle}>{fmtD1(tOut)}</td>
                      <td style={tdStyle}>{fmtN(tUnits)}</td>
                      <td style={{ ...tdStyle, color: "#6B7280" }}>{tUnits > 0 ? fmtD(tCpa) : "—"}</td>
                      <td colSpan={3} style={tdStyle}></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "summary" && (
          <>
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Channel Breakdown</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 20 }}>
                Revenue and units estimated from S-curves at the {funnel === "best" ? "best available" : BCP_LABELS[funnel]} funnel level.
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
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                            <div>
                              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Spend</div>
                              <div style={{ fontSize: 12, fontWeight: 600 }}>{fmtD(f.spend)}</div>
                              <div style={{ fontSize: 10, color: "#9CA3AF" }}>{sp.toFixed(0)}% of total</div>
                            </div>
                            <div>
                              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Revenue</div>
                              <div style={{ fontSize: 12, fontWeight: 600 }}>{fmtD(f.output)}</div>
                              <div style={{ fontSize: 10, color: "#9CA3AF" }}>{op.toFixed(0)}% of total</div>
                            </div>
                            <div>
                              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Units</div>
                              <div style={{ fontSize: 12, fontWeight: 600 }}>{fmtN(f.units)}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: 11, color: "#9CA3AF" }}>CPA</div>
                              <div style={{ fontSize: 12, fontWeight: 600 }}>{f.units > 0 ? fmtD(f.cpa) : "—"}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bar chart */}
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Revenue by Channel</div>
                  <div style={{ height: 300, marginBottom: 28 }}>
                    <ResponsiveContainer>
                      <BarChart data={active.sort((a, b) => b.output - a.output)} margin={{ top: 8, right: 16, bottom: 36, left: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F2F4" />
                        <XAxis dataKey="channel" tickFormatter={c => CHANNEL_LABELS[c] || c} tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} angle={-30} textAnchor="end" />
                        <YAxis tickFormatter={fmtAxisN} tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }} formatter={v => [fmtD(v), "Revenue"]} labelFormatter={c => CHANNEL_LABELS[c] || c} />
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
                          {["Channel", "Spend", "Revenue", "Units", "ROI", "CPA", "Efficiency", "Saturation", "Confidence"].map(h => (
                            <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#9CA3AF" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {forecasts.filter(f => f.spend > 0).map(f => {
                          const roi = ((f.output - f.spend) / f.spend * 100);
                          return (
                            <tr key={f.channel} style={{ borderBottom: "1px solid #F3F4F6" }}>
                              <td style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: CHANNEL_COLORS[f.channel] }} />
                                <span style={{ fontWeight: 600 }}>{CHANNEL_LABELS[f.channel]}</span>
                              </td>
                              <td style={{ padding: "10px 14px", color: "#6B7280" }}>{fmtD1(f.spend)}</td>
                              <td style={{ padding: "10px 14px", fontWeight: 600 }}>{fmtD1(f.output)}</td>
                              <td style={{ padding: "10px 14px", fontWeight: 600 }}>{fmtN(f.units)}</td>
                              <td style={{ padding: "10px 14px", fontWeight: 600, color: roi >= 0 ? "#059669" : "#DC2626" }}>{roi.toFixed(2)}%</td>
                              <td style={{ padding: "10px 14px", color: "#6B7280" }}>{f.units > 0 ? fmtD(f.cpa) : "—"}</td>
                              <td style={{ padding: "10px 14px", color: "#6B7280" }}>{f.eff.toFixed(3)}</td>
                              <td style={{ padding: "10px 14px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <div style={{ flex: 1, maxWidth: 70, height: 4, background: "#F1F2F4", borderRadius: 2, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${Math.min(f.sat, 100)}%`, background: satColor(f.sat), borderRadius: 2 }} />
                                  </div>
                                  <span style={{ fontSize: 12, fontWeight: 600, color: satColor(f.sat) }}>{f.sat.toFixed(0)}%</span>
                                </div>
                              </td>
                              <td style={{ padding: "10px 14px" }}><span style={confBadge(f.conf)}>{confPct(f.conf).toFixed(0)}%</span></td>
                            </tr>
                          );
                        })}
                        {active.length > 1 && (
                          <tr style={{ background: "#FAFBFC", fontWeight: 700 }}>
                            <td style={{ padding: "10px 14px" }}>Total</td>
                            <td style={{ padding: "10px 14px" }}>{fmtD1(tSpend)}</td>
                            <td style={{ padding: "10px 14px" }}>{fmtD1(tOut)}</td>
                            <td style={{ padding: "10px 14px" }}>{fmtN(tUnits)}</td>
                            <td style={{ padding: "10px 14px", color: tROI >= 0 ? "#059669" : "#DC2626" }}>{tROI.toFixed(2)}%</td>
                            <td style={{ padding: "10px 14px" }}>{tUnits > 0 ? fmtD(tCpa) : "—"}</td>
                            <td style={{ padding: "10px 14px" }}>{(tOut / tSpend).toFixed(3)}</td>
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
                CPA is dynamically calculated as Spend / Units and varies with spend levels due to diminishing returns.
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
