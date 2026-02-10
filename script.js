/* ========================================
   科技进展 Dashboard — Data & Interactions
   ======================================== */

// ---- 七大领域数据 ----
const DOMAINS = [
  {
    id: 'ai',
    icon: '🧠',
    title: '人工智能 / AI',
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.35)',
    iconBg: 'rgba(99,102,241,0.12)',
    level: 'high',
    levelText: '高速发展',
    progress: 72,
    progressLabel: '从实验阶段迈向大规模商业落地，多模态、Agent AI 成型',
    points: [
      'GPT-5.5 / Claude 4 / Gemini 3.0 实现全模态理解（文本、图像、音频、视频）',
      'Agentic AI 从试点走向生产：可自主规划、调用工具、完成多步骤任务',
      '小型专精模型在垂直领域超越通用大模型，部署成本大幅下降',
      '多家 CEO 预测 AGI 将在 2027-2030 年间出现'
    ],
    details: `
      <h4>🔬 大语言模型 (LLM)</h4>
      <p>2025-2026 年间，LLM 完成了从文字聊天到全模态理解的跃迁。新一代模型可直接分析 X 光片、生成音乐、理解复杂视频场景。上下文窗口扩展至百万 token 级别，推理能力在数学和逻辑方面显著提升。</p>
      <h4>🤖 Agent AI（智能体）</h4>
      <p>Agent AI 是 2025-2026 年最核心的趋势。这些 LLM 驱动的智能体能够自主规划、推理、决策，调用外部工具完成复杂多步骤任务，已进入软件开发、DevOps、网络安全和数据分析等领域的日常生产环节。</p>
      <h4>🏭 企业落地</h4>
      <p>2026 年被视为 AI 从实验走向 ROI 的关键转折年。金融、医疗、法律行业大规模集成 LLM 进行自动化与洞察提取。合成数据生成、增强检索生成（RAG）等技术进一步提升可靠性。</p>
      <h4>⚡ 算力与芯片</h4>
      <p>AI 芯片竞赛白热化：NVIDIA、Google TPU、自研芯片百花齐放。能效优化和主权计算策略成为各国优先议程。</p>
    `
  },
  {
    id: 'driving',
    icon: '🚗',
    title: '自动驾驶',
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.35)',
    iconBg: 'rgba(34,211,238,0.12)',
    level: 'mid',
    levelText: '稳步推进',
    progress: 48,
    progressLabel: 'L2 普及、L4 Robotaxi 城市扩展中，L5 仍需数十年',
    points: [
      'L2 驾驶辅助已成为量产车标配（自适应巡航 + 车道保持）',
      'Waymo L4 Robotaxi 在凤凰城、旧金山、洛杉矶等城市商业运营',
      '端到端自动驾驶 (E2E) 用统一深度学习模型取代手工规则',
      'L5 全自动驾驶尚无系统实现，专家预计仍需数十年'
    ],
    details: `
      <h4>📊 市场与等级</h4>
      <p>全球自动驾驶市场预计 2025 年达 4283 亿美元，2026 年达 6269 亿美元。SAE L0-L2 覆盖率已超大部分量产车，L3 在少数高端车型中落地，L4 仅限特定地理围栏区域的 Robotaxi。</p>
      <h4>🔧 核心技术栈</h4>
      <p>LiDAR + 雷达 + 摄像头多传感器融合实现 360° 环境感知；AI/深度学习算法持续提升实时决策能力。V2X（车联万物）通信让车辆与基础设施、行人、网络实时交换数据。</p>
      <h4>🚕 Robotaxi 进展</h4>
      <p>Waymo 领先商业运营；Lyft 计划 2026 年进入欧洲市场；预计到 2035 年 Robotaxi 将在 40-80 个城市规模运营（美国和中国领先）。</p>
      <h4>🚛 自动卡车</h4>
      <p>中美两国在自动卡车的中距枢纽-枢纽干线运输已进入早期商用阶段，Continental 计划在 2027 年量产 L4 自动驾驶卡车系统。</p>
    `
  },
  {
    id: 'lang',
    icon: '💻',
    title: '编程语言',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.35)',
    iconBg: 'rgba(245,158,11,0.12)',
    level: 'high',
    levelText: '持续演进',
    progress: 80,
    progressLabel: 'Python 3.15 / Rust 2024 Edition / Go 1.25 发布，AI 深度融合',
    points: [
      'Python 3.15 引入 Tachyon 性能分析器 + JIT 编译器提速 4-8%',
      'Rust 2024 Edition (v1.85)：async trait 稳定化，编译速度提升 ~30%',
      'Go 1.25 发布，Go 2.0 计划扩展泛型与简化错误处理',
      'AI 代码助手（Agentic AI）重塑开发工作流，程序员角色向架构与审查转型'
    ],
    details: `
      <h4>🐍 Python</h4>
      <p>Python 3.14（2025.10）带来语法高亮 REPL 和 uv 包管理工具。Python 3.15（alpha 中，2026 年中 beta）引入 Tachyon 高频低开销采样分析器（PEP 799）、UTF-8 默认编码、新 PyBytesWriter C API、增强错误提示，JIT 编译器在多架构上提速 4-8%。</p>
      <h4>🦀 Rust</h4>
      <p>Rust 2024 Edition (v1.85) 同步大量改进：更强大的宏定义、async trait 稳定化、inline const 泛型、GATs。并行类型检查使大型 monorepo 编译加速 ~30%。2026 年度目标聚焦 "Beyond the &"（高级借用）、异步 Rust 愿景清晰化。Rust 在金融、汽车、航空、医疗、区块链、量子计算等领域加速渗透。</p>
      <h4>🐹 Go</h4>
      <p>Go 1.25（2025.8）更新了 workspace 功能和 JSON v2。Go 2.0 将带来扩展泛型、简化错误处理、高级依赖管理。Go 在云原生微服务和高并发后端领域的地位持续巩固。</p>
      <h4>🤖 AI 与开发工作流</h4>
      <p>AI 深度融合到开发过程中，从基础工具升级为 Agentic AI——能管理复杂多步骤任务的代码智能体。开发者角色正向架构设计与代码审查转型，AI 负责处理模板代码生成。</p>
    `
  },
  {
    id: 'quantum',
    icon: '⚛️',
    title: '量子计算',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.35)',
    iconBg: 'rgba(168,85,247,0.12)',
    level: 'mid',
    levelText: '加速突破',
    progress: 35,
    progressLabel: '量子优势已在特定任务中验证，纠错取得历史性进展',
    points: [
      'Google Willow 芯片 (105 qubit) 实现指数级纠错改进，特定算法快 13000 倍',
      'Caltech 实现 6100 qubit 中性原子阵列记录；Huera 运行 30000 qubit 系统',
      'HSBC 使用量子计算提升债券交易预测 34%；Ford 将排程时间从 30 分钟降至 5 秒内',
      '2026 年 D-Wave 宣布可扩展片上低温控制突破'
    ],
    details: `
      <h4>🏆 量子优势验证</h4>
      <p>IonQ 和 Ansys 使用 36 qubit 系统在医疗器械模拟中实现 12% 性能提升。Google Willow 芯片的 Quantum Echoes 算法运行速度为经典超算的 13000 倍。D-Wave 在磁性材料模拟中声称实现量子计算优势。</p>
      <h4>🔧 纠错进展</h4>
      <p>2025 年是量子纠错的里程碑年。Google Willow 实现亚阈值纠错——随物理量子位增加，逻辑错误率逐步降低。Microsoft + Quantinuum 在离子阱系统中实现错误率降低 800 倍。</p>
      <h4>📈 硬件竞赛</h4>
      <p>Fujitsu/RIKEN 256 qubit 超导系统，计划 2026 年达 1000 qubit。IBM Kookaburra 目标 1386 qubit。Caltech 6100 qubit 中性原子阵列保持叠加态 13 秒。全球量子市场 2025 年达 18-35 亿美元。</p>
      <h4>🔐 后量子密码学</h4>
      <p>随着量子能力增强，对现有加密标准的威胁日益增大。NIST 已发布后量子密码学（PQC）新标准，美国白宫准备强制联邦机构采用抗量子加密。"先收割、后解密"攻击成为紧迫安全关切。</p>
    `
  },
  {
    id: 'robot',
    icon: '🦾',
    title: '人形机器人',
    accent: '#ef4444',
    glow: 'rgba(239,68,68,0.35)',
    iconBg: 'rgba(239,68,68,0.12)',
    level: 'early',
    levelText: '原型走向量产',
    progress: 30,
    progressLabel: '从实验室走向工厂和家庭，但全场景自主仍是挑战',
    points: [
      '1X NEO 家用人形机器人计划 2026 年首批客户交付',
      'Tesla Optimus Gen 2 定价约 $30,000，兼顾工业与家庭场景',
      'UBTECH Walker S2 计划 2026 年在中国量产 10,000 台',
      '中国"闪电" (Bolt) 全尺寸人形机器人峰值速度达 10 m/s'
    ],
    details: `
      <h4>🏭 工业部署</h4>
      <p>Agility Robotics 的 Digit 已在仓库值班工作（暂与人员隔离）。UBTECH 工业人形机器人进入制造和物流场景。Boston Dynamics 在 CES 2026 展示全电动 Atlas，面向工业任务。</p>
      <h4>🏠 家庭场景</h4>
      <p>1X NEO 专注于家庭环境安全操作；Zerith H1 定位人形管家。但在有儿童和宠物的环境中确保安全仍是核心挑战。</p>
      <h4>🤸 运动能力</h4>
      <p>Lumos LUS1 可快速从地面起身；Magicbot Z1 展示后空翻和旋风踢等动态动作。DroidUp Moya 具备接近人类的步态和微表情。</p>
      <h4>🌏 全球竞争</h4>
      <p>中国企业设定了激进的量产目标，全球技术军备竞赛升温。Physical AI（物理人工智能）概念走向主流——AI 驱动的机器人出现在智能巡检、自动供应链等多样化现实场景。</p>
    `
  },
  {
    id: 'space',
    icon: '🚀',
    title: '航天科技',
    accent: '#3b82f6',
    glow: 'rgba(59,130,246,0.35)',
    iconBg: 'rgba(59,130,246,0.12)',
    level: 'high',
    levelText: '里程碑频出',
    progress: 65,
    progressLabel: 'SpaceX 星舰追求全复用，Falcon 9 累计飞行 500+ 次',
    points: [
      'Starship V3 计划 2026 年发射：完全可复用，入轨运力超 100 吨',
      'Falcon 9 单枚助推器创纪录飞行 32 次（截至 2025.12）',
      'SpaceX 2025 年完成第 500 次可复用助推器任务',
      'Starship Flight 10 成功验证轨道载荷投放、再入和受控溅落'
    ],
    details: `
      <h4>🌟 星舰 (Starship) 进展</h4>
      <p>SpaceX 目标在 2026 年实现星舰全复用——包括 Super Heavy 助推器捕获和 Starship 上面级回收。Starship V3 设计运力从 V2 的 35 吨跃升至 100+ 吨入轨。Flight 10（2025.8.26）成功完成轨道载荷投放、受控再入和印度洋溅落。</p>
      <h4>🔄 Falcon 9 复用</h4>
      <p>作为全球首枚轨道级可复用火箭，Falcon 9 单枚助推器最多飞行 32 次（截至 2025.12），累计完成 500+ 次复用任务。2025 年共执行 165 次发射，主要承担 Starlink 星座组网。2026 年初因第二级问题暂停发射以进行审查。</p>
      <h4>🎯 长期愿景</h4>
      <p>星舰的全复用是大幅降低发射成本、实现大规模载荷部署、支持月球基地、火星任务和建立轨道经济的核心战略。二级火箭复用研发已由星舰接棒。</p>
    `
  },
  {
    id: 'blockchain',
    icon: '⛓️',
    title: '区块链 / Web3',
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.35)',
    iconBg: 'rgba(16,185,129,0.12)',
    level: 'mid',
    levelText: '走向实用',
    progress: 45,
    progressLabel: '从投机走向基础设施：稳定币、RWA 代币化、DeFi 合规化',
    points: [
      '稳定币市值预计 2028 年达 1.2 万亿美元，成为跨境支付基础设施',
      '真实世界资产 (RWA) 代币化（房地产、债券等）从试点走向主流',
      '美国 GENIUS 法案与欧盟 MiCA 框架提供监管确定性',
      'AI + 区块链融合：智能合约自动审计、AI 增强的去中心化应用'
    ],
    details: `
      <h4>💰 稳定币基础设施</h4>
      <p>稳定币已巩固为加密生态的核心用例，广泛用于支付、跨境转账和资金管理。稳定币市值预计 2028 年达 1.2 万亿美元。</p>
      <h4>🏢 企业区块链</h4>
      <p>沃尔玛用区块链追踪供应链，摩根大通每日在其区块链网络上处理数十亿美元交易。企业区块链市场 CAGR 达 47.5%，预计 2032 年达 2878 亿美元。</p>
      <h4>🌐 Web3 用户体验</h4>
      <p>账户抽象（EIP-4337）将成为标准，简化钱包交互和交易流程。去中心化身份（DID）让用户获得对个人数据的更大控制权。Web3 市场预计 2026 年达 126 亿美元。</p>
      <h4>🎮 代币化与 GameFi</h4>
      <p>真实世界资产代币化正从试点走向主流金融基础设施，实现不动产/债券/大宗商品的碎片化持有和 7×24 全球市场。Web3 游戏收入预计超 450 亿美元。</p>
    `
  }
];

