# LazerMazer

Archived/incomplete HTML5 canvas game.

This repo preserves the original static game assets as-is. It is playable enough to load and inspect, but it is not actively maintained.

## Run Locally

Any static file server works:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Docker

```bash
docker build -t lazermazer .
docker run --rm -p 8080:80 lazermazer
```

## Deploy

This repo is static and can be deployed to any static host, including GitHub Pages, Netlify, Vercel, nginx, Caddy, or the included Docker image.

On `alexli.ca`, Caddy serves `/opt/lazermazer` directly. That means normal deploys are just a `git pull`:

```bash
cd /opt/lazermazer
./deploy/deploy.sh
```

No Docker rebuild or Caddy restart is needed for ordinary HTML, CSS, JS, image, map, font, or audio changes.
