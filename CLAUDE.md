# Poll App — CLAUDE.md

## Descripción general

Angular 19+ app de encuestas (Poll App) construida como proyecto de academia. Permite crear, listar y votar en encuestas. Todo el estado vive en señales de Angular (no hay backend activo — sin Supabase).

## Estructura del proyecto

```
src/app/
  app.config.ts          — providers: Router
  app.routes.ts          — rutas: / | /create | /survey/:id
  layout/
    header/              — header global (no usado en todas las vistas)
  shared/
    interfaces/
      survey.ts          — tipos: Survey, SurveyQuestion, ResultOption, NewSurveyData, NewQuestion
    services/
      surveys.ts         — servicio singleton con signals: urgentSurveys, surveys, pastSurveys
                           métodos: getSurveyById(), vote(), createSurvey()
    components/
      home/              — pantalla principal (tabs Active/Past + urgentes)
      survey-detail/     — detalle + votación + resultados en vivo
      survey-results/    — panel lateral con barras de porcentaje (reactivo)
      create-survey/     — formulario dinámico para crear encuesta
      survey-card/       — componente tarjeta (definido, disponible para reutilizar)
```

## Lógica clave

### Estado global (surveys.ts)
- `urgentSurveys` — signal con encuestas que terminan pronto (isUrgent: true)
- `surveys` — signal con encuestas activas normales
- `pastSurveys` — signal con encuestas terminadas (status: 'past')
- `vote(surveyId, Map<questionId, label[]>)` — actualiza conteos de votos; los porcentajes se recalculan automáticamente en el componente de resultados
- `createSurvey(NewSurveyData): number` — añade encuesta nueva a `surveys`, devuelve el ID

### Votación (survey-detail)
- `survey = computed(...)` — referencia reactiva; se actualiza sola tras `vote()`
- `selectedOptions = signal<Map<number, string[]>>` — selecciones del usuario por pregunta
- `hasVoted = signal(false)` — bloquea el formulario y deshabilita el botón tras votar
- Al clickar "Complete survey" → `vote()` en el servicio → los resultados del panel derecho se actualizan en tiempo real

### Resultados en vivo (survey-results)
- `getPercentage(value, question)` — calcula `round(value/total * 100)` para mostrar porcentajes correctos incluso después de votar

### Formulario de creación (create-survey)
- Completamente dinámico con signals
- `isValid = computed(...)` — título obligatorio + cada pregunta con título y mínimo 2 respuestas
- `addQuestion()`, `removeQuestion(i)`, `addAnswer(qi)`, `removeAnswer(qi,ai)` — gestión del array
- Tras publicar → navega a `/survey/:newId`

### Tabs en Home
- `activeTab = signal<'active' | 'past'>('active')`
- Tab "Past survey" muestra `pastSurveys()` sin enlace (encuestas no clickeables)

## Convenciones del proyecto (según PDFs)
- **TypeScript**: camelCase funciones, PascalCase clases/interfaces, UPPER_CASE constantes, max 14 líneas por función, sin `any`, con tipos explícitos
- **HTML**: tags semánticos (`main`, `section`, `article`, `aside`, `fieldset`), sin div-soup, `aria-*` en controles interactivos, `alt` en imágenes

## Comandos útiles

```bash
cd pollApp
npm start          # dev server en http://localhost:4200
npm run build      # build de producción
```

## Checklist de User Stories (Poll-App Checkliste.pdf)
- [x] US1: Encuestas urgentes ("Ending soon") sobre la lista general, ordenadas por fecha
- [x] US2: Homescreen con lista, tabs Active/Past, título + descripción + deadline por encuesta
- [x] US3: Botón "New Survey", formulario con campos obligatorios/opcionales y validación
- [x] US4: Detalle de encuesta con preguntas, opciones, estado y resultados actuales
- [x] US5: Votación por click, resultados en tiempo real a la derecha (Desktop layout)