// ---- 里程碑时间线数据 ----
const MILESTONES = [
  { date: '2025 Q1', domain: 'ai', color: '#6366f1', title: 'GPT-4.5 & Claude 3.5 发布', desc: '多模态理解能力显著提升，Agent 功能初步商用' },
  { date: '2025 Q2', domain: 'quantum', color: '#a855f7', title: 'Google Willow 芯片', desc: '105 qubit 实现指数级纠错，量子优势在特定算法上验证' },
  { date: '2025 Q3', domain: 'space', color: '#3b82f6', title: 'Starship Flight 10', desc: '成功完成轨道载荷投放、再入和受控溅落' },
  { date: '2025 Q3', domain: 'lang', color: '#f59e0b', title: 'Rust 2024 Edition', desc: 'async trait 稳定化，编译速度提升 30%' },
  { date: '2025 Q4', domain: 'driving', color: '#22d3ee', title: 'Waymo 扩展至 6 城', desc: 'L4 Robotaxi 在美国更多城市开始商业运营' },
  { date: '2025 Q4', domain: 'lang', color: '#f59e0b', title: 'Python 3.14 发布', desc: '语法高亮 REPL、uv 包管理器、free-threading 改进' },
  { date: '2025 Q4', domain: 'space', color: '#3b82f6', title: 'Falcon 9 第 32 次复用', desc: '单枚助推器创纪录飞行 32 次' },
  { date: '2026 Q1', domain: 'quantum', color: '#a855f7', title: 'D-Wave 可扩展片上低温控制', desc: '解决了门模型量子计算机商业化的长期障碍' },
  { date: '2026 Q1', domain: 'robot', color: '#ef4444', title: 'CES 2026 全电动 Atlas', desc: 'Boston Dynamics 展示面向工业任务的新一代 Atlas' },
  { date: '2026 Q1', domain: 'blockchain', color: '#10b981', title: '美国 GENIUS 法案进展', desc: '稳定币监管框架推动机构入场' },
  { date: '2026 Q2', domain: 'ai', color: '#6366f1', title: 'Claude 4 / Gemini 3.0', desc: '全模态理解、更强推理能力、Agentic 工作流深度集成' },
  { date: '2026 中', domain: 'robot', color: '#ef4444', title: 'UBTECH 万台量产', desc: 'Walker S2 在中国量产目标 10,000 台' },
  { date: '2026 中', domain: 'lang', color: '#f59e0b', title: 'Python 3.15 Beta', desc: 'Tachyon 分析器、JIT 编译器提速 4-8%、UTF-8 默认编码' },
  { date: '2026 Q3', domain: 'space', color: '#3b82f6', title: 'Starship V3 发射', desc: '完全可复用，入轨运力超 100 吨' },
];

