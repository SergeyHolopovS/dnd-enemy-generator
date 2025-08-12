from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json

driver = webdriver.Chrome()

driver.get('https://dnd.su/spells/')

classesBtn = driver.find_elements(By.CLASS_NAME, 'if-wrapper__dropdown')
classesBtn[1].click()

time.sleep(3)

classes = driver.find_elements(By.CLASS_NAME, 'if-list__item')
classes = list(filter(lambda x: x.is_displayed(), classes))

names = [
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

for classIndex in range(len(classes)):
    if classIndex > 0: classes[classIndex-1].click()
    classEl = classes[classIndex]
    classEl.click()

    driver.execute_script("window.scrollBy(0, 10000);")
    time.sleep(0.5)

    driver.execute_script("window.scrollBy(0, 10000);")
    time.sleep(0.5)

    els = driver.find_elements(By.CLASS_NAME, 'cards_list__item')

    spells = []

    for el in els:
        spell = {
            'name': el.find_element(By.CLASS_NAME, 'cards_list__item-name').text,
            'lvl': int(el.find_element(By.CLASS_NAME, 'cards_list__item-prefix').text[1:-1]),
            'components': el.find_element(By.CLASS_NAME, 'cards_list__item-suffix').text.replace('.', '')
        }
        spells.append(spell)

    f = open(names[classIndex] + '.json', mode='w', encoding='utf-8').write(json.dumps(spells, ensure_ascii=False, indent=4))
    classIndex += 1