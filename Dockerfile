# Imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar las dependencias
RUN npm install

# Crear el build de producción
RUN npm run build

# Instalar el servidor estático para servir la app
RUN npm install -g serve

# Exponer el puerto que se usará en producción
EXPOSE 4173

# Comando para iniciar la aplicación
CMD ["serve", "-s", "dist"]
