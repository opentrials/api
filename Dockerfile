FROM nodejs:5.6
WORKDIR /service
COPY package.json package.json
RUN npm install --production
COPY api api
# ...
