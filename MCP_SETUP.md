# MCP Setup

This project is configured to use three MCP servers by default:

- `context7`
- `sequential-thinking`
- `serena`

## Project files

- `.vscode/mcp.json` configures the same servers for editors and MCP-aware tooling.
- `AGENTS.md` tells agent clients when to prefer each server.

## Codex global config

Codex itself reads MCP server registrations from `~/.codex/config.toml`, not from the repository. To keep these servers available every time you open this project, the user-level Codex config also needs matching entries.

Expected registrations:

- `context7`: streamable HTTP at `https://mcp.context7.com/mcp`
- `sequential-thinking`: `cmd /c npx -y @modelcontextprotocol/server-sequential-thinking`
- `serena`: `C:\Users\rubic\AppData\Roaming\Python\Python311\Scripts\uvx.exe --from git+https://github.com/oraios/serena serena start-mcp-server`

## Serena runtime

`serena` requires `uvx` on the machine. This repository uses the absolute `uvx.exe` path so it still works even if the Python user scripts directory is not on `PATH`.
