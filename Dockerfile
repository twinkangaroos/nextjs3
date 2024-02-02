#https://gallery.ecr.aws/docker/library/node
FROM public.ecr.aws/docker/library/node:20.11.0

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run build
EXPOSE 80
CMD ["npm", "start", "-p", "80"]
