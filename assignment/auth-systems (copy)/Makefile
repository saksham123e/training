PYTHON := .venv/bin/python
PIP := .venv/bin/pip
UVICORN := .venv/bin/uvicorn
ALEMBIC := .venv/bin/alembic

.PHONY: install db-up db-down migrate run mail

install:
	python3 -m venv .venv
	$(PIP) install -r requirements.txt

db-up:
	docker compose up -d db

db-down:
	docker compose down

migrate:
	$(ALEMBIC) upgrade head

run:
	$(UVICORN) app.main:app --reload

mail:
	$(PYTHON) scripts/dev_mail_server.py
