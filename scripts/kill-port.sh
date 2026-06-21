#!/bin/sh
# Usage: ./scripts/kill-port.sh 3000 8080 9099
# Kills all LISTENING processes on the specified ports.

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <port> [port ...]"
  exit 1
fi

for port in "$@"; do
  pids=$(netstat -ano 2>/dev/null | grep ":${port} " | grep LISTENING | awk '{print $NF}' | sort -u)
  for pid in $pids; do
    if echo "$pid" | grep -qE '^[0-9]+$'; then
      echo "Killing PID $pid on port $port..."
      taskkill //PID "$pid" //F 2>/dev/null || true
    fi
  done
done
echo "Done."
