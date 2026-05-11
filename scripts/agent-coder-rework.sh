#!/bin/sh
set -eu
# Заглушка: не меняет код осмысленно — runner пометит прогон как FAILED на этапе git (нет изменений),
# если не трогать файлы. Для «зелёного» прогона добавьте правку файла, например:
printf '%s\n' "# agent coder rework touched $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> .agent-coder-rework-run.log
echo "agent-coder-rework.sh ok"