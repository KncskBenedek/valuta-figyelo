project:
	npm install
	npm run dev

run-frontend:
	cd valuta-figyelo && npm run dev
run-proxy:	
	cd valuta-proxy && node server.js