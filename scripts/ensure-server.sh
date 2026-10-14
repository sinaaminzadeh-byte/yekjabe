#!/usr/bin/env bash
# Sandbox helper: restart the dev server if port 3000 is dead (17-b pattern).
code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:3000/api/stories 2>/dev/null)
if [ "$code" != "200" ]; then
  setsid nohup bun run dev > /dev/null 2>&1 < /dev/null &
  for i in $(seq 1 30); do
    sleep 2
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 4 http://localhost:3000/api/stories 2>/dev/null)
    [ "$code" = "200" ] && break
  done
fi
echo "server:$code"
