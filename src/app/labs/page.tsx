import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '实训平台展品',
  description: 'DT Station · SmartMFG Lab 智能制造实训平台介绍',
}

const products = [
  {
    id: 'dt-station',
    name: 'DT-Station Pro',
    subtitle: '数字孪生实训工作站 · 入门首选',
    badge: '🏆 讯飞杯参赛项目',
    badgeColor: 'bg-amber-100 text-amber-700',
    price: '5–8 万元/套',
    description: '面向院校的轻量化数字孪生实训工作站。桌面级尺寸，开箱即教，6个核心硬件模块 + 数字孪生软件引擎 + AI智能助教（星火大模型）+ 完整课程包。',
    icon: '🏭',
    color: 'from-primary-600 to-primary-800',
    modules: [
      { name: 'M1 软PLC控制器', desc: 'Beremiz + IEC 61131-3，无需真实PLC硬件' },
      { name: 'M2 数字孪生引擎', desc: 'Unity3D 次开发，虚实融合仿真场景' },
      { name: 'M3 桌面实训台', desc: '传送带/气缸/传感器，真实工业组件' },
      { name: 'M4 AI智能助教', desc: '星火大模型，故障诊断/编程辅助' },
      { name: 'M5 IoT监控看板', desc: 'MQTT + Grafana，实时数据可视化' },
      { name: 'M6 课程资源包', desc: '42节课程视频 + 实验指导书 + PPT' },
    ],
    specs: [
      { label: '占地面积', value: '1.2m × 0.8m（桌面级）' },
      { label: '电源需求', value: '220V AC，< 500W' },
      { label: '通信协议', value: 'Modbus TCP / OPC UA / MQTT' },
      { label: '支持课程', value: '自动化控制 / 数字孪生 / 工业IoT' },
      { label: '适用年级', value: '大一至大三，可跨专业使用' },
    ],
  },
  {
    id: 'smart-mfg-lab',
    name: 'SmartMFG Lab',
    subtitle: '完整智能制造实训室 · 进阶扩展',
    badge: '🔭 旗舰产品',
    badgeColor: 'bg-violet-100 text-violet-700',
    price: '40–120 万元/套',
    description: '覆盖智能制造工程全专业课程的完整实训室。由多个 DT-Station 工作站 + 工业机器人 + 机器视觉 + 立体仓储 + 中央控制室组成，支持30人同时实训。',
    icon: '🏗️',
    color: 'from-violet-600 to-violet-900',
    modules: [
      { name: '多工位 DT-Station', desc: '4–8套工作站，支持联网协作实训' },
      { name: '工业机器人单元', desc: '六轴协作机器人，ROS2集成' },
      { name: '机器视觉工作站', desc: '缺陷检测 + 尺寸测量 + AI分类' },
      { name: '立体仓储系统', desc: '小型ASRS，配套WMS系统' },
      { name: '中央控制室', desc: 'SCADA + MES + 数字孪生总览' },
      { name: '全套课程体系', desc: '13门专业课配套，开箱即教' },
    ],
    specs: [
      { label: '占地面积', value: '100–200 m²' },
      { label: '并发学员', value: '最多30人同时实训' },
      { label: '交付周期', value: '60–90 天（含安装调试）' },
      { label: '覆盖课程', value: '13门智能制造核心专业课' },
      { label: '售后服务', value: '2年保修 + 永久课程更新' },
    ],
  },
]

export default function LabsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 rounded-full px-3 py-1 text-sm mb-4">
          🏆 实训平台展品
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">智能制造实训平台</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          从单工位 DT-Station 到完整 SmartMFG Lab，模块化扩展，
          覆盖智能制造工程全专业课程体系。
        </p>
      </div>

      {/* Products */}
      <div className="space-y-10 mb-12">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left: Hero */}
              <div className={`lg:col-span-2 bg-gradient-to-br ${product.color} p-10 flex flex-col justify-between text-white`}>
                <div>
                  <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4 ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                  <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                  <p className="text-white/70 text-sm mb-4">{product.subtitle}</p>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">{product.description}</p>
                  <div className="text-3xl font-bold mb-1">{product.price}</div>
                </div>
                <a
                  href="mailto:contact@aiitmc.online?subject=实训平台询价"
                  className="mt-4 block bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-5 py-3 rounded-xl text-center text-sm transition-colors"
                >
                  获取报价方案
                </a>
              </div>

              {/* Right: Details */}
              <div className="lg:col-span-3 p-8">
                {/* Modules */}
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-600 rounded-full" />
                  模块构成
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                  {product.modules.map((m) => (
                    <div key={m.name} className="bg-gray-50 rounded-xl p-3.5">
                      <div className="font-medium text-sm text-gray-900 mb-0.5">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent-500 rounded-full" />
                  技术规格
                </h3>
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s) => (
                      <tr key={s.label} className="border-b border-gray-100 last:border-0">
                        <td className="py-2 text-gray-500 w-1/3">{s.label}</td>
                        <td className="py-2 text-gray-900 font-medium">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Banner */}
      <div className="bg-gray-900 rounded-3xl p-8 md:p-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">📦</div>
            <div className="font-semibold mb-1">开箱即教</div>
            <div className="text-gray-400 text-sm">设备到位第一天即可正常上课，无需额外购买教材</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🔲</div>
            <div className="font-semibold mb-1">模块化扩展</div>
            <div className="text-gray-400 text-sm">从1套 DT-Station 按需扩展至完整 SmartMFG Lab</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-semibold mb-1">政策合规</div>
            <div className="text-gray-400 text-sm">符合教育部新专业目录要求，配合1+X证书认证培训</div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-4">需要定制化方案或现场演示？</p>
          <a
            href="mailto:contact@aiitmc.online?subject=实训平台咨询"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            预约线下演示 / 获取完整方案
          </a>
        </div>
      </div>
    </div>
  )
}
