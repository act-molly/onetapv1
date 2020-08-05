var x = 100;
var y = 100;
var width = 520;
var height = 640;
var indropdown = false;

var legittab = false;
var ragetab = false;
var antiaimtab = false;
var visualstab = false;
var misctab = false;

l_enable = false;
l_reactiontime = [0, 0];
l_triggerbot_enable = false;
l_triggerbot_magnet = false;
l_triggerbot_hitchance = [0, 0];

var controls_checkbox = false;
var controls_slider = [0, 0];
var controls_array_opened = false;
var controls_array_selectedoption = 1;
var controls_array = ["option 1", "option 2", "option 3"];
var controls_multiarray_opened = false;
var controls_multiarray_selectedoptions = [];
var controls_multiarray = ["lorum ipsum", "dolor sit", "consectetur adipiscing", "sed do", "eiusmod tempor", "reprehenderit in"];
var controls_keybind = 0x01;

var globaltime = Globals.Realtime();

var keyNames = ["KEY_Z", "KEY_Y", "KEY_X", "KEY_W", "KEY_V", "KEY_U", "KEY_T", "KEY_S", "KEY_R", "KEY_Q", "KEY_P", "KEY_O", "KEY_N", "KEY_M", "KEY_L", "KEY_K", "KEY_J", "KEY_F", "KEY_G", "KEY_H", "KEY_I", "KEY_E", "KEY_D", "KEY_C", "KEY_B", "KEY_A", "NUM_9", "NUM_8", "NUM_7", "NUM_6", "NUM_5", "NUM_4", "NUM_3", "NUM_2", "NUM_1", "NUM_0", "VK_DELETE", "VK_INSERT", "VK_DOWN", "VK_RIGHT", "VK_UP", "VK_LEFT", "VK_HOME", "VK_SPACE", "VK_LBUTTON", "VK_RBUTTON", "VK_MBUTTON", "VK_XBUTTON1", "VK_XBUTTON2", "VK_BACK", "VK_TAB", "VK_RETURN", "VK_SHIFT", "VK_CONTROL", "VK_MENU", "VK_CAPITAL", "VK_ESCAPE"];
var keyCodes = [0x5A, 0x59, 0x58, 0x57, 0x56, 0x55, 0x54, 0x53, 0x52, 0x51, 0x50, 0x4F, 0x4E, 0x4D, 0x4C, 0x4B, 0x4A, 0x46, 0x47, 0x48, 0x49, 0x45, 0x44, 0x43, 0x42, 0x41, 0x39, 0x38, 0x37, 0x36, 0x35, 0x34, 0x33, 0x32, 0x31, 0x30, 0x2E, 0x2D, 0x28, 0x27, 0x26, 0x25, 0x24, 0x20, 0x01, 0x02, 0x04, 0x05, 0x06, 0x08, 0x09, 0x0D, 0x10, 0x11, 0x12, 0x14, 0x1B];

function create_string(x, y, aligned, string, col) {
    var font = Render.AddFont("Small Fonts", 7, 300);
    Render.StringCustom(x - 1, y, aligned, string, [0, 0, 0, 255], font);
    Render.StringCustom(x + 1, y, aligned, string, [0, 0, 0, 255], font);
    Render.StringCustom(x, y - 1, aligned, string, [0, 0, 0, 255], font);
    Render.StringCustom(x, y + 1, aligned, string, [0, 0, 0, 255], font);
    Render.StringCustom(x, y, aligned, string, col, font);
}

function create_menu(x, y, width, height) {
    Render.FilledRect(x, y, width, height, [20, 20, 20, 150]);
    Render.FilledRect(x + 7, y + 7, width - 14, height - 14, [0, 0, 0, 200]);
    Render.Rect(x, y, width, height, [20, 20, 20, 200]);
    Render.Rect(x + 7, y + 7, width - 14, height - 14, [20, 20, 20, 150]);
    Render.FilledRect(x + 20, y + 36, width - 40, height - 55, [3, 3, 3, 255]);
    Render.Rect(x + 20, y + 36, width - 40, height - 55, [40, 40, 40, 255]);
}

