# Factura Electrónica

## Features

1. Login using Google, Facebook, custom.
2. Add RFC.
3. Crear factura.
4. Modificar factura.
5. Consultar facturas.

## Iniciar frontend

```$bash
cd $FACTURA_ELECTRONICA/src/frontend/src
yarn install
REACT_APP_BACKEND_URL=http://localhost:3001 REACT_APP_GOOGLE_OAUTH_TOKEN=3434 REACT_APP_DISABLE_AUTH=true yarn start
```