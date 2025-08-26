# Makefile
.PHONY: kill-port

# 使い方: make kill-port PORT=8080
kill-port:
	powershell -ExecutionPolicy ByPass -File ./kill-port.ps1 $(PORT)

mock: kill-port
	npm run mock