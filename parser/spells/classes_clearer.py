import json

file = open('spells.json', mode='r', encoding='utf-8')

spells = json.load(file)

new_spells = []

for spell in spells:
    spell['classes'] = spell['classes'].replace('TCE', '').split(', ')
    new_spells.append(spell)

open('spells.json', mode='w', encoding='utf-8').write(json.dumps(new_spells, ensure_ascii=False, indent=4))