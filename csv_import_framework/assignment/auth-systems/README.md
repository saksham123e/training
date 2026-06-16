# Form AI Auth

Full-stack authentication app built with FastAPI, PostgreSQL, SQLAlchemy, JWT, and a static Tailwind frontend.

## Run locally

1. Install dependencies:

```bash
make install
```

2. Run the app:

```bash
make run
```

The default local setup uses SQLite, so it works without Docker.

## Optional PostgreSQL setup

If you want to use PostgreSQL instead of SQLite:

```bash
cp .env.example .env
# then change DATABASE_URL in .env to:
# postgresql+psycopg2://postgres:postgres@127.0.0.1:5432/form_ai_auth
make db-up
make migrate
```

Then run the app:

```bash
make run
```

The app will be available at `http://127.0.0.1:8000`.

## Direct commands

If you do not want to use `make`, you can run:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python -m uvicorn app.main:app --reload
```

## Optional PostgreSQL credentials

- PostgreSQL database: `form_ai_auth`
- PostgreSQL user: `postgres`
- PostgreSQL password: `postgres`

## Frontend pages

- `/signup`
- `/login`
- `/dashboard`
- `/extra`

## Notes

- `POST /auth/forgot-password` prints the reset link to the backend console.
- The frontend stores the JWT in `localStorage` and sends it as a bearer token.
