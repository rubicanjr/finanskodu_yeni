# MCP Defaults

This repository expects these MCP servers to be available in compatible agent clients:

- `context7` for library and framework documentation lookup
- `sequential-thinking` for multi-step decomposition on ambiguous tasks
- `serena` for semantic code navigation and symbol-aware refactors

When a task benefits from external docs, structured reasoning, or semantic code search, prefer this order:

1. Use `serena` to inspect the local codebase.
2. Use `context7` to verify external library usage and API details.
3. Use `sequential-thinking` to break down unclear implementation or debugging paths.

If one server is unavailable, continue with the others and fall back to normal shell/code inspection.
