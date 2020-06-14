import json

def get_button(label, color, payload=""):

    return {

        "action": {
            "type": "text",
            "payload": json.dumps(payload),
            "label": label,
        },
        
        "color": color,
    }

def create_keyboard(buttons):

    keyboard = {
        "one_time": not buttons[0].inline,
        "buttons": [],
        "inline": buttons[0].inline
    }

    for button in buttons:
        keyboard['buttons'].append([get_button(label=button.text, color=button.color)])
            
    keyboard = json.dumps(keyboard, ensure_ascii=False)
    return keyboard