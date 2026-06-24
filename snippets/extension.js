const vscode = require('vscode');

const COMMAND_REGISTRY = {
    "file.name": {
        "desc": "Sets the name of the .glue3d script in the editor.",
        "params": { "script name": "The string name identifier for this script." }
    },
    "object.go_to": {
        "desc": "Move object to absolute 3D coordinates.",
        "params": {
            "x": "The target absolute position on the horizontal X axis.",
            "y": "The target absolute position on the vertical Y axis.",
            "z": "The target absolute position on the depth Z axis.",
            "speed": "The velocity rate factor used to move the object."
        }
    },
    "object.go_to_object": {
        "desc": "Move object smoothly until its position matches another object.",
        "params": {
            "object": "The target object identifier script to follow.",
            "speed": "The transformation velocity rate."
        }
    },
    "object.move": {
        "desc": "Move object by relative values along X, Y, and Z axes.",
        "params": { "value": "The offset value to translate along the respective axis." }
    },
    "object.move_dir": {
        "desc": "Move object in a specific direction by a set distance.",
        "params": {
            "dir": "The direction orientation angle or mode.",
            "distance": "How far the object should translate."
        }
    },
    "object.rotate_to": {
        "desc": "Rotate object to absolute orientation directions.",
        "params": {
            "rx": "Absolute target rotation angle for X axis.",
            "ry": "Absolute target rotation angle for Y axis.",
            "rz": "Absolute target rotation angle for Z axis.",
            "speed": "The rotational velocity transition rate."
        }
    },
    "object.rotate_toward": {
        "desc": "Rotate object toward another target object.",
        "params": {
            "object": "The targeted objective script to track or look at.",
            "speed": "The rotational turning speed threshold."
        }
    },
    "object.turn": {
        "desc": "Rotate object relatively by raw rotational input values.",
        "params": { "0": "Relative change value applied to the respective rotation tracking axis." }
    },
    "object.scale_to": {
        "desc": "Scale object size parameters to absolute values.",
        "params": {
            "sx": "Absolute dimensions multiplier scaling factor on X axis.",
            "sy": "Absolute dimensions multiplier scaling factor on Y axis.",
            "sz": "Absolute dimensions multiplier scaling factor on Z axis.",
            "speed": "The growth or shrinking transition execution speed."
        }
    },
    "object.distance": {
        "desc": "Calculates distance to target object and outputs to data_return.",
        "params": { "script": "The target script entity identifier to measure against." }
    },
    "object.clone": {
        "desc": "Clone target script workspace with its assigned object assets.",
        "params": { "script": "The target resource script file blueprint layout to copy." }
    },
    "object.delete": {
        "desc": "Destroys and deletes the current object execution unit.",
        "params": {}
    },
    "object.new_attribute": {
        "desc": "Assigns a completely new runtime attribute properties state to an object.",
        "params": {
            "object": "The object instance getting the new key tracking variable.",
            "name": "The identifier key label for the new attribute parameter.",
            "value": "The starting data or number applied to the attribute."
        }
    },
    "object.get_data": {
        "desc": "Retrieves attribute properties from an object down into data_return.",
        "params": {
            "object": "The object instance containing data parameters.",
            "data": "The specific attribute label string to look up."
        }
    },
    "object.edit_data": {
        "desc": "Edits existing attribute properties assigned to a specific object.",
        "params": {
            "object": "The object instance containing data parameters.",
            "data": "The target data key property to override.",
            "value": "The new values structure to store."
        }
    },
    "physics.include_physics": {
        "desc": "Initializes global physical components, allowing collision and gravity systems to compute.",
        "params": {}
    },
    "physics.set_factors": {
        "desc": "Sets physical parameters environment variables simulation fields.",
        "params": {
            "gravity": "The downward constant physics pull force factor.",
            "jump": "The initial upward vertical velocity force multiplier.",
            "friction": "Surface standard drag resistance coefficient ratio.",
            "bounce": "Restitution scalar determining how springy object contacts behave."
        }
    },
    "physics.hitbox": {
        "desc": "Configures custom 3D dimension scaling boxes for structural collision handling boundaries.",
        "params": {
            "x": "Width size dimension vector scale.",
            "y": "Height size dimension vector scale.",
            "z": "Depth size dimension vector scale."
        }
    },
    "physics.surface_collision": {
        "desc": "Enables or disables object tracking surface contact detection rules.",
        "params": { "true": "Boolean state handler condition flag input." }
    },
    "physics.hitbox_collision": {
        "desc": "Enables or disables bounding box intersection rules checks context.",
        "params": { "true": "Boolean state handler condition flag input." }
    },
    "physics.add_force": {
        "desc": "Applies structural directional kinematic impulses to an object.",
        "params": {
            "axis": "The targeted world coordinate translation axis string (X/Y/Z).",
            "force": "The numerical strength threshold vector of the push dynamic."
        }
    },
    "physics.dir_force": {
        "desc": "Applies standard directional vectors force factors out across distance scales.",
        "params": {
            "direction": "Angle orientation vector matching force distribution grids.",
            "distance": "Length range coverage fields index value."
        }
    },
    "physics.on_floor": {
        "desc": "Checks if object currently makes layout ground boundary contact (returns to data_return).",
        "params": {}
    },
    "physics.collided": {
        "desc": "Checks if object registered any impact events on this frame cycle (returns to data_return).",
        "params": {}
    },
    "physics.physics_tick": {
        "desc": "Manually advances physics loop constraints resolution evaluations context frames.",
        "params": {}
    },
    "model.set_model": {
        "desc": "Loads and applies a 3D asset model file directly onto the active target reference scene structure.",
        "params": { "model": "The resource string filename pathway identifier to render." }
    },
    "model.refresh_models": {
        "desc": "Reloads model asset pointers updates safely at runtime.",
        "params": {}
    },
    "model.set_bone": {
        "desc": "Selects a specified submesh target skeleton bone element reference context map.",
        "params": { "bone": "The string structural identification key name inside the skeletal model hierarchy." }
    },
    "model.rotate_bone": {
        "desc": "Applies explicit layout orientation angle adjustments tracking on a single node element.",
        "params": {
            "0": "The targeted rotation degrees change tracking element.",
            "bone": "The skeleton asset item reference label path."
        }
    },
    "model.turn_bone": {
        "desc": "Applies localized relative frame shifts turning paths across specified internal joint bones.",
        "params": {
            "0": "The targeted transform index value change context.",
            "bone": "The skeleton asset item reference label path."
        }
    },
    "model.ease": {
        "desc": "Configures active bone rotation transition animation interpolation weighting curves.",
        "params": { "value": "The percentage or factor target used to evaluate curve speed settings." }
    },
    "game.include_game": {
        "desc": "Activates underlying runtime logic systems, enabling complete keyboard capture input and interactive gameplay maps tracking features.",
        "params": {}
    },
    "game.movement_type": {
        "desc": "Configures input processing profile structures.",
        "params": { "type": "The profile name string configuration settings layout identifier." }
    },
    "game.movement": {
        "desc": "Processes responsive keyboard layout mapping translation inputs while simultaneously running local physics updates updates.",
        "params": {
            "speed": "Maximum forward translation movement limits.",
            "turn_speed": "Rotational turning angle velocity sensitivity curves parameters."
        }
    },
    "game.key_pressed": {
        "desc": "Polls if a key matching specified string layouts is currently down (outputs to data_return).",
        "params": { "key": "The tracking identifier character label name string (e.g. 'space', 'w')." }
    },
    "game.get_key": {
        "desc": "Intercepts raw system input loops tracking context keys directly into active memory arrays.",
        "params": {}
    },
    "game.set_camera": {
        "desc": "Changes camera view mode configurations.",
        "params": { "camera": "The mode string profile indicator selection label." }
    },
    "game.camera_1st": {
        "desc": "Binds viewport tracking parameters explicitly inside an object perspective structure.",
        "params": {
            "object": "Target tracking coordinate script link.",
            "elevation": "Vertical lens height alignment value offset."
        }
    },
    "game.camera_3rd": {
        "desc": "Sets up trailing follow orbital viewpoint behaviors on top of target units.",
        "params": {
            "object": "Target tracking coordinate script link.",
            "distance": "The clearance length scale factor between lens tracking coordinates.",
            "speed": "The smooth damp camera adjustment catchup velocity scalar."
        }
    },
    "game.fov": {
        "desc": "Alters lens magnification scope width rules context indicators tracking fields.",
        "params": { "fov": "The degree scaling ratio threshold value index." }
    },
    "terminal.clear": {
        "desc": "Clears all historical text logs tracked layout details written within development views windows.",
        "params": {}
    },
    "list.create_list": {
        "desc": "Allocates structural index tracking table lists maps assigned to internal configuration tracking paths.",
        "params": {
            "name": "The identity key handle pointing to your list reference.",
            "file": "The storage file identifier destination profile linking data records safely."
        }
    },
    "list.clear": {
        "desc": "Wipes out all stored structural index collection records fields within an active named list allocation.",
        "params": { "name": "The target table lookup keyword designation." }
    },
    "list.add_item": {
        "desc": "Appends a completely new data string values record safely right down onto the tail-end position boundary limit slots of lists.",
        "params": {
            "listname": "The objective array table to modify.",
            "value": "The specific text information chunk to queue up onto file allocations."
        }
    },
    "list.delete_item": {
        "desc": "Removes data element arrays item locations based directly upon raw index sequence parameters numbers.",
        "params": {
            "list": "The target data framework identity array to modify.",
            "index": "The numbered slot position address tracking element context where removals happen."
        }
    },
    "list.read": {
        "desc": "Reads content from a specified list index location down directly into active data_return loops paths variables configurations.",
        "params": {
            "list": "The target index structure system array name to extract from.",
            "index": "The element cell identifier integer addressing address reference."
        }
    },
    "list.read_list": {
        "desc": "Pulls entire collection values map data sets from list records onto data_return structures blocks directly.",
        "params": { "list": "The destination array identification keyword configuration script link." }
    },
    "list.length": {
        "desc": "Returns total allocation values element count sizes parameter maps tracked right across lists profiles configurations.",
        "params": { "list": "The destination reference lookups keyword parameters indicator." }
    },
    "interface.set_id": {
        "desc": "Updates 2D layout asset visual appearance profiles costume keys targets indicators.",
        "params": { "costume_id": "The string identity pathway identifier asset filename code index tracking details." }
    },
    "interface.text": {
        "desc": "Draws clean customized screen font display layouts components layers.",
        "params": { "text": "The information textual elements strings being compiled or outputted onto views." }
    },
    "interface.set_pos": {
        "desc": "Locks 2D display elements layout positions configurations explicitly into explicit horizontal/vertical tracking frames layouts.",
        "params": {
            "x": "Horizontal screen pixels coordinates address limits configuration context.",
            "y": "Vertical screen pixels coordinates address limits configuration context."
        }
    },
    "interface.dir": {
        "desc": "Sets rotational orientation layout degrees vectors profiles mapped elements structures.",
        "params": { "direction": "Angular rotation mapping setting coordinate value scales tracker targets." }
    },
    "interface.scale": {
        "desc": "Alters structural display sizes profiles parameters layout components globally scaling elements shapes.",
        "params": { "scale": "Dimensions sizing profile multiplier metric conversion indices value constants." }
    },
    "interface.get_mouse_axis": {
        "desc": "Captures raw screen coordinate cursor paths offsets indices positions right down inside data_return containers profiles configuration mappings.",
        "params": { "axis": "String structural indicator checking for either horizontal axis shifts ('x') or vertical axis adjustments ('y')." }
    },
    "interface.clickable": {
        "desc": "Enables or disables standard click interaction layer capabilities on UI items templates panels.",
        "params": { "true": "Boolean state toggles conditions identifier tracker configurations fields entries variables labels." }
    },
    "interface.clicked": {
        "desc": "Returns mouse click interaction event status alerts directly down onto data_return paths systems registers tracker layouts properties profiles definitions.",
        "params": {}
    },
    "interface.set_ghost": {
        "desc": "Updates rendering transparency alpha settings indexes profiles layer models configurations details components scales contexts fields properties layout structures entries metrics items tracker fields.",
        "params": { "value": "Opacity evaluation metric ranging completely between invisible thresholds bounds and full visibility maps indicators." }
    },
    "file.create_file": {
        "desc": "Allocates dedicated data document tables records containers inside workspace directories systems trees profiles configurations lists records labels indices details mappings entries.",
        "params": {
            "name": "The objective filepath identification storage string reference code layout key context paths mappings definitions indices entries variables tracker definitions parameters.",
            "true": "Enforcement flags configuration profiles fields maps rules markers structural labels entries."
        }
    },
    "file.delete_file": {
        "desc": "Erases targeting file paths configurations storage databases entirely from memory maps frameworks.",
        "params": { "name": "The literal file target keyword identifier pathway name string to target." }
    },
    "file.move_item": {
        "desc": "Transfers individual asset configuration tracking variables entries item records straight over into target files groupings blocks definitions contexts tracking variables arrays files models maps frameworks.",
        "params": {
            "name": "The specific elements tracking entries value identifier record block.",
            "filename": "The primary tracking database structure filename link destination indicator."
        }
    },
    "file.copy_item": {
        "desc": "Duplicates structural component nodes datasets fields directly out over into separate destination file records layers contexts.",
        "params": {
            "name": "The target input source identifier record string.",
            "filename": "The target reference database structure name container block mapping context details.",
            "copyname": "The secondary target label applied to identifier tags assigned onto duplicates records models maps layouts."
        }
    },
    "file.delete_item": {
        "desc": "Deletes isolated values tracking items entries right out from specific database files configurations.",
        "params": { "name": "The parameter item tracking node key label string targeting elements for deletion fields updates." }
    },
    "file.create_item": {
        "desc": "Initializes completely custom element item parameters layers inside specific database text blocks files layouts frameworks parameters paths entries records identifiers.",
        "params": {
            "type": "Data mapping classification profile string structure context blueprint configuration options tags.",
            "name": "Unique tracking label assignment string keyword context profiles configurations maps labels indices layers.",
            "file": "Target objective record directory system container node identification link reference name keys labels context fields."
        }
    },
    "sound.play": {
        "desc": "Triggers audio reproduction files maps matching specific sound identifier entries names configurations directly fields components properties.",
        "params": { "sound_name": "The resource file sound clips directory profile pathway indicator string name tracking parameter." }
    },
    "sound.stereo": {
        "desc": "Switches sound engine outputs layers into dual-channel spatial balance stereo mapping configuration systems layout properties frameworks contexts fields.",
        "params": {}
    },
    "sound.mono": {
        "desc": "Switches sound engine outputs layers into single-channel localized centralized sound rendering properties settings frameworks grids models.",
        "params": {}
    },
    "sound.play_advanced": {
        "desc": "Configures advanced pinpoint sound asset instantiation triggers tracking unique session codes channels configurations along with volume scales and frequency pitch values layers paths properties details fields templates constants keys.",
        "params": {
            "id": "Custom channel identifier reference index key codes string layout parameters tracking values context frameworks.",
            "sound_name": "Sound clip asset filename structural keyword identifier indicator code layout references tracks.",
            "volume": "Amplitude loudness scaling adjustments ratio metric configuration points profiles limits.",
            "pitch": "Frequency modulation speed rate index setting scaling playback tones parameters shifts ranges."
        }
    },
    "sound.edit": {
        "desc": "Adjusts ongoing parameters fields on active playing sound channels matching specific registration ID codes.",
        "params": {
            "id": "Target runtime active sound sequence code identifier tracker values context keys maps configurations layout.",
            "volume": "Dynamic real-time loudness level change vector multiplier setting index profile limits bounds context metrics.",
            "pitch": "Dynamic real-time playback velocity rate shift alterations frequency modifiers scale values indicators parameters metrics."
        }
    },
    "wait": {
        "desc": "Suspends thread execution paths for a specified duration of step frames or seconds time segments scales layouts profiles.",
        "params": { "value": "The numbered scalar amount of duration interval loops sequences values constants parameters fields target markers mappings paths." }
    },
    "val": {
        "desc": "A numeric value type.",
        "params": { "value": "The literal number or digit asset.", "color": "Values from -200 to 180 in increments of 20." }
    },
    "var": {
        "desc": "A variable container that can hold either strings or numbers.",
        "params": { "variable_name": "The unique name given to store data.", "variable": "The variable being declared or modified." }
    },
    "str": {
        "desc": "A string data type representing text characters.",
        "params": { "string": "The literal text enclosed in parameters." }
    },
};

