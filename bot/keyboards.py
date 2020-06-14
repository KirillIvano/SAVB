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
keyboard['buttons'].append([get_button(label="Positive color", color="positive")])
keyboard['buttons'].append([get_button(label="Negative color", color="negative")])
keyboard['buttons'].append([get_button(label="Default color", color="default")])
keyboard['buttons'].append([get_button(label="Primary color", color="primary")])

keyboard = json.dumps(keyboard, ensure_ascii=False)
keyboard = str(keyboard)