import json

file = open('spells.json', encoding='utf-8', mode='r')

spells = json.load(file)

classes = [
    'magisian',
    'bard',
    'druid',
    'priest',
    'inventor',
    'witch',
    'paladin',
    'pathfinder',
    'sorcerer'
]

classes_rus = [
    'волшебник', 
    'бард', 
    'друид', 
    'жрец', 
    'изобретатель', 
    'колдун', 
    'паладин', 
    'следопыт', 
    'чародей'
]

for index in range(9):
    spellList = list(filter(lambda spell: classes_rus[index] in spell['classes'], spells))
    open('./class/spells_' + str(classes[index]) + '.json', mode='w', encoding='utf-8').write(json.dumps(spellList, ensure_ascii=False, indent=4))
    
print('End')