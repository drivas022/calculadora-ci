# README — CI con GitHub Actions (Calculadora)

Este repo es un ejemplo **bien sencillo** de:
- una calculadora en JavaScript (Node.js)
- pruebas con **Jest**
- un pipeline de **CI** en GitHub Actions definido en `.github/workflows/ci.yml`

La idea: cada vez que hacés **push** a `main`, GitHub corre el workflow, instala dependencias y ejecuta tests. Si un test falla, el workflow sale rojo ❌.

---

## ¿Qué es CI?
**CI (Integración Continua)** es automatizar validaciones del código (tests, lint, build) cada vez que subís cambios. Sirve para detectar errores rápido y no mezclar código roto.

---

## Estructura del proyecto

```text
.github/workflows/ci.yml   # Workflow de GitHub Actions (CI)
calculadora.js             # Funciones (sumar, restar, etc.)
calculadora.test.js        # Pruebas (Jest)
package.json               # Config del proyecto y scripts
package-lock.json          # Bloqueo exacto de dependencias (npm)
```

---

## Cómo correrlo local (en tu compu)

1) Instalar dependencias:
```bash
npm install
```

2) Correr pruebas:
```bash
npm test
```

---

# Explicación COMPLETA de `.github/workflows/ci.yml`

Este archivo es un **workflow** de GitHub Actions (YAML). Define:
- **cuándo** se ejecuta (eventos)
- **qué jobs** corre
- **qué steps** hace cada job

Ejemplo de `ci.yml`:

```yaml
name: CI - Calculadora

on:
  push:
    branches: [ "main" ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar el código
        uses: actions/checkout@v4

      - name: Configurar Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Instalar dependencias
        run: npm ci

      - name: Correr pruebas
        run: npm test
```

---

## Explicación palabra por palabra (lo importante)

### `name`
- **Qué es:** el nombre del workflow.
- **Para qué sirve:** lo ves como título en la pestaña **Actions**.

### `on`
- **Qué es:** define el evento que dispara el workflow.
- **Para qué sirve:** decidir **cuándo corre**.

#### `push`
- **Qué es:** corre cuando hacés `git push`.
- **Para qué sirve:** validar cada vez que subís cambios.

#### `branches: ["main"]`
- **Qué es:** filtro de ramas.
- **Para qué sirve:** solo corre si el push fue a `main`.

### `jobs`
- **Qué es:** conjunto de tareas grandes (pueden ser varias).
- **Para qué sirve:** separar responsabilidades (test, lint, build, deploy).

#### `test`
- **Qué es:** nombre del job (lo elegís vos).
- **Para qué sirve:** aquí corre las pruebas.

#### `runs-on: ubuntu-latest`
- **Qué es:** la máquina virtual donde corre el job.
- **Para qué sirve:** GitHub ejecuta todo en Ubuntu.

### `steps`
- **Qué es:** lista de pasos dentro del job, en orden.
- **Para qué sirve:** indicar acciones/comandos.

En los steps aparecen dos claves comunes:
- `uses`: usa una acción ya hecha (como “plugin”).
- `run`: corre comandos en la terminal.

---

## Detalle de cada step

### 1) `actions/checkout@v4`
```yaml
- name: Descargar el código
  uses: actions/checkout@v4
```
- **Qué hace:** clona tu repo dentro de la VM.
- **Por qué es necesario:** si no, GitHub no tiene tu código para probar.

### 2) `actions/setup-node@v4` + `node-version`
```yaml
- name: Configurar Node
  uses: actions/setup-node@v4
  with:
    node-version: "20"
```
- **Qué hace:** instala/configura Node.js.
- **Por qué:** para poder usar `npm` y correr tests.
- **node-version:** fija la versión (Node 20).

### 3) `npm ci`
```yaml
- name: Instalar dependencias
  run: npm ci
```
- **Qué hace:** instala dependencias usando `package-lock.json`.
- **Por qué:** es instalación “limpia” y estable para CI.

### 4) `npm test`
```yaml
- name: Correr pruebas
  run: npm test
```
- **Qué hace:** ejecuta el script `test` del `package.json` (Jest).
- **Resultado:** si un test falla → step falla → job falla → workflow rojo ❌.

---

# Explicación COMPLETA de `package.json`

`package.json` define metadata, scripts y dependencias del proyecto Node.

Ejemplo:

```json
{
  "name": "calculadora-ci",
  "version": "1.0.0",
  "description": "Ejemplo sencillo de CI con GitHub Actions",
  "main": "calculadora.js",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

## Campos

### `"name"`
Nombre del proyecto/paquete.

### `"version"`
Versión del proyecto (estándar en Node).

### `"description"`
Descripción corta del repo.

### `"main"`
Archivo principal (informativo en este caso).

## `"scripts"`
Atajos para correr comandos.

### `"test": "jest"`
Hace que `npm test` ejecute **Jest**.

## `"devDependencies"`
Librerías para desarrollo (tests, lint, herramientas).

### `"jest": "^29.7.0"`
Framework de pruebas. El `^` permite actualizaciones menores/patch dentro de la versión 29.

---

## ¿Qué se espera que pase en GitHub?
1) Subís el repo con `.github/workflows/ci.yml`.
2) Hacés push a `main`.
3) En **Actions** se ejecuta:
   - checkout
   - setup node
   - `npm ci`
   - `npm test`
4) Si todo pasa → ✅ verde. Si un test falla → ❌ rojo.

---

## Nota rápida sobre YAML
YAML depende de la **indentación** (espacios). Una sangría mala puede romper el workflow.