"use client";

import { useState } from "react";

type Accent = { name: string; hex: string; glow: string };

const ACCENTS: Accent[] = [
  { name: "Fucsia", hex: "#d946ef", glow: "rgba(217,70,239,0.18)" },
  { name: "Cian", hex: "#22d3ee", glow: "rgba(34,211,238,0.18)" },
  { name: "Lima", hex: "#a3e635", glow: "rgba(163,230,53,0.18)" },
  { name: "Ámbar", hex: "#fbbf24", glow: "rgba(251,191,36,0.18)" },
];

const ROWS = [
  { metric: "requests/s", value: "48 212", delta: "+12.4%", up: true, spark: [22, 28, 26, 35, 40, 44, 52, 60] },
  { metric: "p95 latency", value: "142 ms", delta: "-8.1%", up: true, spark: [60, 55, 58, 48, 44, 40, 36, 30] },
  { metric: "error rate", value: "0.42%", delta: "+0.9%", up: false, spark: [10, 12, 11, 15, 13, 12, 14, 13] },
  { metric: "active users", value: "9 871", delta: "+4.2%", up: true, spark: [30, 34, 33, 40, 44, 52, 58, 66] },
  { metric: "cost/hora", value: "$212", delta: "-3.0%", up: true, spark: [40, 38, 39, 35, 34, 32, 30, 28] },
];

