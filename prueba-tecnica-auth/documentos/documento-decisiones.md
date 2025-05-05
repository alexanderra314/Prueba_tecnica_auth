# Documento de Decisiones Técnicas

## Microfrontend Angular
Se utilizó **Module Federation** para integrar `auth-mfe` como módulo independiente en la app host `host-app`.

## Backend
La API fue desarrollada en **Go**, utilizando `mux` para enrutamiento y JWT para autenticación. Se desacopló en handlers y middleware.

## Infraestructura en Azure
Se eligió **Azure App Service** por su facilidad para desplegar contenedores Docker y escalabilidad básica sin complejidad adicional.

## CI/CD
Se utiliza **Azure DevOps Pipelines**:
- Compila el backend.
- Construye imagen Docker.
- Despliega a Azure App Service.
- Terraform se encarga de provisión de recursos.

## Seguridad
- Se usaron tokens JWT con expiración.
- Se expone solo el puerto necesario.
