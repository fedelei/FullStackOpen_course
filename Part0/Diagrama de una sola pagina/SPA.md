**ARQUITECTURA BASICA DE UN SPA**
 
 ```mermaid
  sequenceDiagram  
      Navegador->>Servidor: Metodo HTTP GET Initial Request
      Servidor-->>Navegador: HTML Response 
      Navegador->>Servidor: AJAX
      Servidor-->>Navegador: Json Response.
```
**Navegador:** solicitud HTTP GET a https://studies.cs.helsinki.fi/exampleapp/spa

**Servidor:** Responde solo una página HTML, main.css, spa.js, data.json. Si el navegador realiza otra peticion al Servidor, cuando recibe la respuesta no se vuelve a cargar la pagina.
