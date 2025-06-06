FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 3000

RUN bun install

EXPOSE 3000