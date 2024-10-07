**AGREGANDO UNA NUEVA NOTA**
 
 ```mermaid
  sequenceDiagram  
      Navegador->>Servidor: Crea nueva nota: Metodo POST - File: new_note_spa.json
      Servidor-->>Navegador: Json Response. **No se vuelve a cargar la pagina** !important
```
**Navegador:** solicitud HTTP POST - Se envia solicitud en un archivo JSON (new_nota_spa)

**Servidor:** El servidor responde con JSON. No se vuelve a cargar la pagina, ya que las modificaciones se hacen mediante Javascript