function spark(values: number[], w: number, h: number): string {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 2) - 1;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function Gallery() {
  const [accent, setAccent] = useState<Accent>(ACCENTS[0]);
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState("deploy --prod");
  const [last, setLast] = useState("Pulsa un botón o un badge para verlo en acción.");
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  const press = (msg: string) => setLast(msg);

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="uppercase tracking-[0.35em] text-xs font-bold" style={{ color: accent.hex }}>
            NeoUI
          </p>
          <h1 className="text-3xl md:text-4xl font-black mt-2">
            Componentes para dashboards de <span style={{ color: accent.hex }}>alta densidad</span>
          </h1>
          <p className="text-white/50 mt-2 max-w-xl">
            Librería UI demo con estética cyberpunk. Cambia el acento para ver el sistema de diseño en acción.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {ACCENTS.map((a) => (
            <button
              key={a.name}
              title={a.name}
              onClick={() => setAccent(a)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                accent.name === a.name ? "scale-110 border-white" : "border-white/20"
              }`}
              style={{ background: a.hex }}
            />
          ))}
        </div>
      </header>

      <div
        className="mb-6 rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm font-mono"
        role="status"
        aria-live="polite"
      >
        <span className="opacity-40">➜</span> <span style={{ color: accent.hex }}>{last}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Botones" accent={accent.hex}>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => press('Botón «Acción principal» pulsado')}
              style={{ background: accent.hex, color: "#09010d", boxShadow: `0 0 18px ${accent.glow}` }}
              className="rounded-lg px-5 py-2.5 font-bold text-sm transition-transform active:scale-95 cursor-pointer"
            >
              Acción principal
            </button>
            <button
              onClick={() => press('Botón «Outline» pulsado')}
              style={{ borderColor: accent.hex, color: accent.hex }}
              className="rounded-lg border px-5 py-2.5 font-bold text-sm transition-transform hover:bg-white/5 active:scale-95 cursor-pointer"
            >
              Outline
            </button>
            <button
              onClick={() => press('Botón «Ghost» pulsado')}
              className="rounded-lg border border-white/15 px-5 py-2.5 font-bold text-sm text-white/70 transition-transform hover:bg-white/5 hover:text-white active:scale-95 cursor-pointer"
            >
              Ghost
            </button>
            <button
              onClick={() => press('⚠ Botón «Destructivo» pulsado (acción no ejecutada en la demo)')}
              className="rounded-lg px-5 py-2.5 font-bold text-sm bg-red-500/15 text-red-300 border border-red-400/30 transition-transform hover:bg-red-500/25 active:scale-95 cursor-pointer"
            >
              Destructivo
            </button>
          </div>
        </Section>

        <Section title="Badges & estados" accent={accent.hex}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              active={selectedBadge === 0}
              onClick={() => {
                setSelectedBadge((s) => (s === 0 ? null : 0));
                press(selectedBadge === 0 ? 'Badge «Live» deseleccionado' : 'Badge «Live» seleccionado');
              }}
              style={{ color: accent.hex, background: accent.glow }}
            >
              Live
            </Badge>
            <Badge
              active={selectedBadge === 1}
              onClick={() => {
                setSelectedBadge((s) => (s === 1 ? null : 1));
                press(selectedBadge === 1 ? 'Badge «Operativo» deseleccionado' : 'Badge «Operativo» seleccionado');
              }}
              className="bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
            >
              Operativo
            </Badge>
            <Badge
              active={selectedBadge === 2}
              onClick={() => {
                setSelectedBadge((s) => (s === 2 ? null : 2));
                press(selectedBadge === 2 ? 'Badge «Degradado» deseleccionado' : 'Badge «Degradado» seleccionado');
              }}
              className="bg-amber-500/15 text-amber-300 border-amber-400/30"
            >
              Degradado
            </Badge>
            <Badge
              active={selectedBadge === 3}
              onClick={() => {
                setSelectedBadge((s) => (s === 3 ? null : 3));
                press(selectedBadge === 3 ? 'Badge «Caído» deseleccionado' : 'Badge «Caído» seleccionado');
              }}
              className="bg-red-500/15 text-red-300 border-red-400/30"
            >
              Caído
            </Badge>
            <Badge
              active={selectedBadge === 4}
              onClick={() => {
                setSelectedBadge((s) => (s === 4 ? null : 4));
                press(selectedBadge === 4 ? 'Badge «beta» deseleccionado' : 'Badge «beta» seleccionado');
              }}
              className="bg-white/5 text-white/50 border-white/15"
            >
              beta
            </Badge>
          </div>
        </Section>

        <Section title="Inputs & toggles" accent={accent.hex}>
          <div className="space-y-4">
            <label className="block text-xs text-white/50">
              Comando
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1.5 w-full rounded-lg bg-black/30 border border-white/15 px-3 py-2.5 text-sm font-mono focus:outline-none"
                style={{ borderColor: undefined }}
                onFocus={(e) => (e.currentTarget.style.borderColor = accent.hex)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "")}
              />
            </label>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Auto-escalado</p>
                <p className="text-xs text-white/45">Escala nodos por predicción de carga</p>
              </div>
              <button
                onClick={() => setEnabled((v) => !v)}
                className={`w-12 h-6 rounded-full transition-colors ${enabled ? "" : "bg-white/15"}`}
                style={enabled ? { background: accent.hex } : {}}
                aria-pressed={enabled}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${enabled ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        </Section>

        <Section title="Tarjeta con métrica" accent={accent.hex}>
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5">
            <p className="text-xs text-white/45">Rendimiento del clúster</p>
            <p className="text-4xl font-black mt-2" style={{ color: accent.hex }}>
              99.4%
            </p>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: "99.4%", background: accent.hex }} />
            </div>
            <p className="mt-2 text-xs text-white/45">Objetivo ≥ 99.0% · SLO mensual</p>
          </div>
        </Section>
      </div>

      <Section title="Tabla densa + sparklines" accent={accent.hex} wide>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-white/40 border-b border-white/10">
                <th className="py-2.5 pr-4">Métrica</th>
                <th className="py-2.5 pr-4">Valor</th>
                <th className="py-2.5 pr-4">Tendencia</th>
                <th className="py-2.5">Últimas horas</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.metric} className="border-b border-white/5">
                  <td className="py-3 pr-4 text-white/70">{r.metric}</td>
                  <td className="py-3 pr-4 font-bold">{r.value}</td>
                  <td className="py-3 pr-4">
                    <span className={r.up ? "text-emerald-300" : "text-red-300"}>{r.delta}</span>
                  </td>
                  <td className="py-3">
                    <svg viewBox="0 0 140 26" className="w-36 h-7">
                      <path d={spark(r.spark, 140, 26)} fill="none" stroke={accent.hex} strokeWidth={1.8} />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Snippet" accent={accent.hex} wide>
        <pre className="rounded-xl bg-black/40 border border-white/10 p-4 overflow-x-auto text-sm font-mono text-white/80">
          <code>
{`import { Badge, Spark, Toggle } from "@neoui/react";

export function ClusterHealth() {
  return (
    <Stat
      label="Uptime"
      value="99.4%"
      spark={<Spark data={healthSeries} accent="cyber" />}
      right={<Badge tone="ok">SLO ok</Badge>}
    />
  );
}`}
          </code>
        </pre>
      </Section>

      <footer className="mt-12 text-center text-xs text-white/35">
        NeoUI demo · React + Tailwind · objetivo: Storybook · Framer Motion
      </footer>
    </main>
  );
}

function Section({
  title,
  accent,
  wide,
  children,
}: {
  title: string;
  accent: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-white/[0.02] p-5 ${wide ? "md:col-span-2" : ""}`}
    >
      <h2 className="text-sm uppercase tracking-widest mb-4" style={{ color: accent }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Badge({
  className = "",
  style,
  children,
  onClick,
  active,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  const interactive = Boolean(onClick);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold transition-transform ${interactive ? "cursor-pointer active:scale-95" : ""} ${
        active ? "ring-2 ring-white/80 scale-105" : ""
      } ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
