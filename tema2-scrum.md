# Tema 2: Scrum y Metodologías Ágiles

## 1. Introducción a las Metodologías Ágiles y Scrum

### 1.1. ¿Qué es la Metodología Ágil?
La metodología ágil es una filosofía de gestión de proyectos diseñada para responder a la alta volatilidad de los requisitos actuales del mercado y la tecnología. Se basa en entregas iterativas, incrementales y frecuentes de software funcionando, en lugar de intentar predecir todo el proyecto desde el inicio.

### 1.2. El Manifiesto Ágil (2001)
Fundamentado en 4 valores centrales y 12 principios:
1. **Individuos e interacciones** sobre procesos y herramientas.
2. **Software funcionando** sobre documentación extensiva.
3. **Colaboración con el cliente** sobre negociación de contratos.
4. **Respuesta ante el cambio** sobre seguir un plan.

### 1.3. ¿Qué es Scrum?
Scrum es el marco de trabajo (*framework*) ágil más utilizado a nivel mundial para el desarrollo de productos complejos. Fue desarrollado por Jeff Sutherland y Ken Schwaber a principios de los noventa. Scrum se basa en el **empirismo** (el conocimiento proviene de la experiencia y las decisiones se toman en función de lo observado) y en el **pensamiento Lean** (reducción del desperdicio enfocado en lo esencial).

### 1.4. Los Tres Pilares de Scrum
1. **Transparencia:** Todos los aspectos del proceso deben ser visibles para los responsables del resultado.
2. **Inspección:** Los usuarios de Scrum deben inspeccionar frecuentemente los artefactos y el progreso hacia la meta para detectar desviaciones.
3. **Adaptación:** Si se detecta que un proceso se desvía, se debe ajustar lo antes posible para minimizar futuras desviaciones.

---

## 2. La Regla 3:5:3 de Scrum
Scrum se compone estructuralmente de:
- **3 Roles**
- **5 Eventos (Ceremonias)**
- **3 Artefactos**

---

## 3. Los Roles en Scrum

### 3.1. Product Owner (Propietario del Producto)
Es el representante de los clientes, del negocio y del mercado ante el equipo.
- **Responsabilidades:**
  - Definir la visión del producto y los criterios de aceptación de las historias de usuario.
  - Crear, gestionar y priorizar dinámicamente el **Product Backlog** para maximizar el valor entregado.
  - Definir el **Mínimo Producto Viable (MVP)**.
  - Aclarar dudas sobre los requisitos en las reuniones de planificación y refinamiento.
- **Regla fundamental:** Debe existir **un único Product Owner** por equipo para evitar directrices cruzadas o contradictorias.

### 3.2. Scrum Master
Es el especialista y facilitador del marco Scrum dentro de la organización (rol de *coach* o líder servidor).
- **Responsabilidades:**
  - Asegurar que el equipo comprenda y aplique correctamente los principios, ceremonias y reglas de Scrum.
  - Eliminar los impedimentos u obstáculos que bloquean la productividad del equipo.
  - Facilitar los eventos de Scrum y proteger al equipo de interferencias externas durante el Sprint.

### 3.3. Equipo de Desarrollo (Development Team)
Conjunto de profesionales encargados de entregar un incremento de producto potencialmente desplegable al final de cada Sprint.
- **Características:**
  - **Autoorganizado y multidisciplinar:** Determina *cómo* realizar las tareas sin órdenes jerárquicas externas.
  - **Tamaño ideal:** Entre 5 y 9 miembros (a menudo regido por la regla de las "dos pizzas").
  - **Responsabilidad compartida:** No existen subtítulos o jerarquías dentro del equipo; la responsabilidad de la entrega es del grupo completo.

---

## 4. Los Eventos o Ceremonias de Scrum

### 4.1. El Sprint
Bloque temporal fijo (*time-box*) de entre 1 y 4 semanas (siendo 2 semanas la duración estándar) en el que el equipo crea un incremento del producto completado.
- La duración debe mantenerse constante a lo largo del proyecto para permitir estimaciones precisas de la velocidad.

