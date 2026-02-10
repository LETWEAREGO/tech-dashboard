/**
 * fetch-data.js
 * 
 * 数据抓取脚本 — 每周由 GitHub Actions 自动执行
 * 
 * 工作模式：
 *   1. 从 GitHub API / arXiv / RSS 抓取各领域最新数据
 *   2. 将原始数据整合为每个领域的**文档式状态摘要**（一段话描述当前进展程度）
 *   3. 与上一次结果对比，仅在有实质变化时才写入新文件
 *   4. 输出 → data/domain-status.json（前端读取并融入领域卡片中）
 */

const https = require('https');
const { parseStringPromise } = require('xml2js');
const fs = require('fs');
const path = require('path');

// ============================================================
// 配置
// ============================================================

const GITHUB_REPOS = [
    { owner: 'python', repo: 'cpython', domain: 'lang', label: 'Python' },
    { owner: 'rust-lang', repo: 'rust', domain: 'lang', label: 'Rust' },
    { owner: 'golang', repo: 'go', domain: 'lang', label: 'Go' },
    { owner: 'nodejs', repo: 'node', domain: 'lang', label: 'Node.js' },
    { owner: 'openai', repo: 'openai-python', domain: 'ai', label: 'OpenAI SDK' },
    { owner: 'huggingface', repo: 'transformers', domain: 'ai', label: 'HuggingFace Transformers' },
    { owner: 'pytorch', repo: 'pytorch', domain: 'ai', label: 'PyTorch' },
];

const ARXIV_QUERIES = [
    { query: 'cat:cs.AI', domain: 'ai', label: 'AI' },
    { query: 'cat:cs.CL', domain: 'ai', label: 'NLP' },
    { query: 'cat:cs.RO', domain: 'robot', label: '机器人学' },
    { query: 'cat:quant-ph', domain: 'quantum', label: '量子物理' },
];

const RSS_FEEDS = [
    { url: 'https://blog.rust-lang.org/feed.xml', domain: 'lang', label: 'Rust Blog' },
    { url: 'https://blog.python.org/feeds/posts/default', domain: 'lang', label: 'Python Blog' },
    { url: 'https://go.dev/blog/feed.atom', domain: 'lang', label: 'Go Blog' },
    { url: 'https://openai.com/blog/rss/', domain: 'ai', label: 'OpenAI Blog' },
    { url: 'https://blog.ethereum.org/feed.xml', domain: 'blockchain', label: 'Ethereum Blog' },
];

// ============================================================
// HTTP 工具函数
// ============================================================

function fetchUrl(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const getModule = url.startsWith('https') ? https : require('http');
        const options = {
            headers: { 'User-Agent': 'TechProgressDashboard/1.0', 'Accept': 'application/json', ...headers },
        };
        getModule.get(url, options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location, headers).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
                else reject(new Error(`HTTP ${res.statusCode}: ${url}`));
            });
        }).on('error', reject);
    });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ============================================================
// 数据抓取
// ============================================================

async function fetchGitHubReleases() {
    console.log('📦 获取 GitHub Releases...');
    const results = {};
    const token = process.env.GH_TOKEN || '';
    const headers = token ? { 'Authorization': `token ${token}` } : {};

    for (const repo of GITHUB_REPOS) {
        try {
            const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/releases/latest`;
            const raw = await fetchUrl(url, headers);
            const data = JSON.parse(raw);
            if (!results[repo.domain]) results[repo.domain] = [];
            results[repo.domain].push({
                label: repo.label,
                version: data.tag_name || '',
                date: data.published_at ? data.published_at.split('T')[0] : '',
            });
            console.log(`  ✅ ${repo.label}: ${data.tag_name || 'N/A'}`);
        } catch (err) {
            console.log(`  ⚠️ ${repo.label}: ${err.message}`);
        }
        await sleep(300);
    }
    return results;
}

async function fetchArxivTopics() {
    console.log('📄 获取 arXiv 论文方向...');
    const results = {};

    for (const q of ARXIV_QUERIES) {
        try {
            const url = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(q.query)}&sortBy=submittedDate&sortOrder=descending&max_results=5`;
            const xml = await fetchUrl(url);
            const parsed = await parseStringPromise(xml, { explicitArray: false });
            const entries = parsed.feed.entry;
            if (!entries) continue;
            const items = Array.isArray(entries) ? entries : [entries];

            if (!results[q.domain]) results[q.domain] = [];
            const titles = items.map(e => (e.title || '').replace(/\s+/g, ' ').trim());
            results[q.domain].push({ label: q.label, recentTopics: titles });
            console.log(`  ✅ ${q.label}: ${items.length} 篇`);
        } catch (err) {
            console.log(`  ⚠️ ${q.label}: ${err.message}`);
        }
        await sleep(500);
    }
    return results;
}

