import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '数字孪生演示',
  description: 'DT-Station Pro 数字孪生智能制造工作站演示窗口',
}

const demos = [
  {
    id: 'dt-station-overview',
    title: 'DT-Station Pro 总览演示',
    description: '展示数字孪生工作站的虚实融合效果：左屏虚拟仿真实时联动右屏真实设备运行状态。',
    type: 'video',
    placeholder: '演示视频加载中……',
    tags: ['数字孪生', 'PLC', '虚实融合'],
  },
  {
    id: 'conveyor-simulation',
    title: '传送带产线仿真',
    description: '基于 Unity3D 的传送带产线数字孪生模型，支持速度调节、工件追踪、OEE 实时计算。',
    type: 'video',
    placeholder: '演示视频加载中……',
    tags: ['产线仿真', 'OEE', 'Unity3D'],
  },
  {
    id: 'robot-arm-twin',
    title: '六轴机械臂数字孪生',
    description: 'ROS2 驱动的六轴机械臂虚实同步演示，可在虚拟环境中编程验证后直接部署到真实设备。',
    type: 'video',
    placeholder: '演示视频即将上线',
    tags: ['机械臂', 'ROS2', '轨迹规划'],
    comingSoon: true,
  },
]

const features = [
  { icon: '🔗', title: '实时数据联动', desc: 'OPC UA / Modbus 协议接入真实 PLC，虚拟模型与物理设备毫秒级同步' },
  { icon: '🛡️', title: '100% 安全学习', desc: '学员在虚拟环境中反复练习，避免误操作损坏真实设备' },
  { icon: '📊', title: 'AI 智能诊断', desc: '星火大模型实时分析运行数据，自动提示故障位置和处理建议' },
  { icon: '🎓', title: '开箱即教', desc: '配套完整课程包，设备到位第一天即可正常上课' },
]

export default function DigitalTwinPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 rounded-full px-3 py-1 text-sm mb-4">
          🏭 数字孪生演示中心
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">数字孪生窗口</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          虚实融合的智能制造仿真演示。以虚带实，以实验虚——
          在虚拟环境中完成编程练习，在真实设备上验证关键操作。
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {features.map((f) => (
          <div key={f.title} className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="font-semibold text-violet-900 text-sm mb-1">{f.title}</div>
            <div className="text-violet-700 text-xs leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Demo Videos */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">演示视频</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {demos.map((demo) => (
          <div key={demo.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover">
            {/* Video Placeholder */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 aspect-video flex items-center justify-center relative">
              {demo.comingSoon ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">🚧</div>
                  <p className="text-gray-400 text-sm">即将上线</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors mb-2">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-xs">{demo.placeholder}</p>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{demo.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{demo.description}</p>
              <div className="flex flex-wrap gap-1">
                {demo.tags.map((t) => (
                  <span key={t} className="tag bg-violet-100 text-violet-700 text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3D Model Coming Soon Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-primary-600 rounded-3xl p-8 md:p-10 text-white text-center">
        <div className="text-4xl mb-4">🔮</div>
        <h2 className="text-2xl font-bold mb-3">交互式 3D 数字孪生模型即将上线</h2>
        <p className="text-white/80 max-w-xl mx-auto leading-relaxed mb-6">
          基于 Three.js 的浏览器内 3D 交互模型正在开发中。届时可直接在网页中旋转查看 DT-Station 的每个模块，
          并与实时数据联动。
        </p>
        <a
          href="mailto:contact@aiitmc.online?subject=数字孪生演示体验申请"
          className="inline-block bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
        >
          预约线下演示体验
        </a>
      </div>
    </div>
  )
}
