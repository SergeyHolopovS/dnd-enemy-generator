import json

file = open('spells.json', encoding='utf-8', mode='r')

spells = json.load(file)

for lvl in range(10):
    spellList = list(filter(lambda spell: spell['lvl'] == (lvl if lvl > 0 else 'Заговор'), spells))
    open('./lvl/spells_' + str(lvl) + 'lvl.json', mode='w', encoding='utf-8').write(json.dumps(spellList, ensure_ascii=False, indent=4))
    
print('End')