#!/usr/bin/env bash
set -euo pipefail

CHANGED_FILES="$(git diff --name-only HEAD^ HEAD || true)"

if [ -z "$CHANGED_FILES" ]; then
  echo "No changed files detected, proceeding with build."
  exit 1
fi

# Patterns for files that never affect the build output:
# - test/spec files
# - anything under .github/ (workflows, issue/PR templates)
# - .gitignore, .editorconfig
# - root-level markdown docs (README, CONTRIBUTING, CODE_OF_CONDUCT, CHANGELOG)
# - LICENSE
IGNORED_PATTERN='(^|/).*\.(test|spec)\.(ts|tsx)$|^\.github/|^\.gitignore$|^\.editorconfig$|^[^/]+\.md$|^LICENSE$'

RELEVANT_FILES="$(echo "$CHANGED_FILES" | grep -vE "$IGNORED_PATTERN" || true)"

if [ -z "$RELEVANT_FILES" ]; then
  echo "Only ignorable files changed, skipping build."
  exit 0
fi

echo "Build-relevant files changed, proceeding with build."
exit 1
