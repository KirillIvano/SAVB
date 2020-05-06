import json
def get_button(label, color, payload=""):
    return {
        "action": {
            "type": "text",
            "payload": json.dumps(payload),
            "label": label
        },
        "color": color,
    }
keyboard = {
    "one_time": False,
    "buttons":
    [
    ]
}
keyboard['buttons'].append([get_button(label="positive color", color="positive")])
keyboard['buttons'].append([get_button(label="negative color", color="negative")])
keyboard['buttons'].append([get_button(label="default color", color="default")])
keyboard['buttons'].append([get_button(label="primary color", color="primary")])

keyboard = json.dumps(keyboard, ensure_ascii=False).encode('utf-8')
keyboard = str(keyboard.decode('utf-8'))