async function fetchBlogUpdates() {
    console.log('📰 获取官方博客...');
    const results = {};

    for (const feed of RSS_FEEDS) {
        try {
            const xml = await fetchUrl(feed.url);
            const parsed = await parseStringPromise(xml, { explicitArray: false });
            let items = [];
            if (parsed.rss?.channel?.item) {
                const raw = parsed.rss.channel.item;
                items = Array.isArray(raw) ? raw : [raw];
            } else if (parsed.feed?.entry) {
                const raw = parsed.feed.entry;
                items = Array.isArray(raw) ? raw : [raw];
            }

            if (!results[feed.domain]) results[feed.domain] = [];
            const titles = items.slice(0, 3).map(item => {
                const t = item.title?._ || item.title || '';
                return String(t).replace(/\s+/g, ' ').trim();
            });
            results[feed.domain].push({ label: feed.label, recentPosts: titles });
            console.log(`  ✅ ${feed.label}: ${titles.length} 篇`);
        } catch (err) {
            console.log(`  ⚠️ ${feed.label}: ${err.message}`);
        }
        await sleep(300);
    }
    return results;
}

// ============================================================
// 将原始数据合成为"领域状态段落"
// ============================================================

function composeDomainStatus(domain, github, arxiv, blogs) {
    const gh = github[domain] || [];
    const ar = arxiv[domain] || [];
    const bl = blogs[domain] || [];

    switch (domain) {
        case 'ai':
            return composeAI(gh, ar, bl);
        case 'lang':
            return composeLang(gh, ar, bl);
        case 'quantum':
            return composeQuantum(gh, ar, bl);
        case 'robot':
            return composeRobot(gh, ar, bl);
        case 'blockchain':
            return composeBlockchain(gh, ar, bl);
        default:
            return null;
    }
}

function composeAI(gh, ar, bl) {
    const parts = [];

    // GitHub releases
    const versions = gh.map(r => `${r.label} ${r.version}`).filter(Boolean);
    if (versions.length > 0) {
        parts.push(`核心开源框架最新版本：${versions.join('、')}。`);
    }

    // arXiv 热门方向
    const allTopics = ar.flatMap(a => a.recentTopics || []);
    if (allTopics.length > 0) {
        // 提取关键主题词
        const keywords = extractKeyThemes(allTopics, ['LLM', 'Vision', 'Agent', 'Diffusion', 'Reinforcement', 'Multimodal', 'Transformer', 'CAPTCHA', 'Robustness', 'Generation', 'Phishing', 'Privacy']);
        if (keywords.length > 0) {
            parts.push(`学术前沿聚焦方向：${keywords.join('、')}。`);
        }
    }

    // Blog
    const blogTitles = bl.flatMap(b => b.recentPosts || []).slice(0, 2);
    if (blogTitles.length > 0) {
        parts.push(`官方动态：${blogTitles.join('；')}。`);
    }

    return parts.length > 0 ? parts.join('') : null;
}

function composeLang(gh, ar, bl) {
    const parts = [];

    // 版本号汇总
    const versions = gh.map(r => `${r.label} ${r.version}（${r.date}）`).filter(Boolean);
    if (versions.length > 0) {
        parts.push(`各语言最新稳定版：${versions.join('、')}。`);
    }

    // Blog
    const blogSummaries = [];
    for (const b of bl) {
        const titles = (b.recentPosts || []).slice(0, 2);
        if (titles.length > 0) {
            blogSummaries.push(`${b.label} 近期文章：${titles.join('、')}`);
        }
    }
    if (blogSummaries.length > 0) {
        parts.push(blogSummaries.join('。') + '。');
    }

    return parts.length > 0 ? parts.join('') : null;
}

