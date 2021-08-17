FROM node:12-alpine

# hadolint ignore=DL3018
RUN apk --no-cache add bash curl less tini vim make
SHELL ["/bin/bash", "-o", "pipefail", "-o", "errexit", "-u", "-c"]

WORKDIR /usr/local/src/app

# Allow yarn/npm to create ./node_modules
RUN chown node:node .

# Copy specific things so that we can keep the image as small as possible
# without relying on each repo to include a .dockerignore file.
COPY --chown=node:node ./ ./

USER node

# Install ALL dependencies. We need devDependencies for the build command.
# removed --frozen-lockfile from yarn install
RUN yarn install --production=false --ignore-scripts --non-interactive --no-cache

ENV BUILD_ENV=production NODE_ENV=production

# hadolint ignore=SC2046

# Install only prod dependencies now that we've built, to make the image smaller
# removed --frozen-lockfile from yarn install
RUN rm -rf node_modules/*
RUN yarn install --production=true --ignore-scripts --non-interactive

# If any Node flags are needed, they can be set in the NODE_OPTIONS env variable.
CMD ["tini", "--", "yarn", "start"]
LABEL com.demandcluster.name="moc-rest-graphql"