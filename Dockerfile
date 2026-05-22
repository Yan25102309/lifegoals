# Paso 1: Base de Node para servir (o puedes usar Nginx directo si compila el workflow)
FROM nginx:alpine

# Copiar el build de Angular generado por el workflow al directorio de Nginx
# NOTA: Asegúrate de revisar el nombre exacto de la subcarpeta dentro de dist/ despues del build
COPY /dist/lifegoals/browser /usr/share/nginx/html

# Copiar configuración personalizada si manejas rutas de Angular (opcional)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
