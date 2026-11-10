# Tema 1: Entornos de Desarrollo

## 1. Conceptos Básicos
### 1.1. Sistema Informático
Un **sistema informático** es el conjunto de recursos disponibles para la resolución de problemas mediante el uso de las ciencias de la computación. Está compuesto por:
- **Los equipos informáticos:** Ordenadores y dispositivos periféricos.
- **El software:** Programas y aplicaciones que se ejecutan en dichos equipos.
- **Los usuarios y administradores:** Personas que interactúan con el sistema.
- **Las relaciones entre todos estos elementos:** Normas, protocolos y conexiones que permiten la interacción.

### 1.2. Software y Programa
- **Software:** Es la suma total de los programas de ordenador, procedimientos, reglas, documentación asociada y los datos que pertenecen a un sistema de cómputo.
- **Programa:** Es una serie de órdenes que se llevan a cabo secuencialmente sobre un conjunto de datos para resolver un problema determinado.
- **Código Fuente:** Conjunto de instrucciones escritas por el programador en un lenguaje de programación específico.

---

## 2. Tipos de Software y Clasificaciones

### 2.1. Según la Tarea que Realiza
1. **Software de Sistema:** Permite que el sistema funcione e interactúe con el hardware (ej. Sistemas Operativos, controladores de dispositivos/drivers).
2. **Software de Programación:** Proporciona herramientas para desarrollar nuevos programas informáticos (ej. Entornos de Desarrollo Integrados - IDEs, compiladores, intérpretes).
3. **Software de Aplicaciones:** Conjunto de programas con una finalidad concreta para el usuario final (ej. procesadores de texto, navegadores, hojas de cálculo).

### 2.2. Según el Método de Distribución
- **Shareware:** Software distribuido con limitaciones (período de prueba o funcionalidades recortadas).
- **Freeware:** Software gratuito de libre distribución, aunque no suele permitir ver ni modificar su código fuente.
- **Adware:** Software de distribución gratuita que incluye publicidad (la publicidad se elimina en la versión de pago).
- **Software Multimedia:** Aplicaciones diseñadas para reproducir o crear contenidos interactivos (audio, vídeo, gráficos).
- **Software de Uso Específico:** Desarrollado para tareas concretas requeridas por una organización o experto informático.

### 2.3. Según los Tipos de Licencia
- **Software Libre (Free Software):** El autor cede las libertades de usar, estudiar, modificar y redistribuir el software (ej. bajo licencia GPL como el SO Ubuntu).
- **Código Abierto (Open Source):** El código fuente se puede distribuir, copiar y modificar, pero se requiere notificar al autor original de los cambios.
- **De Dominio Público:** Carece de derechos de autor (copyright) y de licencia.
- **Software Propietario:** Software que no cumple los criterios de software libre; sus derechos están reservados.
- **Software Comercial:** Desarrollado con el fin explícito de obtener beneficio económico (lucro).

---

## 3. Relación Hardware-Software y Arquitectura Von Neumann
El **hardware** forma la parte física del ordenador, mientras que el **software** constituye la parte lógica. Su relación es **inseparable**: el software requiere del hardware para ejecutarse, y el hardware necesita del software para realizar tareas útiles.

### Arquitectura de Von Neumann
Describe la estructura física interna de un computador clásico:
1. **Memoria Principal (RAM):** Almacena temporalmente el código binario de los archivos ejecutables y los datos necesarios durante la ejecución.
2. **Procesador (CPU):** Lee y ejecuta las instrucciones almacenadas en la RAM. Incluye:
   - **Unidad de Control (UC):** Coordina las operaciones del sistema.
   - **Unidad Aritmético-Lógica (ALU):** Realiza operaciones matemáticas y lógicas.
3. **Dispositivos de Entrada/Salida (E/S):** Recogen nuevos datos del exterior o muestran los resultados generados (disco duro, teclado, pantalla).

---

## 4. Ciclo de Vida del Software

El **ciclo de vida del software** abarca todo el proceso desde que se concibe una idea hasta que el programa se encuentra funcionando en producción o se retira.

### Fases Principales
1. **Análisis:** Primera etapa y la más crítica. Los errores aquí cometidos son los que tienen mayor impacto y coste. Se analizan los requisitos mediante DFD (Diagramas de Flujo de Datos), casos de uso y diagramas de transición.
   - *Documentos generados:* Documento de Especificación de Requisitos Software (ERS) (funcionales y no funcionales) y Documento de diseño de arquitectura.
2. **Diseño:** Se define la estructura del sistema y cómo se va a implementar (base de datos, algoritmos, interfaz, lenguaje de programación, IDEs).
   - *Documentos generados:* Documento de diseño del software y Plan de pruebas.
3. **Codificación:** Escritura del código fuente en el entorno de desarrollo utilizando los lenguajes de programación seleccionados.
4. **Pruebas:** Se somete a la aplicación a conjuntos de datos de prueba (datos límite) para garantizar que cumple las especificaciones.
   - **Pruebas Unitarias:** Verifican cada módulo de forma individual (ej. JUnit en Java). Generan el *documento de procedimiento de pruebas*.
   - **Pruebas de Integración:** Verifican el correcto funcionamiento entre módulos interconectados. Generan el *documento de procedimiento de pruebas de integración*.
