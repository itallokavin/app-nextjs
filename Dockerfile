# Use a imagem base oficial do Node.js na versão especificada
FROM node:20.11.1-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR .

# Copie o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código do projeto para o diretório de trabalho
COPY . .

# Exponha a porta em que o servidor Next.js irá rodar
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]
