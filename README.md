# Glue3D

Glue3D is a custom scripting language for game and 3D project development, designed for clean structure and readable syntax.

> [!NOTE]
> *Currently in Beta.*

> [!IMPORTANT]
> You need to use **[Glue3D CE](https://github.com/Droplets21/Glue3D-Community-Edition)** to import `.glue3d` files.

- [Downloading Glue3D](#download)
- [Additional Info](#info)
    - [Docs](#docs)
    - [Wiki](#wiki)
- [Categories](#categories)
- [Examples](#examples)
---

## Features

- Custom dark theme and syntax highlighting for `.glue3d` files.
- Auto-indentation and bracket matching.
- Autocomplete snippets for core engine blocks.
- Structured control flow (`if`, `while`, `for`, `forever`, `repeat`).

---

## Module Categories <a name="categories"/></a>

Glue3D is organized into easy-to-use prefixes so you always know what you are controlling:

### **World & Physics**
* `game.` - Manage cameras (1st/3rd person), FOV, and player keyboard inputs.
* `physics.` - Set gravity, friction, hitboxes, and apply directional forces.
* `object.` - Move, rotate, scale, clone, and delete items in your world.
* `model.` - Assign 3D models and rotate/turn specific skeleton bones.

### **Logic & Math**
* `math.` - Perform calculations (add, subtract, multiply, modulo) and advanced math (sin, cos, clamp, interpolate).
* `func.` - Create custom functions with inputs and return data.
* `val`, `var`, `str` - Store values, numbers, and text strings.

### **UI & Media**
* `interface.` - Create clickable menus, set UI text, and track mouse movement.
* `sound.` - Play and edit audio clips with custom volume and pitch.
* `terminal.` - Print variables and strings to the console for debugging.

### **Data Management**
* `list.` - Create and read arrays of data.
* `file.` - Create, copy, delete, and move files for saving game states.

---

> [!TIP]
> ## Help & Getting Started <a name="download"/></a>
> 
> New to Glue3D? Here are a few tips to get you scripting quickly:
> 
> 1.  **Use Autocomplete:** Start typing a module name (like `object.` or  `math.`) and the editor will show you all available commands and what they do.
> 2.  **Using Variables:** `val` is used for numbers, `str` is for text, and `var` is used to store data or the results of functions (often using `data_return`).
> 3.  **Debugging:** If something isn't working, use `terminal.print(var  variable, val color)` to check the values of your variables in real-time.
> 4.  **Physics Check:** Remember that if you want gravity and collisions to work, you must call `physics.include_physics()` at the start of your script!

---
## Other Useful Information <a name="info"/></a>
>Official Glue3D documentation can be found [**here**](https://gl00b.github.io/GLUE3D/) <a name="docs"/></a>
>
>Community Wiki page can be found [**here**](https://wiki.glue3d.net/Main_Page) <a name="wiki"/></a>

---
## Example Script <a name="examples"/></a>

Here is a basic example showing loops, game logic, and sound:

```js
//vsc made with glue3d-vscode
//
//loops 10 times and prints var 'i' each time
var i = val 0 
var range = val 10 
while (var i < var range) 
    terminal.print(var i, val 20) 
    var i += val 1 
endwhile
```
<p align="center">
  <img src="./icons/logo.png" alt="Alt Text">
</p>