.PHONY: run_all project run-frontend run-proxy

run_all: project run-frontend run-proxy

run-frontend:
	@echo "Starting frontend..."
	cd valuta-figyelo && npm run dev &

run-proxy:
	@echo "Starting proxy..."
	cd valuta-proxy && node server.js &
project:
	@echo "frontend npm..."
	cd valuta-figyelo && npm install
	@echo "proxy npm..."
	cd valuta-proxy && npm install