# Skilled Acolyte

[![Build Status](https://travis-ci.org/unihackhq/skilled-acolyte-backend.svg?branch=develop)](https://travis-ci.org/unihackhq/skilled-acolyte-backend)

A hackathon management system with the following features:
* payment processing
* authentication
* booking/ticket registration
* ticket transferring
* team management
* push notifications

# Local Development
## Env
You need to setup your env with env variables `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `POSTMARK_CLIENT_KEY`, `EVENTBRITE_TOKEN` and `JWT_KEY`.
Also you need to set `NODE_ENV=dev` for the correct config to be used.

## Database
You need to PostgreSQL db named `skilled_acolyte_db_dev`, and correct connection info in env variables

## Run
```Bash
npm install
npm run dev
```

# Docker Development
```Bash
POSTMARK_CLIENT_KEY=your-key EVENTBRITE_TOKEN=your-token docker-compose -f docker-compose.dev.yml up
```

# Production (Docker)
Edit docker-compose.prod.yml and put in the correct db connection info, tokens/api keys, etc.

```Bash
docker-compose up
```

# License
See the [LICENSE](LICENSE).