5. **Explotación:** Instalación de la aplicación en preproducción para validación final y posterior despliegue en producción.
   - *Documento generado:* Reporte de errores.
6. **Mantenimiento:** Solución de fallos o incorporación de mejoras una vez desplegado.
   - **Correctivo:** Corrección de errores detectados.
   - **Perfectivo:** Mejora de la funcionalidad existente.
   - **Evolutivo:** Adición de nuevas funcionalidades.
   - **Adaptativo:** Adaptación a nuevos entornos de hardware o software.
7. **Documentación:** Proceso transversal continuo presente durante todo el ciclo de vida.
   - **Guía Técnica:** Dirigida a analistas y programadores (arquitectura, código, pruebas).
   - **Guía de Uso:** Dirigida a usuarios finales (funcionalidades, manual de usuario).
   - **Guía de Instalación:** Dirigida al personal responsable de la puesta en marcha.

---

## 5. Modelos de Desarrollo de Software

### 5.1. Modelos Clásicos (Predictivos)
1. **Modelo en Cascada:** Fases secuenciales estrictas sin vuelta atrás. Si hay errores iniciales no se corrigen hasta el mantenimiento. Muy rígido; solo recomendable en desarrollos pequeños o muy estables.
2. **Modelo en Cascada con Retroalimentación:** Permite volver a la fase anterior si se detectan problemas. Es uno de los más extendidos cuando los requisitos están claros.
3. **Modelo en V:** Variante de la cascada con estructura jerarquizada donde cada fase de desarrollo tiene asociada una fase de validación/prueba correspondiente.

### 5.2. Modelos Evolutivos o Incrementales
1. **Modelo en Espiral (Iterativo):** Cíclico en cuatro cuadrantes (Planificación, Análisis de riesgos, Ingeniería, Construcción/Evaluación del cliente). Permite adaptarse a cambios pero corre el riesgo de alargarse en tiempo y coste.
2. **Metodologías Ágiles:** Basadas en el Manifiesto Ágil (2001). Priorizan el desarrollo iterativo, entregas rápidas y respuesta al cambio.
   - **Kanban:** Sistema visual de tarjetas (desarrollado por Toyota) enfocado en limitar el trabajo en curso (WIP) y maximizar el flujo.
   - **Scrum:** Desarrollo incremental en iteraciones (sprints) de 2 a 4 semanas.
   - **XP (Programación Extrema):** Enfoque en relaciones interpersonales, programación en parejas, integración continua y diseño sencillo.

### 5.3. Modelo de Construcción de Prototipos
Indicado cuando los requisitos no están claros. Se construyen prototipos rápidos que se prueban con el cliente y se ajustan iterativamente hasta alcanzar el diseño final.

---

## 6. Lenguajes de Programación y Proceso de Compilación

### 6.1. Proceso de Transformación del Código
1. **Código Fuente:** Escrito por el programador.
2. **Compilador / Intérprete:** Traduce el código fuente.
3. **Código Objeto:** Código binario o bytecode resultante de la compilación previa al enlazado.
4. **Enlazador (Linker):** Une el código objeto con las librerías del sistema (`import`, `#include`) para generar el **Código Ejecutable**.

### 6.2. Fases de la Compilación
1. **Análisis Léxico:** Genera *tokens* (lexemas) comprobando que los símbolos pertenezcan al alfabeto del lenguaje.
2. **Análisis Sintáctico:** Comprueba que las construcciones cumplen las reglas gramaticales del lenguaje.
3. **Análisis Semántico:** Verifica el significado e impresiones de tipos para garantizar coherencia operacional.
4. **Generador de Código Objeto:** Genera el archivo binario intermedio.
5. **Enlazador:** Junta el código objeto con las librerías externas.

### 6.3. Paradigmas de Programación
- **Estructurada:** Permite tres tipos de sentencias (secuenciales, condicionales y repetitivas). Se concentra en un bloque único (baja reutilización).
- **Modular:** Divide el programa en módulos o funciones reutilizables.
- **Orientada a Objetos (POO):** Basada en objetos independientes que colaboran mediante mensajes.
  - *Conceptos clave:* Clase, Objeto, Atributo, Método, Evento, Encapsulamiento, Herencia, Polimorfismo, Abstracción.

### 6.4. Entorno de Ejecución en Java
- **Java es compilado e interpretado:** El compilador (`javac`) genera un código intermedio ejecutable conocido como **Bytecode** (`.class`). La **Máquina Virtual de Java (JVM)** interpreta dicho Bytecode.
- **Compilador JIT (Just-In-Time):** Compila partes del Bytecode directamente a código máquina nativo en tiempo de ejecución para aumentar la velocidad.
- **Componentes Java:**
  - **JVM (Java Virtual Machine):** Intérprete encargado de ejecutar el Bytecode.
  - **JRE (Java Runtime Environment):** Incluye la JVM y las bibliotecas estándar necesarias para ejecutar aplicaciones Java.
  - **JDK (Java Development Kit):** Kit completo de desarrollo que incluye el JRE, el compilador `javac`, el archivador `jar`, generador de documentación `javadoc` y herramientas de depuración.
