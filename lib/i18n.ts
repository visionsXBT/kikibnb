export type Lang = "en" | "zh";

const STRINGS = {
  en: {
    heroTitle: "Kiki",
    heroTagline:
      "Kiki is an AI agent that scans the market, surfaces what matters, and helps you decide with confidence.",
    heroImageAlt: "Kiki, your host",
    semiHeroAlt: "Kiki waving, secondary hero illustration",
    start: "Start",
    genericError: "Something went wrong.",
    langButton: "中文",
    langToggleAria: "Switch interface to Chinese",
    chatHome: "← Home",
    chatEmpty:
      "Ask about macro, equities, crypto, prediction markets, or how something works. Kiki will reason it through with you.",
    chatThinking: "Kiki is thinking…",
    chatPlaceholder: "Ask Kiki about markets…",
    chatInputAria: "Message to Kiki",
    chatSend: "Send",
    chatNoReply: "No reply from Kiki.",
    chatErrorGeneric: "Something went wrong.",
    aboutTitle: "What can Kiki do",
    bullet1Head: "AMM support post-bond",
    bullet1Body:
      "Built for automated market making after the bonding phase. On four.meme, transaction tax does not apply before bond, so tooling is limited early on. Once the token clears bond, Kiki can run in the tax-on environment for more structured liquidity and stronger post-launch activity instead of only riding early attention.",
    bullet2Head: "Automated market updates on X",
    bullet2Body:
      "Kiki posts recurring market updates from her X account so the project keeps a steady voice and followers see ongoing activity without relying entirely on manual posts.",
    bullet3Head: "Website chat for market insights",
    bullet3Body:
      "The site chat lets users ask questions and get insight-style answers in a conversational layer beyond posts and charts, making the product feel more interactive and useful day to day.",
    bullet4Head: "On-tag launches on X (UPCOMING)",
    bullet4Body:
      'Users will be able to mention Kiki on X with a name, ticker, and image to start a launch flow; for example: "@Kiki, launch $TICKER with the name … with an uploaded picture."',
    backedByTitle: "Trusted by",
    ecosystemTitle: "Ecosystem",
    ecosystemIntro:
      "Partners, venues, and tooling that extend Kiki. Integrations roll out as contracts and policy allow, so launches stay composable without forcing teams into one stack.",
    ecosystemCard1Title: "AI trading assistant",
    ecosystemCard1Body:
      "Conversational market reasoning across tradfi, crypto, and prediction venues, with clear boundaries where insight ends and licensed advice begins.",
    ecosystemCard2Title: "AI market updates",
    ecosystemCard2Body:
      "Automated cadence from Kiki’s X presence so followers see steady signal between launches, not only when someone remembers to post.",
    ecosystemCard3Title: "AI token launcher",
    ecosystemCard3Badge: "Coming soon",
    ecosystemCard3Body:
      "Mention-driven flows to open a guided launch pipeline (name, ticker, and artwork) when venues, taxes, and policy align with the rollout.",
    backedAlt1: "Venture partner",
    backedAlt2: "Binance",
    backedAlt3: "BNB Chain",
    roadmapTitle: "Roadmap",
    roadmapP1Title: "Phase 1: Product & markets foundation (now)",
    roadmapP1Summary:
      "Kiki’s foundation is a bilingual public chat for tradfi, crypto, and prediction markets: mobile-polished and explicit about where insight ends and licensed advice begins. Automated X updates and a post-bond AMM lane (when venue taxes align with bonding rules) deliver steady signal and liquidity for the phases that follow.",
    roadmapP2Title: "Phase 2: X-native launch (UPCOMING)",
    roadmapP2Summary:
      "Users will start launches by mentioning Kiki on X with a name, ticker, and artwork inside a guided, auditable pipeline. Preflight checks, rate limits, and explicit consent gate any automated chain or venue action before access widens beyond the first partner cohort.",
    roadmapP3Title: "Phase 3: Ecosystem & integrations",
    roadmapP3Summary:
      "Curated data, venue, and wallet integrations let Kiki ground answers in fresher context wherever contracts and policy allow. Partners get webhooks and a slim API for opt-in automations; hosts get privacy-preserving aggregates to tune prompts and cadence without reading raw user content.",
    roadmapP4Title: "Phase 4: Scale, safety & depth",
    roadmapP4Summary:
      "The stack hardens with threat modeling, incident playbooks, and bounty readiness across market-facing surfaces. Disclosure and risk language regionalize as audiences diversify, and an optional deep-research mode can deliver longer briefs without slowing default chat.",
    footerNavAria: "Footer",
    footerPrivacy: "Privacy policy",
    footerTerms: "Terms of use",
    footerSupport: "Support",
    footerX: "X",
    footerTelegram: "Telegram",
    privacyTitle: "Privacy policy",
    privacyLastUpdated: "Last updated: May 4, 2026",
    privacyIntro:
      "Kiki (“we”, “us”) operates this website and related experiences such as the public chat. This policy explains what information may be involved when you use the service and how we treat it at a high level. It is not an exhaustive legal document for every jurisdiction. If you need specifics for your region, contact us through Support.",
    privacyH2Collect: "Information we collect",
    privacyPCollect:
      "You may provide content when you use the chat (your messages), when you submit the support form (name, email, subject, and message), and your language preference may be stored locally in your browser. Our hosting, AI, and analytics providers may also process limited technical data (such as IP address, device or browser type, and timestamps) in the ordinary course of delivering the site and APIs.",
    privacyH2Use: "How we use information",
    privacyPUse:
      "We use inputs to generate responses, operate and protect the service, debug issues, and understand aggregate usage. We do not sell your personal information. Where third-party models or infrastructure are used, they process prompts according to their terms and our configuration.",
    privacyH2Share: "Sharing",
    privacyPShare:
      "We share data only with service providers that help us run the product (for example cloud hosting and AI inference), when required by law, or to protect rights and safety. We do not publish your chat transcripts on this site.",
    privacyH2Retention: "Retention",
    privacyPRetention:
      "Retention periods depend on logs, provider defaults, and operational needs. You can clear locally stored language preference from your browser. For deletion requests, use the support form once a backend process exists; this demo does not persist form submissions.",
    privacyH2Security: "Security",
    privacyPSecurity:
      "We apply reasonable safeguards appropriate to an early-stage web product. No online service is perfectly secure; use the chat for general information, not for secrets you cannot afford to expose.",
    privacyH2Rights: "Your choices",
    privacyPRights:
      "Depending on where you live, you may have rights to access, correct, or delete personal data. Contact us via Support. We will respond in line with applicable law as our processes mature.",
    privacyH2Changes: "Changes to this policy",
    privacyPChanges:
      "We may update this page from time to time. The “Last updated” line will change when we do. Continued use after an update means you accept the revised policy.",
    termsTitle: "Terms of use",
    termsLastUpdated: "Last updated: May 4, 2026",
    termsIntro:
      "These terms govern your use of Kiki’s website and chat demo. By using the service, you agree to these terms. If you do not agree, do not use the service.",
    termsH2Accept: "Agreement",
    termsPAccept:
      "You represent that you are legally able to enter into this agreement and that you will comply with all applicable laws, including those related to financial promotions and sanctions, in your jurisdiction.",
    termsH2Service: "The service",
    termsPService:
      "Kiki provides informational and conversational features about markets and related topics. Features may change, pause, or end without notice. The service is provided “as is” without warranties of any kind.",
    termsH2NotAdvice: "Not financial, legal, or tax advice",
    termsPNotAdvice:
      "Outputs are generated by AI and may be wrong, incomplete, or outdated. Nothing on this site is an offer, solicitation, or personalized recommendation to buy or sell any asset. Consult qualified professionals before making decisions.",
    termsH2Conduct: "Acceptable use",
    termsPConduct:
      "You will not misuse the service, attempt to break or overload it, scrape it in violation of our policies, or use it for unlawful, harassing, or harmful activity. We may suspend access for violations or risk.",
    termsH2ThirdParty: "Third parties",
    termsPThirdParty:
      "The service may reference or link to third-party sites, protocols, or venues. We do not control them and are not responsible for their content, availability, or terms.",
    termsH2Disclaimer: "Limitation of liability",
    termsPDisclaimer:
      "To the fullest extent permitted by law, Kiki and its contributors are not liable for indirect or consequential damages, trading losses, or reliance on AI outputs. Your sole remedy is to stop using the service.",
    termsH2Changes: "Changes",
    termsPChanges:
      "We may modify these terms. The “Last updated” date will reflect changes. Continued use after updates constitutes acceptance.",
    supportTitle: "Support",
    supportIntro: "Tell us what you need help with.",
    supportNameLabel: "Name",
    supportEmailLabel: "Email",
    supportSubjectLabel: "Subject",
    supportMessageLabel: "Message",
    supportSubmit: "Submit",
    supportThanks: "Thanks. We received your message.",
  },
  zh: {
    heroTitle: "Kiki",
    heroTagline:
      "琪琪是一位人工智能助手，会扫描市场、提炼关键信息，并帮助你更有把握地做决策。",
    heroImageAlt: "你的助手琪琪",
    semiHeroAlt: "琪琪挥手示意，副视觉插画",
    start: "开始",
    genericError: "出了点问题，请稍后再试。",
    langButton: "English",
    langToggleAria: "切换到英文界面",
    chatHome: "← 首页",
    chatEmpty:
      "你可以问宏观、股票、加密货币、预测市场，或相关机制；琪琪会和你一起推演分析。",
    chatThinking: "琪琪正在思考…",
    chatPlaceholder: "向琪琪提问市场相关问题…",
    chatInputAria: "发给琪琪的消息",
    chatSend: "发送",
    chatNoReply: "没有收到琪琪的回复。",
    chatErrorGeneric: "请求失败，请稍后再试。",
    aboutTitle: "琪琪可以做什么",
    bullet1Head: "债券（bond）后的 AMM 支持",
    bullet1Body:
      "琪琪面向债券阶段完成后的自动化做市。在 four.meme 上，债券完成前交易税尚未生效，早期可做的事有限；代币过了 bond 后，琪琪才能在「含税」环境里按设计运作，提供更结构化的流动性与更强的上线后活跃度，而不只依赖早期热度。",
    bullet2Head: "X 上的自动化市场更新",
    bullet2Body:
      "琪琪会持续在 X 账号发布自动化市场更新，让项目保持固定声量与信息流，减少对纯人工发帖的依赖，让社区更稳定地看到与代币相关的动态。",
    bullet3Head: "网站内聊天与市场洞见",
    bullet3Body:
      "网站提供互动式聊天，用户可直接向琪琪提问并获取偏洞见型的回答，而不仅限于刷帖或看图表，让产品更「活」，也更好用。",
    bullet4Head: "在 X 上通过 @ 发起发射（UPCOMING）",
    bullet4Body:
      "用户将可在 X 上 @ 琪琪并提供名称、代币符号与图片以触发发射流程，例如：「@Kiki, launch $TICKER with the name … with an uploaded picture」。",
    backedByTitle: "值得信赖",
    ecosystemTitle: "生态",
    ecosystemIntro:
      "扩展琪琪能力的伙伴、场地与工具；随合约与政策就绪逐步接入集成，让发射保持可组合性，而不必把所有团队绑在同一套技术栈上。",
    ecosystemCard1Title: "AI 交易助手",
    ecosystemCard1Body:
      "在传统金融、加密货币与预测市场等场景下进行对话式研判，并清楚划分洞见与持牌建议的边界。",
    ecosystemCard2Title: "AI 市场更新",
    ecosystemCard2Body:
      "通过琪琪在 X 上的自动化节奏持续输出市场信号，让关注者在发射间歇期也能看到稳定更新，而不只靠人工发帖。",
    ecosystemCard3Title: "AI 代币发射台",
    ecosystemCard3Badge: "即将推出",
    ecosystemCard3Body:
      "在场地、税收与政策允许的条件下，通过 @ 提及等方式打开引导式发射流程，涵盖名称、代码与配图等环节。",
    backedAlt1: "创投合作方",
    backedAlt2: "Binance",
    backedAlt3: "BNB Chain",
    roadmapTitle: "路线图",
    roadmapP1Title: "第一阶段：产品与市场的基础能力（进行中）",
    roadmapP1Summary:
      "当前基础为中英文公开聊天，覆盖传统金融、加密货币与预测市场，并完成移动端打磨，明确区分洞见与持牌建议。自动化 X 更新与在税收与 bonding 规则对齐时启用的债券后 AMM 通路，为后续阶段提供稳定的信号与流动性底座。",
    roadmapP2Title: "第二阶段：在 X 上一键发射（UPCOMING）",
    roadmapP2Summary:
      "用户可在 X 上 @ 琪琪并提供名称、代码与配图，进入可审计的引导式发射流程。预检、频控与显式同意会约束任何自动化链上或场地动作，并在与首批伙伴验证安全后再逐步扩大开放。",
    roadmapP3Title: "第三阶段：生态与集成",
    roadmapP3Summary:
      "在合同与政策允许范围内，集成数据、场地与钱包，让回答承接较新的上下文。伙伴可通过 Webhook 与精简 API 接入可选自动化；主办方在保护隐私的前提下获得聚合信号，用于优化提示与节奏而不读取用户原文。",
    roadmapP4Title: "第四阶段：规模、安全与深度",
    roadmapP4Summary:
      "围绕市场相关能力进行威胁建模、事故预案与赏金准备，持续加固。披露与风险提示随区域与受众分层；并规划可选「深度研究」模式，为重度用户提供更长简报而不拖慢默认聊天。",
    footerNavAria: "页脚",
    footerPrivacy: "隐私政策",
    footerTerms: "使用条款",
    footerSupport: "支持",
    footerX: "X",
    footerTelegram: "Telegram",
    privacyTitle: "隐私政策",
    privacyLastUpdated: "最近更新：2026 年 5 月 4 日",
    privacyIntro:
      "Kiki（「我们」）运营本网站及相关体验（例如公开聊天）。本政策说明你在使用服务时可能涉及的信息类型及我们的处理原则。本文并非适用于所有司法管辖区的完整法律文件；若你需要特定地区的说明，请通过「支持」与我们联系。",
    privacyH2Collect: "我们收集的信息",
    privacyPCollect:
      "你在聊天中的输入、在支持表单中填写的内容（姓名、邮箱、主题与正文），以及可能保存在浏览器本地的语言偏好。托管、人工智能接口与分析服务在提供网站与 API 的过程中，也可能处理有限的技术数据（例如 IP、设备或浏览器类型、时间戳等）。",
    privacyH2Use: "我们如何使用信息",
    privacyPUse:
      "我们使用这些信息以生成回复、运营与保护服务、排查故障并了解总体使用情况。我们不出售你的个人信息。在使用第三方模型或基础设施时，相关处理受其条款及我们的配置约束。",
    privacyH2Share: "共享与披露",
    privacyPShare:
      "我们仅在协助运营产品的服务提供商（如云托管与推理服务）、法律要求或为保护权利与安全所必需时共享数据。我们不会在网站上公开发布你的聊天记录。",
    privacyH2Retention: "保留期限",
    privacyPRetention:
      "保留时间取决于日志、服务商默认设置与运营需要。你可从浏览器中清除本地语言偏好。若需删除其他数据，请在正式流程就绪后通过支持渠道提出；当前演示表单不会持久保存提交内容。",
    privacyH2Security: "安全",
    privacyPSecurity:
      "我们采取与产品阶段相称的合理保护措施。任何联网服务都无法保证绝对安全；请勿在聊天中发送你无法承担泄露风险的机密信息。",
    privacyH2Rights: "你的选择",
    privacyPRights:
      "视你所在地区法律而定，你可能享有访问、更正或删除个人数据的权利。请通过「支持」联系我们；我们将在流程完善后依法回应。",
    privacyH2Changes: "政策变更",
    privacyPChanges:
      "我们可能不时更新本页，「最近更新」日期将随之变化。在更新后继续使用服务即表示你接受修订后的政策。",
    termsTitle: "使用条款",
    termsLastUpdated: "最近更新：2026 年 5 月 4 日",
    termsIntro:
      "本条款适用于你对 Kiki 网站及聊天演示的使用。使用服务即表示你同意本条款；若不同意，请勿使用。",
    termsH2Accept: "协议的接受",
    termsPAccept:
      "你声明具备订立本协议的民事行为能力，并将遵守适用法律，包括与金融宣传、制裁等相关的规定。",
    termsH2Service: "服务内容",
    termsPService:
      "Kiki 提供与市场及相关主题有关的对话与信息功能。功能可能不经通知而变更、暂停或终止。服务按「现状」提供，不作任何明示或默示担保。",
    termsH2NotAdvice: "非投资、法律或税务建议",
    termsPNotAdvice:
      "输出由人工智能生成，可能错误、不完整或过时。本站任何内容不构成买卖任何资产的要约、招揽或个性化建议。在决策前请咨询合格专业人士。",
    termsH2Conduct: "可接受的使用",
    termsPConduct:
      "你不得滥用服务、试图破坏或过载服务、违反政策进行抓取，或将其用于违法、骚扰或有害行为。我们可在存在风险或违规时暂停访问。",
    termsH2ThirdParty: "第三方",
    termsPThirdParty:
      "服务可能引用或链接至第三方网站、协议或平台。我们不对其内容、可用性或条款负责。",
    termsH2Disclaimer: "责任限制",
    termsPDisclaimer:
      "在法律允许的最大范围内，Kiki 及其贡献者不对间接或后果性损害、交易损失或依赖人工智能输出承担责任。你唯一的救济是停止使用服务。",
    termsH2Changes: "条款变更",
    termsPChanges:
      "我们可能修改本条款，「最近更新」日期将反映变更。在更新后继续使用即视为接受。",
    supportTitle: "支持",
    supportIntro: "请描述你遇到的问题或需要的帮助。",
    supportNameLabel: "姓名",
    supportEmailLabel: "电子邮箱",
    supportSubjectLabel: "主题",
    supportMessageLabel: "留言",
    supportSubmit: "提交",
    supportThanks: "谢谢。我们已收到你的留言。",
  },
} as const;

export type I18nKey = keyof typeof STRINGS.en;

export function t(lang: Lang, key: I18nKey): string {
  return STRINGS[lang][key];
}
