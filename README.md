Prueba Técnica – Evaluación de Refactorización de Código tiene 3 archivos, El Original y el refactorizado para ver la diferencias y un de test para hacer las pruebas y ver que los resultados son iguales.



Diseño de Solución Técnica Estructura
proyecto-auth/
├── backend-go/                     # API en Go
│   ├── main.go
│   ├── go.mod
│ 
├── frontend/
│   ├── host-app/                  # App principal Angular
│   └── auth-mfe/                  # MFE del Login
├── devops/
│   ├── azure-pipeline.yml         # CI/CD Azure DevOps
│   └── terraform/                 # Infraestructura en Azure
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
|
└── documentos/
     |__ documento-decisiones.md   # Justificación técnica
     |__ MOdelo de Autenticacion   # Diagrama de Arquictetura
      