function create_tab(text, x, y, tab) {
    var curPos = Input.GetCursorPosition();
    var curx = curPos[0];
    var cury = curPos[1];
    var clicked = false;

    if (tab) {
        Render.FilledRect(x, y + 14, 56, 2, [245, 200, 100, 255]);
        Render.FilledRect(x, y + 16, 56, 2, [170, 120, 20, 255]);
        create_string(x + 28, y, 1, text, [180, 180, 180, 255]);
    } else {
        Render.FilledRect(x, y + 14, 56, 2, [65, 65, 65, 255]);
        Render.FilledRect(x, y + 16, 56, 2, [40, 40, 40, 255]);
        create_string(x + 28, y, 1, text, [180, 180, 180, 255]);
    }

    if (curx > x && curx < x + 56 && cury > y && cury < y + 18 && !tab && !indropdown) {
        create_string(x + 28, y, 1, text, [170, 170, 170, 255]);
        Render.FilledRect(x, y + 14, 56, 2, [85, 85, 85, 255]);
        Render.FilledRect(x, y + 16, 56, 2, [60, 60, 60, 255]);
        if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2) {
            globaltime = Globals.Realtime();
            clicked = true;
        }
    }

    return clicked;
}

function create_group(title, x, y, height) {
    create_string(x + 10, y - 5, 0, title, [255, 255, 255, 255]);
    var font = Render.AddFont("Small Fonts", 7, 300);
    var textsizex = Render.TextSizeCustom(title, font)[0];
    Render.Line(x, y, x + 5, y, [40, 40, 40, 255]);
    Render.Line(x + textsizex + 15, y, x + 210, y, [40, 40, 40, 255]);
    Render.Line(x + 210, y, x + 210, y + height, [40, 40, 40, 255]);
    Render.Line(x + 210, y + height, x, y + height, [40, 40, 40, 255]);
    Render.Line(x, y + height, x, y, [40, 40, 40, 255]);
    return true;
}

function create_checkbox(title, x, y, item) {
    var curPos = Input.GetCursorPosition();
    var curx = curPos[0];
    var cury = curPos[1];
    var clicked = item;

    if (item) {
        Render.GradientRect(x, y, 8, 8, 0, [245, 197, 99, 255], [171, 122, 17, 255]);
        Render.Rect(x, y, 8, 8, [0, 0, 0, 255]);
    } else {
        Render.FilledRect(x, y, 8, 8, [60, 60, 60, 255]);
        Render.Rect(x, y, 8, 8, [0, 0, 0, 255]);
    }
    create_string(x + 15, y - 2, 0, title, [255, 255, 255, 255]);
    var font = Render.AddFont("Small Font", 7, 300);
    var textsizex = Render.TextSizeCustom(title, font)[0];

    if (curx > x && curx < x + 15 + textsizex && cury > y && cury < y + 10 && !indropdown) {
        if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2) {
            globaltime = Globals.Realtime();
            clicked = !item;
        }
    }

    return clicked;
}

function create_slider(title, x, y, min, max, value, type) {
    var curPos = Input.GetCursorPosition();
    var curx = curPos[0];
    var cury = curPos[1];
    var relval = Math.round(value * ((max - min) / 170) + min);
    var stringvalue = 0;

    create_string(x, y, 0, title, [255, 255, 255, 255]);
    Render.GradientRect(x, y + 12, 170, 8, 0, [60, 60, 60, 255], [40, 40, 40, 255]);
    Render.GradientRect(x, y + 12, value, 8, 0, [245, 197, 99, 255], [171, 122, 17, 255]);
    Render.Rect(x, y + 12, 170, 8, [0, 0, 0, 255]);

    if (curx > x - 1 && curx < x + 171 && cury > y + 10 && cury < y + 22 && !indropdown) {
        if (Input.IsKeyPressed(0x01)) {
            value = curx - x;
            relval = Math.round(value * ((max - min) / 170) + min);
            stringvalue = 25;
        }
    }
    var font = Render.AddFont("Small Font", 7, 300);
    var textsizex = Render.TextSizeCustom(relval + "", font)[0] / 2;
    create_string(x + value + stringvalue - textsizex, y + 20, 0, relval + type, [255, 255, 255, 255]);

    var valueArray = new Array(2);
    valueArray[0] = relval;
    valueArray[1] = value;
    return valueArray;
}

