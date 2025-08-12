from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json

driver = webdriver.Chrome()

spells = []

def getDescription(body):
    if body[6].text.startswith('Подклассы'):
        return body[7].find_elements(By.XPATH, './*')[0].text
    return body[6].text

def getLvl(value):
    if value == 'Заговор,': return value[:-1]
    return int(value)

id = 0
while True:
    id += 1
    try:
        driver.get('https://dnd.su/spells/' + str(id) + '/')
        time.sleep(3)
        body = driver.find_element(By.CSS_SELECTOR, '.params.card__article-body').find_elements(By.XPATH, './*')
        spell = {
            'name': driver.find_element(By.CLASS_NAME, 'card-title').find_elements(By.XPATH, './*')[0].text.split(' [')[0],
            'lvl': getLvl(body[0].text.split(' ')[0]),
            'time': body[1].text.split(': ')[1],
            'components': body[3].text.split(': ')[1].split(', '),
            'duration': body[4].text.split(': ')[1],
            'classes': body[5].text.split(': ')[1],
            'description': getDescription(body)
        }
        spells.append(spell)
    except Exception as err:
        print(err)
        break
open('spells.json', mode='w', encoding='utf-8').write(json.dumps(spells, ensure_ascii=False, indent=4))