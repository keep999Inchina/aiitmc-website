import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '物联网平台',
  description: '工业物联网设备实时数据看板演示',
}

const dataPoints = [
  { label: '传送带转速',     value: '1200',  unit: 'RPM',  trend: 'up',   color: 'text-green-600',  bg: 'bg-green-50' },
  { label: '电机温度',       value: '62.3',  unit: '°C',   trend: 'stable', color: 'text-blue-600',  bg: 'bg-blue-50' },
  { label: '电流',           value: '4.82',  unit: 'A',    trend: 'down', color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: '工件计数',       value: '1,847', unit: '件',   trend: 'up',   color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: '设备在线率 OEE', value: '94.7',  unit: '%',    trend: 'up',   color: 'text-emerald-600',bg: 'bg-emerald-50' },
  { label: '环境湿度',       value: '48.2',  unit: '%RH',  trend: 'stable', color: 'text-cyan-600',   bg: 'bg-cyan-50' },
]

const trendIcon = (trend: string) => {
  if (trend === 'up')     return <span className="text-green-500 text-xs">▲</span>
  if (trend === 'down')   return <span className="text-red-500 text-xs">▼</span>
  return <span className="text-gray-400 text-xs">—</span>
}

const techStack = [
  { name: 'EMQ X Broker', desc: 'MQTT 消息代理', icon: '📡' },
  { name: 'Node-RED',     desc: '数据流编排',    icon: '🔀' },
  { name: 'InfluxDB',     desc: '时序数据库',    icon: '🗄️' },
  { name: 'Grafana',      desc: '可视化看板',    icon: '📊' },
  { name: 'ESP32-S3',     desc: '边缘采集节点',  icon: '🔌' },
  { name: 'S7-1200',      desc: 'PLC 数据源',    icon: '⚙️' },
]

export default function IotPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 rounded-full px-3 py-1 text-sm mb-4">
          🌐 物联网实时看板
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">物联网平台</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          实验室设备实时数据监控。MQTT → Node-RED → InfluxDB → Grafana 全栈架构，
          展示工业物联网数据流的端到端实现。
        </p>
      </div>

      {/* Live Data Dashboard (Static Demo) */}
      <div className="bg-gray-900 rounded-3xl p-6 md:p-8 mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-semibold">DT-Station 实验室 — 实时数据</span>
          </div>
          <span className="text-gray-500 text-sm">静态演示数据 · 接入真实设备后自动更新</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dataPoints.map((dp) => (
            <div key={dp.label} className={`${dp.bg} rounded-2xl p-5`}>
              <div className="text-gray-500 text-xs mb-2">{dp.label}</div>
              <div className="flex items-end gap-1.5">
                <span className={`text-2xl font-bold ${dp.color}`}>{dp.value}</span>
                <span className="text-gray-500 text-sm pb-0.5">{dp.unit}</span>
                <span className="pb-0.5">{trendIcon(dp.trend)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">技术架构</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((t, i) => (
            <div key={t.name} className="flex flex-col items-center text-center bg-white rounded-2xl border border-gray-100 p-5">
              <span className="text-3xl mb-2">{t.icon}</span>
              <span className="font-semibold text-sm text-gray-900">{t.name}</span>
              <span className="text-xs text-gray-500 mt-1">{t.desc}</span>
              {i < 5 && (
                <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 text-xl">→</span>
              )}
            </div>
          ))}
        </div>
        {/* Flow arrows for desktop */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
          <span className="bg-gray-100 px-3 py-1 rounded-full">设备采集</span>
          <span>→</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">MQTT 上报</span>
          <span>→</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">流编排处理</span>
          <span>→</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">时序存储</span>
          <span>→</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">可视化看板</span>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 text-center">
        <div className="text-4xl mb-4">🔌</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">想接入你的设备？</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          支持 Modbus RTU/TCP、OPC UA、MQTT 等多种协议，可对接西门子、三菱、汇川等主流品牌 PLC。
        </p>
        <a
          href="mailto:contact@aiitmc.online?subject=物联网平台接入咨询"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          咨询接入方案
        </a>
      </div>
    </div>
  )
}
