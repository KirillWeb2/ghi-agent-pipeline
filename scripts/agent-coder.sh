#!/bin/sh
set -eu
# Заглушка: не меняет код осмысленно — runner пометит прогон как FAILED на этапе git (нет изменений),
# если не трогать файлы. Для «зелёного» прогона добавьте правку файла, например:
printf '%s\n' "# agent coder touched $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> .agent-coder-run.log
echo "agent-coder.sh ok"