function activate(context) {

    const provideEdits = (document, range) => {
        const edits = [];
        const indentSize = 4;
        let indentLevel = 0;

        for (let i = 0; i < range.start.line; i++) {
            const lineText = document.lineAt(i).text.trim();

            if (/^\s*\b(if|for|repeat|forever|while|func.func_start)\b/.test(lineText)) {
                indentLevel++;
            }
            if (/^\s*\b(endif|endfor|endrepeat|endforever|endwhile|func.func_end)\b/.test(lineText)) {
                indentLevel = Math.max(indentLevel - 1, 0);
            }
        }

        for (let i = range.start.line; i <= range.end.line; i++) {
            const line = document.lineAt(i);
            const trimmed = line.text.trim();

            if (trimmed.length === 0) {
                continue;
            }

            if (/^\s*\b(endif|endfor|endrepeat|endforever|endwhile|func.func_end)\b/.test(trimmed)) {
                indentLevel = Math.max(indentLevel - 1, 0);
            }

            const newText = ' '.repeat(indentLevel * indentSize) + trimmed;

            if (line.text !== newText) {
                edits.push(vscode.TextEdit.replace(line.range, newText));
            }

            if (/^\s*\b(if|for|repeat|forever|while|func.func_start)\b/.test(trimmed)) {
                indentLevel++;
            }
        }

        return edits;
    };

    const docFormatter = vscode.languages.registerDocumentFormattingEditProvider('glue3d', {
        provideDocumentFormattingEdits(document) {
            const lastLine = document.lineAt(document.lineCount - 1);
            const fullRange = new vscode.Range(new vscode.Position(0, 0), lastLine.range.end);
            return provideEdits(document, fullRange);
        }
    });

    const rangeFormatter = vscode.languages.registerDocumentRangeFormattingEditProvider('glue3d', {
        provideDocumentRangeFormattingEdits(document, range) {
            const fullLineRange = new vscode.Range(range.start.line, 0, range.end.line, 10000);
            return provideEdits(document, fullLineRange);
        }
    });

    const hoverProvider = vscode.languages.registerHoverProvider('glue3d', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            if (!range) return null;

            const hoveredWord = document.getText(range).trim();
            const lineText = document.lineAt(position.line).text;

            // 1. Scan for the dominant active command string context governing this line
            let activeCommandKey = null;
            for (const key of Object.keys(COMMAND_REGISTRY)) {
                if (lineText.includes(key + "(") || lineText.includes(key + " ")) {
                    activeCommandKey = key;
                    break;
                }
            }

            // 2. Perform Precise Command Parameter Context Hover Evaluation
            if (activeCommandKey) {
                const commandData = COMMAND_REGISTRY[activeCommandKey];

                // Check if the hovered word perfectly matches a nested parameter inside this specific active command entries matrix
                if (commandData.params && commandData.params[hoveredWord] !== undefined) {
                    const paramDesc = commandData.params[hoveredWord];

                    const hoverMarkdown = new vscode.MarkdownString();
                    hoverMarkdown.appendMarkdown(`**Parameter:** \`${hoveredWord}\`\n\n`);
                    hoverMarkdown.appendMarkdown(`${paramDesc}\n\n`);
                    hoverMarkdown.appendMarkdown(`*Context:* \`${activeCommandKey}\``);
                    return new vscode.Hover(hoverMarkdown);
                }
            }

            // 3. Fallback: Check if the hovered word matches a base command/method name itself directly
            if (COMMAND_REGISTRY[hoveredWord]) {
                return new vscode.Hover(new vscode.MarkdownString(`**Command:** \`${hoveredWord}\`\n\n${COMMAND_REGISTRY[hoveredWord].desc}`));
            }

            // 4. Global Namespace Module Fallbacks Checks (e.g., hovering standalone text words like 'object', 'physics' or 'terminal')
            const moduleNameFallbacks = {
                'file': '**File Module Namespace**\n\nHandles file system operations, item instantiation, transfers, and registry maps definitions details tracking configurations entries.',
                'object': '**Object Module Namespace**\n\nHandles world location spatial transformations, rotations, scaling modifications updates tracking elements nodes cycles structures lifecycle properties.',
                'physics': '**Physics Module Namespace**\n\nHandles structural environmental forces parameters settings configurations gravity impulses velocity calculations bounding collision boxes metrics resolution frame updates simulation constraints cycles.',
                'model': '**Model Module Namespace**\n\nHandles 3D graphics mesh data resources assignments refresh triggers and skeletal transform joint tracking elements hierarchy node parameters setups.',
                'game': '**Game Module Namespace**\n\nHandles system integration rules configurations inputs mapping captures viewport setups cameras attachments perspective profiles transformations settings processing frameworks loops components fields variables layout properties layers elements.',
                'math': '**Math Module Namespace**\n\nProvides standard calculation routing components logic processing arrays operators evaluation functions values matrix helpers constants filters equations formulas.',
                'terminal': '**Terminal Module Namespace**\n\nHandles workspace output display routing debugging tracking serializations updates print operations diagnostic indicators clears frameworks.',
                'list': '**List Module Namespace**\n\nHandles running local database array indexing structures elements collections length parameters modifications data entries storage sets allocations paths references blocks items updates management structures.',
                'sound': '**Sound Module Namespace**\n\nHandles playback management adjustments audio balance mixing levels frequency filters transformations channel routing resources setups triggers assets tracks properties fields.'
            };

            if (moduleNameFallbacks[hoveredWord]) {
                return new vscode.Hover(new vscode.MarkdownString(moduleNameFallbacks[hoveredWord]));
            }

            return null;
        }
    });

    context.subscriptions.push(docFormatter, rangeFormatter, hoverProvider);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
