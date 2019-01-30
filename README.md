# reactjsConsumeREST
## Configuración del Proyecto

### Configuración de los Métodos en AWS para habilitar CORS

1. Ingresar al menú de la consola de awx
2. Seleccionar API GATEWAY
3. Ir a la pesataña de recursos
    1. Seleccionar el método para asignar las cabeceras necesarias
    2. En el panel derecho escoger el cuadro de ***Respuesta de Método***
        1. Expandir la opción *200* de ***Estado HTTP***
            1. Click en ***Agregar encabezado***
                1. Agregar uno por vez los siguientes encabezados:
                    * `X-Requested-With`
                    * `Access-Control-Allow-Headers`
                    * `Access-Control-Allow-Origin`
                    * `Access-Control-Allow-Methods`
    3. En el panel derecho escoger el cuadro de ***