function create_dropdown(title, x, y, array, opened, selectedoption) {
    var curPos = Input.GetCursorPosition();
    var curx = curPos[0];
    var cury = curPos[1];

    create_string(x, y, 0, title, [255, 255, 255, 255]);
    Render.FilledRect(x, y + 12, 170, 20, [51, 51, 51, 255]);
    Render.Rect(x, y + 12, 170, 20, [0, 0, 0, 255]);
    create_string(x + 5, y + 16, 0, array[selectedoption], [150, 150, 150, 255]);
    Render.Polygon([[x + 155, y + 20], [x + 165, y + 20], [x + 160, y + 25]], [150, 150, 150, 255]);

    if (curx > x && curx < x + 170 && cury > y + 12 && cury < y + 32) {
        Render.Polygon([[x + 155, y + 20], [x + 165, y + 20], [x + 160, y + 25]], [245, 197, 99, 255]);
        if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2) {
            globaltime = Globals.Realtime();
            return "closed";
        }
    }

    if (opened) {
        indropdown = true;
        Render.FilledRect(x, y + 35, 170, array.length * 17 + 3, [51, 51, 51, 255]);
        Render.Rect(x, y + 35, 170, array.length * 17 + 3, [0, 0, 0, 255]);
        for (i = 0; i < array.length; i++) {
            create_string(x + 5, y + 40 + (16 * i), 0, array[i], [255, 255, 255, 255]);
            if (curx > x && curx < x + 170 && cury > y + 40 + (16 * i) && cury < y + 40 + (16 * i) + 15) {
                create_string(x + 5, y + 40 + (16 * i), 0, array[i], [245, 197, 99, 255]);
                if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2) {
                    globaltime = Globals.Realtime();
                    return i;
                }
            }
        }
    } else {
        indropdown = false;
    }

    if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2 && opened) {
        globaltime = Globals.Realtime();
        if (curx < x || curx > x + 170 || cury < y + 35 || cury > y + 35 + array.length * 17 + 3) {
            return "closed";
        }
    }
}

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function create_multidropdown(title, x, y, array, opened, selectedoptions) {
    var curPos = Input.GetCursorPosition();
    var curx = curPos[0];
    var cury = curPos[1];
    var displayValue = "";
    var clicked = false;
    var needclosed = false;

    create_string(x, y, 0, title, [255, 255, 255, 255]);
    Render.FilledRect(x, y + 12, 170, 20, [51, 51, 51, 255]);
    Render.Rect(x, y + 12, 170, 20, [0, 0, 0, 255]);
    for (i = 0; i < array.length; i++) {
        if (selectedoptions.contains(i)) {
            displayValue += array[i] + ", ";
        }
    }
    displayValue = displayValue.substring(0, displayValue.length - 2);
    var font = Render.AddFont("Small Fonts", 7, 300);
    var displaysizex = Render.TextSizeCustom(displayValue, font)[0];
    var keepvalue = -1;
    if (displaysizex > 160) {
        for (i = 0; i < selectedoptions.length; i++) {
            if (selectedoptions[i] != undefined && keepvalue == -1) {
                keepvalue = i;
            }
        }
        displayValue = array[selectedoptions[keepvalue]] + ", ...";
    }
    if (displayValue == "")
        displayValue = "none";
    create_string(x + 5, y + 16, 0, displayValue, [150, 150, 150, 255]);
    var text_col = [150, 150, 150, 255];
    Render.Polygon([[x + 155, y + 20], [x + 165, y + 20], [x + 160, y + 25]], [150, 150, 150, 255]);

    if (curx > x && curx < x + 170 && cury > y + 12 && cury < y + 32) {
        Render.Polygon([[x + 155, y + 20], [x + 165, y + 20], [x + 160, y + 25]], [245, 197, 99, 255]);
        text_col = [245, 197, 99, 255];
        if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2) {
            globaltime = Globals.Realtime();
            needclosed = true;
        }
    }

    Render.FilledRect(x + 160, y + 20, 5, 2, [51, 51, 51, 255]);
    Render.Line(x + 161, y + 16, x + 164, y + 16, text_col);
    Render.Line(x + 164, y + 16, x + 164, y + 18, text_col);
    Render.Line(x + 164, y + 18, x + 161, y + 18, text_col);
    Render.Line(x + 161, y + 18, x + 161, y + 20, text_col);
    Render.Line(x + 161, y + 20, x + 164, y + 20, text_col);

    if (needclosed)
        return "closed";

    if (opened) {
        indropdown = true;
        Render.FilledRect(x, y + 35, 170, array.length * 17 + 3, [51, 51, 51, 255]);
        Render.Rect(x, y + 35, 170, array.length * 17 + 3, [0, 0, 0, 255]);
        for (i = 0; i < array.length; i++) {
            if (selectedoptions.contains(i)) {
                create_string(x + 5, y + 40 + (16 * i), 0, array[i], [245, 197, 99, 255]);
            } else {
                create_string(x + 5, y + 40 + (16 * i), 0, array[i], [255, 255, 255, 255]);
            }
            if (curx > x && curx < x + 170 && cury > y + 40 + (16 * i) && cury < y + 40 + (16 * i) + 15) {
                create_string(x + 5, y + 40 + (16 * i), 0, array[i], [245, 197, 99, 255]);
                if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2) {
                    globaltime = Globals.Realtime();
                    if (selectedoptions.contains(i)) {
                        delete selectedoptions[i];
                    } else {
                        selectedoptions[i] = i;
                    }
                    clicked = true;
                }
            }
        }
        if (clicked)
            return selectedoptions;
    } else {
        indropdown = false;
    }

    if (Input.IsKeyPressed(0x01) && Globals.Realtime() > globaltime + 0.2 && opened) {
        globaltime = Globals.Realtime();
        if (curx < x || curx > x + 170 || cury < y + 35 || cury > y + 35 + array.length * 17 + 3) {
            return "closed";
        }
    }

}

