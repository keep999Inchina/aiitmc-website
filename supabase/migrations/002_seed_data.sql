-- Seed data: Migrate hardcoded content from page components to Supabase
-- Run this AFTER 001_initial_schema.sql

-- ==========================================
-- Articles
-- ==========================================
INSERT INTO public.articles (title, slug, excerpt, category, tags, is_premium, published, featured, read_time, content) VALUES
(
  '西门子 S7-1200 PID 控制实战：从参数整定到工程应用',
  'siemens-s7-1200-pid',
  '详解 S7-1200 内置 PID 指令块的使用方法，包含温度控制、流量控制典型案例，手把手完成参数自整定。',
  'PLC编程',
  ARRAY['S7-1200', 'PID', 'TIA Portal'],
  false, true, true, '12 分钟',
  E'# 西门子 S7-1200 PID 控制实战\n\n## 前言\n\nPID 控制是工业自动化中最常用的闭环控制算法。S7-1200 内置了高质量的 PID 指令库，本文带你从零掌握它。\n\n## 1. PID 基本原理回顾\n\nPID = **P**roportional（比例）+ **I**ntegral（积分）+ **D**erivative（微分）\n\n- **P（比例）**：当前误差的立即响应，增大 Kp 加快响应但可能振荡\n- **I（积分）**：消除稳态误差，增大 Ki 消除静差但降低稳定性\n- **D（微分）**：预测误差趋势，增大 Kd 减少超调但对噪声敏感\n\n## 2. TIA Portal 中的 PID 指令块\n\nS7-1200 提供两种 PID 指令块：\n\n| 指令块 | 适用场景 |\n|--------|----------|\n| `PID_Compact` | 通用 PID，自带自整定功能 |\n| `PID_3Step` | 带执行器的三步控制（阀门等） |\n\n（完整内容请查看配套课程视频）'
),
(
  '用 Unity 搭建数字孪生工厂：从零到可视化仿真',
  'digital-twin-unity',
  '从 CAD 模型导入、场景搭建到 OPC UA 数据驱动，完整演示数字孪生产线的构建流程。',
  '数字孪生',
  ARRAY['Unity3D', 'OPC UA', 'GLTF'],
  false, true, true, '18 分钟',
  E'# 用 Unity 搭建数字孪生工厂\n\n（内容建设中）'
),
(
  'ESP32-S3 + Modbus TCP 实现工业设备数据采集',
  'esp32-modbus-iot',
  '基于 ESP32-S3 开发板，实现 Modbus TCP 协议与西门子 PLC 通信，数据上云全流程演示。',
  'IoT开发',
  ARRAY['ESP32-S3', 'Modbus', 'MQTT'],
  false, true, true, '15 分钟',
  E'# ESP32-S3 + Modbus TCP 实现工业设备数据采集\n\n（内容建设中）'
),
(
  'S7-1200 SCL 结构化控制语言入门：比梯形图更高效',
  's7-1200-scl-basics',
  '当梯形图写得越来越长，是时候学 SCL 了。本文用10个典型程序教你从梯形图平滑迁移到 SCL。',
  'PLC编程',
  ARRAY['S7-1200', 'SCL', 'TIA Portal'],
  false, true, false, '10 分钟',
  E'# S7-1200 SCL 结构化控制语言入门\n\n（内容建设中）'
),
(
  '为什么你学了十年数学还是不会用？直觉式数学学习法',
  'math-intuition-learning',
  '传统数学教育强调记忆和程序，而真正的数学理解来自直觉和连接。这篇文章提出一套从小学到大学的直觉式数学学习路径。',
  '数学教育',
  ARRAY['数学教育', '学习方法', '教学改革'],
  false, true, false, '8 分钟',
  E'# 为什么你学了十年数学还是不会用？\n\n（内容建设中）'
);

-- ==========================================
-- Courses
-- ==========================================
INSERT INTO public.courses (title, slug, description, level, icon, color, is_premium, lessons, duration, status, published, tags) VALUES
(
  'S7-1200 PLC 编程与应用完整课程',
  'plc-s7-1200-complete',
  '从基础梯形图到高级编程，涵盖定时器/计数器/通信/PID/SCL，配套25个实验，每节课附练习题。',
  '初学到进阶', '🔧', 'from-blue-500 to-blue-700',
  false, 42, '约36小时', 'available', true,
  ARRAY['S7-1200', 'TIA Portal', 'PID', 'SCL', 'Modbus']
),
(
  '数字孪生技术基础与实践',
  'digital-twin-fundamentals',
  '理解数字孪生核心概念，动手搭建虚实融合的工厂仿真系统，对接真实设备数据，包含Unity3D实战。',
  '中级', '🏭', 'from-emerald-500 to-emerald-700',
  false, 28, '约24小时', 'available', true,
  ARRAY['Unity3D', 'OPC UA', '数字孪生', '仿真']
),
(
  'AI赋能MCU开发：ESP32-S3 全实战',
  'ai-mcu-esp32',
  '14个外设模块、43项实验，从传感器采集到边缘AI推理，全程配套 AI-Edge32 Pro 硬件套件。',
  '中级', '🤖', 'from-violet-500 to-violet-700',
  true, 35, '约30小时', 'available', true,
  ARRAY['ESP32-S3', 'Arduino', 'AI推理', 'Modbus']
),
(
  '工业物联网平台开发实战',
  'industrial-iot-platform',
  'MQTT协议 + Node-RED + Grafana，搭建生产环境可用的工业数据采集与可视化平台。',
  '进阶', '🌐', 'from-orange-500 to-orange-700',
  true, 20, '约18小时', 'coming_soon', true,
  ARRAY['MQTT', 'Node-RED', 'Grafana', 'EMQ X']
),
(
  '直觉式数学：小学到高中全阶段',
  'math-intuition-k12',
  '打破死记硬背，用直觉和连接理解数学。从整数到微积分，每个概念都有"为什么这样"的解释。',
  '通识', '🔢', 'from-amber-500 to-amber-700',
  false, 50, '约45小时', 'coming_soon', true,
  ARRAY['数学', '直觉学习', '教育改革']
);

