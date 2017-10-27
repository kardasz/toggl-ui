# About

Toggl UI for fast adding Toggl entries ;-)

Using Bootstrap v3 and PHP Api Client `morningtrain/toggl-api`

# Run

## Docker

- run `docker run --rm -p 8080:80 kardasz/toggl-ui`
- Open http://localhost:8080

## Docker compose

**docker-compose.yml**
```
version: '3'
services:
  app:
    image: kardasz/toggl-ui
    ports:
      - "8080:80"
```
- run `docker-compose up`
- Open http://localhost:8080

# Development

* copy `.env.dist` to `.env` and customize settings for yours needs
* run `make run`
* open http://localhost:8080 (or with customized ip or port)
