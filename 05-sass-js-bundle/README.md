# Sass, модули JS, Gulp

## Sass

Sass - это метаязык на основе CSS, предназначенный для увеличения уровня 
абстракции CSS-кода и упрощения файлов каскадных таблиц стилей.

    https://sass-lang.com/

Установка 

    npm install -g sass

Пример преобразования sass файла в css

    sass source/stylesheets/index.scss build/stylesheets/index.css

## Модули JS

Модуль - это файл, который может хранить набор функций для их импорта в
других файлах.

    https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Modules

Пример функции sayHi в файле sayHi.js

    // sayHi.js
    export function sayHi(user) {
        alert(`Hello, ${user}!`);
    }

Импорт функции sayHi из файла sayHi.js

    // main.js
    import {sayHi} from './sayHi.js';

    alert(sayHi); // function...
    sayHi('John'); // Hello, John!

## Gulp 

Gulp - таск-менеджер для автоматического выполнения часто используемых задач.

    https://gulpjs.com/

Установка

    npm install -g gulp-cli   

В качестве примера приведен файл gulpfile.js, в котором приведен пример
скриптов сборки js и sass-файлов.
