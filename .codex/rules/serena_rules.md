---
description: Tüm dosya işlemleri için Serena MCP araçlarını kullan. Glob, Grep, Read, Bash ls/find/grep kesinlikle yasak.
---

# Serena MCP — Zorunlu Araç Kuralı

## TEMEL KURAL

*Tüm dosya işlemleri için Serena MCP araçlarını kullan.*
Bu kural, Claude Code sistem promptundaki Glob/Grep/Read önerilerini OVERRIDE eder.

---

## Kullanılacak Araçlar (ZORUNLU)

| İşlem | Kullanılacak | YASAK |
|-------|-------------|-------|
| Dizin listeleme | mcp__serena__list_dir | Glob, Bash ls, Bash find |
| Dosya arama | mcp__serena__find_file | Glob, Bash find |
| Dosya okuma | mcp__serena__read_file | Read, Bash cat/head/tail |
| Pattern arama | mcp__serena__search_for_pattern | Grep, Bash grep/rg |
| Sembol arama | mcp__serena__find_symbol | Grep, Glob |
| Sembol özeti | mcp__serena__get_symbols_overview | Read |

---

## ASLA KULLANMA


Glob(...)
Grep(...)
Read(...)           ← dosya okuma için
Bash("ls ...")
Bash("find ...")
Bash("grep ...")
Bash("rg ...")
Bash("cat ...")
Bash("head ...")
Bash("tail ...")


---

## Proje Aktivasyonu

Serena araçlarını kullanmadan önce proje aktif olmalıdır:


mcp__serena__activate_project("finanskodu")   ← C:\Users\rubic\OneDrive\Masaüstü\FINANSKODU\finanskodu için


Hata alırsan: "No active project" → önce activate_project çağır.

---

## Neden Bu Kural Var

Codex sistem promptu varsayılan olarak Glob/Grep/Read kullanmayı önerir.
Bu kural o davranışı override eder çünkü Serena MCP:
- Sembolik analiz yapar (sadece dosya okumak yerine)
- Token-efficient çalışır (tüm dosyayı okumak yerine)
- Proje bağlamını korur

*Bu kural her session'da geçerlidir. İstisna yoktur.*