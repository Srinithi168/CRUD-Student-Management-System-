EDUTRACK JAVASCRIPT IMPORT / EXPORT STRUCTURE

1. Put all these .js files inside your project's js folder.

2. Replace the old script.js reference in every HTML page with:

<script type="module" src="js/main.js"></script>

3. main.js imports the feature modules and initializes them.

4. Each feature file exports its functions using:
   export function ...

5. main.js imports them using:
   import { functionName } from "./file.js";

6. The current HTML uses onclick attributes for some buttons.
   main.js exposes those imported functions through window so the
   existing HTML continues to work without changing every page.

IMPORTANT:
Open the project through a local server (for example VS Code Live Server).
ES modules can be blocked when HTML files are opened directly with file://.