### 4.2. Planificación del Sprint (Sprint Planning)
Reunión al inicio del Sprint dirigida por el Scrum Master con la participación del PO y el equipo.
- **Objetivo:** Definir el **Sprint Goal** (meta del Sprint) y seleccionar los elementos del Product Backlog que el equipo se compromete a realizar, creando el **Sprint Backlog**.
- **Estimación:** El equipo estima las historias de usuario mediante *puntos de historia* basándose en su velocidad histórica.
- **Duración máxima recomendada:** 4 horas para un Sprint de 2 semanas.

### 4.3. Scrum Diario (Daily Scrum / Stand-up)
Reunión breve de sincronización diaria de máximo **15 minutos** que se realiza de pie.
- Cada miembro del equipo responde a tres preguntas orientadas al objetivo del Sprint:
  1. ¿Qué hice ayer que ayudó al equipo a lograr la meta del Sprint?
  2. ¿Qué voy a hacer hoy para ayudar al equipo a lograr la meta del Sprint?
  3. ¿Qué impedimentos o bloqueos tengo o detecto?

### 4.4. Refinamiento del Backlog (Backlog Refinement / Grooming)
Reunión intermedia realizada a mitad del Sprint (~2 horas para Sprints de 15 días) para revisar, subdividir e independizar historias de usuario de cara a futuros Sprints, garantizando que el Product Backlog esté preparado.

### 4.5. Revisión del Sprint (Sprint Review)
Reunión informal al final del Sprint donde el equipo de desarrollo demuestra el incremento funcional finalizado al Product Owner y a los *stakeholders* (partes interesadas) para recibir retroalimentación directiva.
- **Duración máxima recomendada:** 1 a 2 horas para un Sprint de 2 semanas.

### 4.6. Retrospectiva del Sprint (Sprint Retrospective)
Espacio interno donde el equipo analiza cómo ha sido su forma de trabajar durante el Sprint (personas, relaciones, herramientas, procesos).
- **Objetivo:** Identificar qué funcionó bien, qué falló y acordar un plan de acción con mejoras concretas a implementar en el siguiente Sprint.
- **Duración máxima recomendada:** 2 horas para un Sprint de 2 semanas.

---

## 5. Los Artefactos de Scrum

### 5.1. Product Backlog (Lista de Objetivos del Producto)
Lista dinámica y priorizada de todos los requisitos, funcionalidades, mejoras y correcciones necesarias en el producto. Es gestionada exclusivamente por el Product Owner.

### 5.2. Sprint Backlog (Lista de Tareas del Sprint)
Conjunto de historias de usuario seleccionadas del Product Backlog para el Sprint actual, junto con el plan detallado de tareas para entregarlas y cumplir la meta del Sprint.

### 5.3. Incremento y Definición de "Hecho" (Definition of Done - DoD)
- **Incremento:** Es la suma de todos los elementos del Product Backlog completados durante el Sprint más el valor de los incrementos de Sprints anteriores.
- **Definición de "Hecho" (DoD):** Criterio compartido por el equipo sobre los estándares de calidad que debe cumplir un requisito para ser considerado totalmente finalizado y desplegable.

---

## 6. Métricas y Valores de Scrum

### 6.1. Herramientas de Seguimiento
- **Burndown Chart:** Gráfico que muestra la cantidad de trabajo pendiente (puntos de historia) en función del tiempo restante del Sprint.
- **Velocidad del Equipo:** Cantidad media de puntos de historia completados con éxito por el equipo por cada Sprint.

### 6.2. Los 5 Valores de Scrum
1. **Compromiso:** Con los objetivos del equipo y las metas del Sprint.
2. **Valor (Coraje):** Para hacer lo correcto, afrontar problemas complejos y probar nuevos enfoques.
3. **Foco (Focus):** Concentración en el trabajo planificado para el Sprint actual.
4. **Honestidad (Transparencia):** Sinceridad sobre el progreso, los obstáculos y los fallos.
5. **Respeto:** Reconocimiento de la capacidad profesional de cada miembro del equipo.
