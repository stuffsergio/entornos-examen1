# Tema 3: Control de Versiones con Git

## 1. Introducción al Control de Versiones y Git

### 1.1. ¿Qué es el Control de Versiones?
Un sistema de control de versiones (VCS) registra los cambios realizados sobre un conjunto de archivos a lo largo del tiempo, de modo que se puedan recuperar versiones específicas más adelante, comparar diferencias y colaborar en equipo de forma ordenada.

### 1.2. Git: Sistema Distribuido
Git es un Sistema de Control de Versiones Distribuido (DVCS) creado por Linus Torvalds. A diferencia de los sistemas centralizados (como SVN), cada desarrollador dispone de una copia local completa del repositorio en su propio equipo, incluyendo todo el historial de confirmaciones.

---

## 2. Los Tres Árboles de Git (Estados de Archivo)

El flujo de trabajo básico en Git se administra a través de tres áreas o "árboles" locales:

1. **Directorio de Trabajo (Working Directory):** Contiene los archivos físicos que el desarrollador está editando activamente en su sistema de archivos.
2. **Index / Staging Area:** Zona intermedia de preparación donde se registran y agrupan los cambios que formarán parte de la próxima confirmación (*commit*).
3. **HEAD:** Puntero de referencia al último *commit* realizado en la rama activa de la copia local.

---

## 3. Flujo de Trabajo y Comandos Básicos

### 3.1. Creación y Clonación de Repositorios
- **Crear un repositorio nuevo:**
  ```bash
  git init
  ```
  Inicializa una nueva estructura de Git en el directorio local actual.

- **Clonar un repositorio existente:**
  - Copia local: `git clone /ruta/al/repositorio`
  - Servidor remoto: `git clone usuario@servidor:/ruta/al/repositorio`

### 3.2. Ver el Estado del Repositorio
```bash
git status
```
Muestra el estado actual de los archivos: cuáles están modificados, cuáles están en la zona intermedia (Staging Area) y cuáles no están rastreados (*untracked*).

### 3.3. Preparar Cambios (Add) y Confirmar (Commit)
1. **Añadir archivos al Index (Staging):**
   ```bash
   git add <nombre_archivo>
   git add .
   ```
2. **Confirmar los cambios en el HEAD local:**
   ```bash
   git commit -m "Mensaje descriptivo del commit"
   ```
   En este punto los cambios quedan grabados en la historia del repositorio local (HEAD), pero aún no están en el servidor remoto.

---

## 4. Gestión de Remotos y Envío de Cambios

### 4.1. Conectar a un Repositorio Remoto
Si el repositorio local fue iniciado con `git init` y no clonado, se debe conectar a un servidor remoto mediante:
```bash
git remote add origin <servidor_url>
```

### 4.2. Enviar Cambios al Servidor (Push)
```bash
git push origin master
```
Envía las confirmaciones (*commits*) de la rama local activa (`master` o la rama especificada) al repositorio remoto (`origin`).

### 4.3. Actualizar el Repositorio Local (Pull y Fetch)
- **git pull:** Descarga y fusiona automáticamente los cambios del servidor remoto en la rama local activa (*equivale a ejecuciones internas de fetch + merge*).
  ```bash
  git pull
  ```
- **git fetch origin:** Descarga los objetos y referencias del servidor remoto sin alterar el directorio de trabajo ni fusionar ramas automáticamente.

---

## 5. Ramificaciones (Branches) y Fusiones (Merges)

### 5.1. Concepto de Rama
Las ramas se utilizan para desarrollar funcionalidades aisladas unas de otras de forma independiente. La rama principal por defecto en Git suele llamarse `master` o `main`.

### 5.2. Comandos para la Gestión de Ramas
- **Crear una nueva rama y cambiar a ella:**
  ```bash
  git checkout -b feature_x
  ```
- **Volver a la rama principal:**
  ```bash
  git checkout master
  ```
- **Listar ramas existentes:**
  ```bash
  git branch
  ```
- **Eliminar una rama local:**
  ```bash
  git branch -d feature_x
  ```
- **Hacer pública una rama en el remoto:**
  ```bash
  git push origin <nombre_rama>
  ```

### 5.3. Fusión de Ramas (Merge) y Conflictos
Para integrar los cambios de otra rama en la rama activa (por ejemplo, dentro de `master`):
```bash
git merge feature_x
```
- **Resolución de Conflictos:** Si ambas ramas han modificado las mismas líneas de un archivo, Git no podrá fusionar automáticamente y marcará un **conflicto**. El programador debe editar manualmente el archivo conflictivo, marcarlo como resuelto con `git add <archivo>` y completar la fusión ejecutando `git commit`.

### 5.4. Reorganizar la Historia (Rebase)
```bash
git rebase <rama_base>
```
Aplica de nuevo las confirmaciones de la rama actual sobre la punta de otra rama base, creando una historia lineal limpia.

---

## 6. Deshacer Cambios y Herramientas Avanzadas

### 6.1. Reemplazar Cambios Locales (Checkout y Reset)
- **Descartar cambios locales no añadidos al Index:**
  ```bash
  git checkout -- <nombre_archivo>
  ```
  Reemplaza las modificaciones del archivo con la versión del último *commit* en HEAD.
- **Deshacer todos los cambios y commits locales (Reset Duro):**
  ```bash
  git fetch origin
  git reset --hard origin/master
  ```
  Fuerza a la copia local a apuntar exactamente a la versión del servidor remoto.

### 6.2. Guardado Temporal (Stash)
```bash
git stash
```
Guarda temporalmente los cambios modificados no confirmados sin hacer *commit*, dejando el directorio de trabajo limpio para cambiar de rama rápidamente.

### 6.3. Inspección, Diferencias e Historial
- **Ver diferencias entre ramas:**
  ```bash
  git diff <rama_origen> <rama_destino>
  ```
- **Ver el historial de confirmaciones:**
  ```bash
  git log
  ```

### 6.4. Etiquetado (Tags)
Se utiliza para marcar entregas de versiones publicadas (hitos de versión):
```bash
git tag 1.0.0 1b2e1d63ff
```
Donde `1b2e1d63ff` corresponde a los primeros caracteres del *commit ID* obtenido previamente con `git log`.

### 6.5. Opciones de Configuración Útiles
- Habilitar colores en la consola: `git config color.ui true`
- Mostrar una sola línea por *commit* en el registro: `git config format.pretty oneline`
- Interfaz gráfica integrada en Git: `gitk`
