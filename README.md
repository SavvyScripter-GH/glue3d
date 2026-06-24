# Glue3D

Glue3D is a custom scripting language for game and 3D project development, designed for clean structure and readable syntax.

> [!NOTE]
> This is currently in Beta

> [!IMPORTANT]
> You need to use Droplets Utils to import .glue3d files
---

## Features

- Custom syntax highlighting for `.glue3d` files
- Autocomplete snippets for engine blocks
- Structured control flow:
  - `for` / `endfor`
  - `if` / `endif`
  - `repeat` / `endrepeat`
- Engine modules:
  - `game`
  - `physics`
  - `model`
  - `sound`
  - `interface`
  - `editor`
  - `terminal`
  - `file`
- Built-in `wait` keyword
- Comment support (`// comment`)
- auto indent
---

## Example

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