// ---- 顶部统计数据 ----
const STATS = [
  { value: '7', label: '追踪领域', color: '#6366f1' },
  { value: '80+', label: '关键突破', color: '#22d3ee' },
  { value: '2026', label: '更新至', color: '#f59e0b' },
  { value: '14', label: '里程碑事件', color: '#a855f7' },
];

// ---- 渲染函数 ----

function renderStats() {
  const container = document.getElementById('stats-row');
  container.innerHTML = STATS.map(s => `
    <div class="stat-card">
      <div class="stat-card__value" style="color: ${s.color}">${s.value}</div>
      <div class="stat-card__label">${s.label}</div>
    </div>
  `).join('');
}

function createProgressRing(progress, accent) {
  const r = 25;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;
  return `
    <svg class="progress-ring" viewBox="0 0 64 64">
      <circle class="progress-ring__bg" cx="32" cy="32" r="${r}"/>
      <circle class="progress-ring__fill"
        cx="32" cy="32" r="${r}"
        stroke="${accent}"
        stroke-dasharray="${c}"
        stroke-dashoffset="${c}"
        data-target-offset="${offset}"
        transform="rotate(-90 32 32)"/>
      <text class="progress-ring__text" x="32" y="32">${progress}%</text>
    </svg>
  `;
}

