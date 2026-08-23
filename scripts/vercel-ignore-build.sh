#!/usr/bin/env bash
set -euo pipefail

CHANGED_FILES="$(git diff --name-only HEAD^ HEAD)"

if [ -z "$CHANGED_FILES" ]; then
  echo "No changed files detected, proceeding with build."
  exit 1
fi

NON_TEST_FILES="$(echo "$CHANGED_FILES" | grep -vE '(^|/).*\.(test|spec)\.(ts|tsx)$' || true)"

if [ -z "$NON_TEST_FILES" ]; then
  echo "Only test/spec files changed, skipping build."
  exit 0
fi

echo "Non-test files changed, proceeding with build."
exit 1
