# reactjsConsumeREST

## API GETWAY Configuration

### API Methods configuration to enabled CORS Headers

1. Go to console menu from AWS
2. Click on  API GATEWAY Link
3. Select reourses tab in the left panel
    1. Select a method to assigne the headers access

    ![Alt paso1](imgs/reactjsConsumeREST_2.png)
    2. In the right opened panel, choose ***Respuesta de Método***
    ![Alt paso2](imgs/reactjsConsumeREST_3.png)
    * Expand the *200* option from the ***Estado HTTP***
        * Click on ***Agregar encabezado***
            ![Alt paso2](imgs/reactjsConsumeREST_4.png)
            * You need to add the next headers now.:
                * `X-Requested-With`
                * `Access-Control-Allow-Headers`
                * `Access-Control-Allow-Origin`
                * `Access-Control-Allow-Methods`

    ![Alt paso2](imgs/reactjsConsumeREST_5.png)
    3. In the right panel, choose ***Respuestas de Integración***
        ![Alt paso2](imgs/reactjsConsumeREST_6.png)

    * Expand the *row with status 200*
        * Expand ***Mapeos de encabezado***
        ![Alt paso2](imgs/reactjsConsumeREST_7.png)

        * Add the mapping value (***Valor de mapeo***) to all options like that and save changes:

        Encabezado de Respuesta       |    Valor de mapeo
        --------------------------    |---------------------------
        X-Requested-With              | '*'
        Access-Control-Allow-Headers  | 'Content-Type,x-requested-with,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods'
        Access-Control-Allow-Origin   | '*'
        Access-Control-Allow-Methods  | 'POST, GET, OPTIONS'

    ![Alt paso2](imgs/reactjsConsumeREST_8.png)
    4. Finally, Deploy again the API
    ![Alt paso2](imgs/reactjsConsumeREST_9.png)