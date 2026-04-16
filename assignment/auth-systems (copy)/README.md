# Form AI Auth

Full-stack authentication app built with FastAPI, PostgreSQL, SQLAlchemy, JWT, and a static Tailwind frontend.

## Run locally

1. Install dependencies:

```bash
make install
```

2. Start PostgreSQL:

```bash
make db-up
```

3. Apply migrations:

```bash
make migrate
```

4. Run the app:

```bash
make run
```

The app will be available at `http://127.0.0.1:8000`.

## Direct commands

If you do not want to use `make`, you can run:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
docker compose up -d db
.venv/bin/alembic upgrade head
.venv/bin/uvicorn app.main:app --reload
```

## Default local credentials

- PostgreSQL database: `form_ai_auth`
- PostgreSQL user: `postgres`
- PostgreSQL password: `postgres`

These values match the default `.env` and `docker-compose.yml`.

## Frontend pages

- `/signup`
- `/login`
- `/dashboard`
- `/extra`

## Notes

- `POST /auth/forgot-password` prints the reset link to the backend console.
- The frontend stores the JWT in `localStorage` and sends it as a bearer token.