function renderCards(filter = 'all') {
  const container = document.getElementById('cards-grid');
  const filtered = filter === 'all' ? DOMAINS : DOMAINS.filter(d => d.id === filter);

  container.innerHTML = filtered.map(d => `
    <div class="domain-card" data-domain="${d.id}"
         style="--card-accent: ${d.accent}; --card-glow: ${d.glow}; --icon-bg: ${d.iconBg};">
      <div class="card-header">
        <div class="card-icon">${d.icon}</div>
        <div class="card-header-text">
          <div class="card-title">${d.title}</div>
          <span class="card-level level-${d.level}">${d.levelText}</span>
        </div>
      </div>
      <div class="progress-ring-container">
        ${createProgressRing(d.progress, d.accent)}
        <div class="progress-label">${d.progressLabel}</div>
      </div>
      <ul class="key-points">
        ${d.points.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <button class="expand-btn" onclick="toggleDetails(this)">
        查看详细分析 <span class="arrow">▼</span>
      </button>
      <div class="card-details">
        <div class="card-details__content">${d.details}</div>
      </div>
    </div>
  `).join('');

  // 重新设置 Intersection Observer
  observeCards();
}

function renderMilestones() {
  const container = document.getElementById('timeline');
  container.innerHTML = MILESTONES.map(m => `
    <div class="milestone">
      <div class="milestone__date">${m.date}</div>
      <span class="milestone__domain" style="background: ${m.color}22; color: ${m.color};">
        ${DOMAINS.find(d => d.id === m.domain)?.title.split('/')[0].trim() || m.domain}
      </span>
      <div class="milestone__title">${m.title}</div>
      <div class="milestone__desc">${m.desc}</div>
    </div>
  `).join('');
}

