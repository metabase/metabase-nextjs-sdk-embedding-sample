FROM node:22-bullseye AS runner

WORKDIR /app

COPY ./next-sample-pages-router ./next-sample-pages-router
COPY ./local-dist ./local-dist

WORKDIR /app/next-sample-pages-router

RUN npm ci

RUN if [ -d "../local-dist/embedding-sdk" ]; then \
      echo "Local embedding-sdk dist is found in ../local-dist/embedding-sdk, installing it..."; \
      npm install file:../local-dist/embedding-sdk --install-links; \
    else \
      echo "Local embedding-sdk dist is not found in ../local-dist/embedding-sdk, skipping copy"; \
    fi

CMD ["npx", "next", "dev"]