function inbox(curx, minx, maxx, cury, miny, minx) {
    if (curx > minx && curx < maxx && cury > miny && cury < minx && !indropdown)
        return true;
}

function create_keybind(title, x, y, key) {
    var curPos = Input.GetCursorPosition();
    var curx = curPos[0];
    var cury = curPos[1];
    var displayKey = "";
    var displayAlpha = 150;
    for (i = 0; i < keyCodes.length; i++) {
        if (keyCodes[i] == key) {
            displayKey = keyNames[i];
        }
    }

    create_string(x, y, 0, title, [255, 255, 255, 255]);
    Render.FilledRect(x, y + 12, 170, 20, [51, 51, 51, 255]);
    Render.Rect(x, y + 12, 170, 20, [0, 0, 0, 255]);

    if (inbox(curx, x, x + 170, cury, y + 12, y + 32)) {
        displayAlpha = 230;
        for (i = 0; i < keyCodes.length; i++) {
            if (Input.IsKeyPressed(keyCodes[i]) && Globals.Realtime() > globaltime + 0.2) {
                globaltime = Globals.Realtime();
                key = keyCodes[i];
            }
        }
    }

    create_string(x + 5, y + 16, 0, displayKey, [255, 255, 255, displayAlpha]);


    return key;
}

function cleartabs() {
    legittab = false;
    ragetab = false;
    antiaimtab = false
    visualstab = false;
    misctab = false;
}