function composeQuantum(gh, ar, bl) {
    const parts = [];

    const allTopics = ar.flatMap(a => a.recentTopics || []);
    if (allTopics.length > 0) {
        const keywords = extractKeyThemes(allTopics, ['Quantum', 'Qubit', 'Entangle', 'Simulation', 'Sensing', 'Error Correction', 'Hybrid', 'Photon', 'Optomech']);
        if (keywords.length > 0) {
            parts.push(`近期学术研究聚焦：${keywords.join('、')}。`);
        }
        parts.push(`最新论文涵盖：${allTopics.slice(0, 3).map(t => `"${truncate(t, 40)}"`).join('、')}等。`);
    }

    return parts.length > 0 ? parts.join('') : null;
}

function composeRobot(gh, ar, bl) {
    const parts = [];

    const allTopics = ar.flatMap(a => a.recentTopics || []);
    if (allTopics.length > 0) {
        const keywords = extractKeyThemes(allTopics, ['Manipulation', 'VLA', 'Reinforcement', 'Digital Twin', 'Navigation', 'Grasping', 'Locomotion', 'Humanoid']);
        if (keywords.length > 0) {
            parts.push(`学术热点：${keywords.join('、')}。`);
        }
        parts.push(`代表性论文：${allTopics.slice(0, 2).map(t => `"${truncate(t, 45)}"`).join('、')}。`);
    }

    return parts.length > 0 ? parts.join('') : null;
}

function composeBlockchain(gh, ar, bl) {
    const parts = [];

    const blogTitles = bl.flatMap(b => b.recentPosts || []).slice(0, 3);
    if (blogTitles.length > 0) {
        parts.push(`Ethereum 官方动态：${blogTitles.join('、')}。`);
    }

    return parts.length > 0 ? parts.join('') : null;
}

// 辅助：从论文标题中提取关键主题
function extractKeyThemes(titles, keywords) {
    const found = [];
    for (const kw of keywords) {
        if (titles.some(t => t.toLowerCase().includes(kw.toLowerCase())) && !found.includes(kw)) {
            found.push(kw);
        }
    }
    return found.slice(0, 5);
}

function truncate(str, len) {
    return str.length > len ? str.substring(0, len) + '…' : str;
}

// ============================================================
// 主函数
// ============================================================

async function main() {
    console.log('🚀 开始抓取科技进展数据...\n');

    const [github, arxiv, blogs] = await Promise.all([
        fetchGitHubReleases(),
        fetchArxivTopics(),
        fetchBlogUpdates(),
    ]);

    // 为每个领域生成状态摘要
    const domainIds = ['ai', 'lang', 'quantum', 'robot', 'blockchain'];
    const statuses = {};
    for (const id of domainIds) {
        const status = composeDomainStatus(id, github, arxiv, blogs);
        if (status) {
            statuses[id] = status;
        }
    }

    const output = {
        lastUpdated: new Date().toISOString(),
        domainStatuses: statuses,
    };

    // 确保 data 目录存在
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // 对比旧数据，仅在有变化时才写入
    const outputPath = path.join(dataDir, 'domain-status.json');
    let hasChanges = true;

    if (fs.existsSync(outputPath)) {
        try {
            const oldData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
            const oldStatuses = JSON.stringify(oldData.domainStatuses || {});
            const newStatuses = JSON.stringify(statuses);
            if (oldStatuses === newStatuses) {
                hasChanges = false;
                console.log('\n⏸️  数据与上次相同，无需更新。');
            }
        } catch { /* 旧文件损坏，视为有变化 */ }
    }

    if (hasChanges) {
        fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
        console.log(`\n✅ 领域状态已更新 → ${outputPath}`);
        Object.entries(statuses).forEach(([id, text]) => {
            console.log(`  📌 ${id}: ${text.substring(0, 60)}...`);
        });
    }
}

main().catch(err => {
    console.error('❌ 抓取失败:', err);
    process.exit(1);
});
