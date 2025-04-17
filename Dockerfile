# ---- Stage 1: Scraper ----
FROM node:18-slim AS scraper

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install Chromium & fonts
RUN apt-get update && apt-get install -y \
    chromium chromium-common chromium-driver fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN npm install

COPY scrape.js ./

# Run the scraper
ARG SCRAPE_URL
ENV SCRAPE_URL=https://example.com
RUN node scrape.js

# ---- Stage 2: Web server ----
FROM python:3.10-slim AS web

WORKDIR /app

COPY --from=scraper /app/scraped_data.json ./scraped_data.json
COPY server.py requirements.txt ./

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "server.py"]

