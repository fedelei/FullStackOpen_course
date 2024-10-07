 ```mermaid
  sequenceDiagram
      Navegador->>Servidor: Metodo HTTP POST
      Servidor-->>Navegador: Metodo HTTP 302 FOUND- Location: /notes
      Navegador->>Servidor: HTTP GET (main.css, main.js, data.json)
      Servidor-->>Navegador: Respuesta Status 200 OK.
```
**Navegador:** solicitud HTTP POST a la dirección del servidor new_note.


**Servidor:** Responde con Satus Code 302 Found. Este estado realiza una redireccion de URL, a la direccion definida en Location (/notes). Esto provoca que el Navegador vuelva a cargar la pagina.


**Navegador:** La recarga genera 3 solicitudes mediante el metodo HTTP GET para obtener la hoja de estilo (main.css), el codigo de JS (main.js), y los datos en formato Json (datos.json)


**Servidor:** Finalmente el Servidor devuelve las peticiones al Navegador.