function main() {
    setupoptions();
    create_menu(x, y, width, height);
    var sx = x + 40;
    var sy = y + 55;
    var font = Render.AddFont("Proxima Nova Bold", 10, 900);
    var mTitle = __filename;
    Render.StringCustom(x + 40, y + 14, 0, mTitle, [255, 255, 255, 100], font);
    if (create_tab("spacex", x + 180, y + 15, legittab)) {
        cleartabs();
        legittab = !legittab;
    }
    if (create_tab("rage", x + 180 + 66, y + 15, ragetab)) {
        cleartabs();
        ragetab = !ragetab;
    }
    if (create_tab("anti-aim", x + 180 + 66 * 2, y + 15, antiaimtab)) {
        cleartabs();
        antiaimtab = !antiaimtab;
    }
    if (create_tab("visuals", x + 180 + 66 * 3, y + 15, visualstab)) {
        cleartabs();
        visualstab = !visualstab;
    }
    if (create_tab("misc", x + 180 + 66 * 4, y + 15, misctab)) {
        cleartabs();
        misctab = !misctab;
    }

    if (legittab) {
        if (create_group("general", sx, sy, 80)) {
            l_enable = create_checkbox("enable", sx + 20, sy + 20, l_enable);
            l_reactiontime = create_slider("reaction time", sx + 20, sy + 35, 0, 400, l_reactiontime[1], "ms");
        }
        if (create_group("triggerbot", sx, sy + 100, 97)) {
            ay = sy + 80 + 20;
            l_triggerbot_enable = create_checkbox("enable", sx + 20, ay + 20, l_triggerbot_enable);
            l_triggerbot_magnet = create_checkbox("magnet", sx + 20, ay + 35, l_triggerbot_magnet);
            l_triggerbot_hitchance = create_slider("hitchance", sx + 20, ay + 50, 0, 100, l_triggerbot_hitchance[1], "");
        }
        if (create_group("controls", sx + 230, sy, 197)) {
            ax = sx + 250;
            controls_checkbox = create_checkbox("checkbox", ax, sy + 20, controls_checkbox);
            controls_slider = create_slider("slider", ax, sy + 35, -100, 100, controls_slider[1], "hp");
            controls_keybind = create_keybind("keybind", ax, sy + 110, controls_keybind);

            var dropdown = create_dropdown("dropdown", ax, sy + 70, controls_array, controls_array_opened, controls_array_selectedoption);
            if (dropdown != undefined) {
                if (dropdown == "closed") {
                    controls_array_opened = !controls_array_opened;
                } else {
                    controls_array_selectedoption = dropdown;
                    controls_array_opened = !controls_array_opened;
                }
            }

            var multidropdown = create_multidropdown("multidropdown", ax, sy + 150, controls_multiarray, controls_multiarray_opened, controls_multiarray_selectedoptions);
            if (multidropdown != undefined) {
                if (multidropdown == "closed") {
                    controls_multiarray_opened = !controls_multiarray_opened;
                } else {
                    controls_multiarray_selectedoptions = multidropdown;
                }
            }
        }
    }

    checkoptions();
}

function setupoptions() {
    l_enable = UI.GetValue("Legit", "GENERAL", "General", "Enabled");
    l_triggerbot_enable = UI.GetValue("Legit", "GENERAL", "Triggerbot", "Enabled");
    l_triggerbot_magnet = UI.GetValue("Legit", "GENERAL", "Triggerbot", "Magnet");
}

function checkoptions() {
    UI.SetValue("Legit", "GENERAL", "General", "Enabled", l_enable);
    UI.SetValue("Legit", "GENERAL", "General", "Reaction time", l_reactiontime[0]);
    UI.SetValue("Legit", "GENERAL", "Triggerbot", "Enabled", l_triggerbot_enable);
    UI.SetValue("Legit", "GENERAL", "Triggerbot", "Magnet", l_triggerbot_magnet);
    UI.SetValue("Legit", "GENERAL", "Triggerbot", "Hitchance", l_triggerbot_hitchance[0]);
}

Cheat.RegisterCallback("Draw", "main");