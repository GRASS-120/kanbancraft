# GIT

возможно я забыл какой-то момент, смотрите гайды если что

!!! **когда будете работать с гитом, делайте это из корневой папки, то есть не из kanbancraft_client или kanban_server, a из папки, где у вас весь проект**. пример: у меня это папка kanbancraft
![картинка](https://i.imgur.com/HwGofgA.png)

### если до этого не пушили и не пуллили:
```
git remote add origin https://github.com/GRASS-120/kanbancraft.git
```

### если хотите запушить изменения (ветка dev):
```
git add .
git commit -m "название коммита"
git branch -M dev
git push -u origin dev
```

### если хотите запулить изменения (**ДЕЛАТЬ ПЕРЕД КАЖДЫМ СЕАНСОМ НАПИСАНИЯ КОДА!**):
```
git branch -M dev
git pull
```

---

# FRONT-END

установите node js

для запуска проекта:
```
npm install
npm run start:dev
```

---

# BACK-END

рекомендую вместо pip очень использовать пакетный менеджер poetry (его нужно установить отдельно). он гораздо удобнее

для запуска проекта:
```
poetry shell
poetry install
poetry run start
```
