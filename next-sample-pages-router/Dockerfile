FROM node:22-bullseye AS runner

ENV NODE_OPTIONS="--max-old-space-size=4096"

ARG WATCH=false
ENV WATCH=${WATCH}

ARG PORT
ENV PORT=${PORT}

ARG NEXT_PUBLIC_METABASE_INSTANCE_URL
ENV NEXT_PUBLIC_METABASE_INSTANCE_URL=${NEXT_PUBLIC_METABASE_INSTANCE_URL}

ARG METABASE_INSTANCE_URL
ENV METABASE_INSTANCE_URL=${METABASE_INSTANCE_URL}

ARG METABASE_JWT_SHARED_SECRET
ENV METABASE_JWT_SHARED_SECRET=${METABASE_JWT_SHARED_SECRET}

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

RUN if [ "$WATCH" != "true" ]; then \
      echo "WATCH env is not set; running production yarn build..."; \
      npx next build; \
    else \
      echo "WATCH env is set; running in development mode..."; \
    fi

ENTRYPOINT ["/app/next-sample-pages-router/entrypoint.sh"]