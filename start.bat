@echo off
set "dosyaAdi=node_modules"
title Dildo Yonetim Botu - Made By ProxyDev
:a
if exist "%dosyaAdi%" (
    color b
    node --max-old-space-size=4098 index.js
) else (
    echo Node Modules Bulunamadi! Yukleniyor...
    npm i
    cls
    color c
    node --max-old-space-size=4098 index.js
)
goto a