-- ==========================================
-- Products (DIY kits)
-- ==========================================
INSERT INTO public.products (name, subtitle, description, price, price_note, icon, color, tags, features, buy_url, status, published) VALUES
(
  'AI-Edge32 Pro 实验套件',
  'ESP32-S3 · 14外设 · 43项实验',
  '基于 ESP32-S3 的边缘 AI 实验套件，包含 OLED、DHT22、舵机、步进电机、光照传感器等14个外设模块，配套43项实验，覆盖传感器、通信、AI推理全链路。',
  '¥107', '元器件BOM成本', '🤖', 'from-violet-500 to-purple-700',
  ARRAY['ESP32-S3', 'AI推理', 'Modbus', 'MQTT', 'Arduino'],
  ARRAY['14个外设模块', '43项动手实验', '配套课程视频', 'KiCad 8工程开源'],
  '#', 'available', true
),
(
  'PLC 入门学习套件',
  '模拟量 · 数字量 · Modbus通信',
  '配合 S7-1200 PLC 课程的实验套件，包含按钮面板、指示灯模块、模拟量输入输出、Modbus TCP 转换器等，无需购买完整工控系统即可完成90%的课程实验。',
  '询价', '含对应S7-1200模块', '🔧', 'from-blue-500 to-blue-700',
  ARRAY['S7-1200', 'Modbus', '模拟量', '数字量'],
  ARRAY['适配PLC课程实验', '按钮+指示灯面板', 'Modbus转换器', '接线图附送'],
  'mailto:contact@aiitmc.online?subject=PLC学习套件询价', 'inquiry', true
),
(
  '工业传感器采集包',
  'RS485 · 温湿度 · 电流 · 振动',
  '工业级传感器组合包：RS485温湿度传感器 + 交流电流互感器 + 振动传感器 + ESP32网关，可直接接入本站物联网平台，实现工业现场数据采集上云。',
  '询价', '', '📡', 'from-orange-500 to-orange-700',
  ARRAY['RS485', 'Modbus RTU', '传感器', 'MQTT'],
  ARRAY['RS485协议', '即插即用', '配套Node-RED流', 'MQTT上云'],
  'mailto:contact@aiitmc.online?subject=工业传感器包询价', 'inquiry', true
);

-- ==========================================
-- Lab items
-- ==========================================
INSERT INTO public.lab_items (name, subtitle, badge, badge_color, price, description, icon, color, modules, specs, published) VALUES
(
  'DT-Station Pro',
  '数字孪生实训工作站 · 入门首选',
  '🏆 讯飞杯参赛项目',
  'bg-amber-100 text-amber-700',
  '5–8 万元/套',
  '面向院校的轻量化数字孪生实训工作站。桌面级尺寸，开箱即教，6个核心硬件模块 + 数字孪生软件引擎 + AI智能助教（星火大模型）+ 完整课程包。',
  '🏭',
  'from-primary-600 to-primary-800',
  '[{"name":"M1 软PLC控制器","desc":"Beremiz + IEC 61131-3，无需真实PLC硬件"},{"name":"M2 数字孪生引擎","desc":"Unity3D 次开发，虚实融合仿真场景"},{"name":"M3 桌面实训台","desc":"传送带/气缸/传感器，真实工业组件"},{"name":"M4 AI智能助教","desc":"星火大模型，故障诊断/编程辅助"},{"name":"M5 IoT监控看板","desc":"MQTT + Grafana，实时数据可视化"},{"name":"M6 课程资源包","desc":"42节课程视频 + 实验指导书 + PPT"}]'::jsonb,
  '[{"label":"占地面积","value":"1.2m × 0.8m（桌面级）"},{"label":"电源需求","value":"220V AC，< 500W"},{"label":"通信协议","value":"Modbus TCP / OPC UA / MQTT"},{"label":"支持课程","value":"自动化控制 / 数字孪生 / 工业IoT"},{"label":"适用年级","value":"大一至大三，可跨专业使用"}]'::jsonb,
  true
),
(
  'SmartMFG Lab',
  '完整智能制造实训室 · 进阶扩展',
  '🔭 旗舰产品',
  'bg-violet-100 text-violet-700',
  '40–120 万元/套',
  '覆盖智能制造工程全专业课程的完整实训室。由多个 DT-Station 工作站 + 工业机器人 + 机器视觉 + 立体仓储 + 中央控制室组成，支持30人同时实训。',
  '🏗️',
  'from-violet-600 to-violet-900',
  '[{"name":"多工位 DT-Station","desc":"4–8套工作站，支持联网协作实训"},{"name":"工业机器人单元","desc":"六轴协作机器人，ROS2集成"},{"name":"机器视觉工作站","desc":"缺陷检测 + 尺寸测量 + AI分类"},{"name":"立体仓储系统","desc":"小型ASRS，配套WMS系统"},{"name":"中央控制室","desc":"SCADA + MES + 数字孪生总览"},{"name":"全套课程体系","desc":"13门专业课配套，开箱即教"}]'::jsonb,
  '[{"label":"占地面积","value":"100–200 m²"},{"label":"并发学员","value":"最多30人同时实训"},{"label":"交付周期","value":"60–90 天（含安装调试）"},{"label":"覆盖课程","value":"13门智能制造核心专业课"},{"label":"售后服务","value":"2年保修 + 永久课程更新"}]'::jsonb,
  true
);
