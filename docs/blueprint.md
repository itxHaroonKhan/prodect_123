# **App Name**: AgentPilot

## Core Features:

- Autonomous Dashboard View: A centralized dashboard to display real-time summaries of pending messages, active tasks, and overall system status, reflecting content from Obsidian's Dashboard.md.
- Policy & Goals Management: An interface for users to easily view and edit the AI's 'Company_Handbook.md' (rules of engagement) and 'Business_Goals.md' to define operational parameters and objectives.
- Monitored Event Display: Visually presents incoming events and actionable items gathered by external 'Watcher' scripts (e.g., new emails or file drops) in the application's '/Needs_Action' queue for review.
- AI-Generated Task Planning Tool: Leveraging Claude Code as the reasoning tool, the system processes new events and autonomously generates detailed 'Plan.md' files within the Obsidian vault for multi-step task execution.
- Human-in-the-Loop Action Approval: A dedicated section to review, approve, or reject AI-proposed actions from the '/Pending_Approval' queue, ensuring human oversight for sensitive operations before external execution.
- Task Progress Tracking: Visualize the lifecycle of tasks as they move through different stages and directories like '/Inbox', '/Needs_Action', and '/Done', reflecting the AI's processing and completion.

## Style Guidelines:

- Primary color: Vibrant 'Agent Blue' (#66B2FF), chosen to represent intelligence, innovation, and trust, providing a clear focal point in the dark interface.
- Background color: Dark 'Core Navy' (#1F272E), creating a professional, focused, and non-distracting environment suitable for intensive data and task management.
- Accent color: Bright 'Alert Aqua' (#4DCCFF), an analogous color that stands out against the primary and background, used to highlight critical alerts, active elements, and calls to action.
- Headline font: 'Space Grotesk' (sans-serif), for a futuristic and tech-inspired look on titles and key headings.
- Body text font: 'Inter' (sans-serif), ensuring excellent readability for task descriptions, reports, and detailed information across the application.
- Code font: 'Source Code Pro' (monospace), for clear and consistent presentation of configuration snippets, scripts, and logs.
- Use modern, minimalist, and vectorized icons with subtle animated states to represent tasks, approval statuses, communication channels (e.g., email, WhatsApp), and system modules. Icons should glow slightly on interaction or status change.
- Adopt a clean, structured, and dashboard-centric layout using a multi-columnar grid. Key areas such as 'Needs Action', 'Pending Approvals', and 'Dashboard Summary' should be clearly demarcated and easily scannable, emphasizing efficiency and logical information flow.
- Incorporate subtle and functional animations, such as smooth transitions for content updates, dynamic hover effects for actionable UI elements, and elegant expansion/collapse effects for detailed task views. These animations should enhance user experience without causing distraction.