// ---- 交互 ----

function toggleDetails(btn) {
  const details = btn.nextElementSibling;
  const isOpen = details.classList.contains('open');
  details.classList.toggle('open');
  btn.classList.toggle('expanded');
  btn.querySelector('.arrow').textContent = isOpen ? '▼' : '▲';

  // 更新按钮文本
  const textNode = btn.childNodes[0];
  textNode.textContent = isOpen ? '查看详细分析 ' : '收起详细分析 ';
}

// 筛选
function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  });
}

// ---- Intersection Observer (入场动画) ----

function observeCards() {
  const cards = document.querySelectorAll('.domain-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 渐入 + 进度环动画
        setTimeout(() => {
          entry.target.classList.add('visible');
          animateProgressRing(entry.target);
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}

function animateProgressRing(card) {
  const fill = card.querySelector('.progress-ring__fill');
  if (fill) {
    const targetOffset = fill.dataset.targetOffset;
    requestAnimationFrame(() => {
      fill.style.strokeDashoffset = targetOffset;
    });
  }
}

// ---- 初始化 ----

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderCards();
  renderMilestones();
  setupFilters();
  loadDomainStatus();
});

// ---- 领域状态加载（文档式） ----

async function loadDomainStatus() {
  try {
    const res = await fetch('data/domain-status.json');
    if (!res.ok) throw new Error('No data file');
    const data = await res.json();
    applyDomainStatus(data);
  } catch {
    // 文件不存在时静默处理 — 使用静态数据即可
  }
}

function applyDomainStatus(data) {
  // 更新 hero 日期
  if (data.lastUpdated) {
    const d = new Date(data.lastUpdated);
    const dateStr = d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const heroDate = document.getElementById('hero-date');
    if (heroDate) heroDate.textContent = `最后更新：${dateStr}`;
  }

  // 将状态摘要注入到对应的领域卡片中
  const statuses = data.domainStatuses || {};
  const cards = document.querySelectorAll('.domain-card');

  cards.forEach(card => {
    const domainId = card.dataset.domain;
    const statusText = statuses[domainId];
    if (!statusText) return;

    // 在 key-points 后面、expand-btn 前面插入状态段落
    const expandBtn = card.querySelector('.expand-btn');
    if (!expandBtn) return;

    // 避免重复插入
    if (card.querySelector('.domain-status')) return;

    const statusEl = document.createElement('div');
    statusEl.className = 'domain-status';
    statusEl.innerHTML = `
      <div class="domain-status__header">
        <span class="domain-status__dot"></span>
        📌 最新动态
      </div>
      <p class="domain-status__text">${statusText}</p>
    `;
    expandBtn.parentNode.insertBefore(statusEl, expandBtn);
  });
}
