export interface Lesson {
  id: number;
  title: string;
  description: string;
  instruction: string;
  expectedKey: string;
  baseTime: number; 
}

export interface Topic {
  id: number;
  title: string;
  lessons: Lesson[];
}

export const topics: Topic[] = [
  {
    id: 1,
    title: "1. Переменные и Типы",
    lessons: [
      { id: 1, title: "Hello Python", description: "Вывод текста.", instruction: "print('Hello')", expectedKey: "print('Hello')", baseTime: 20 },
      { id: 2, title: "Числа", description: "Целые числа (int).", instruction: "x = 5", expectedKey: "x=5", baseTime: 20 },
      { id: 3, title: "Строки", description: "Текстовые данные.", instruction: "name = 'Egor'", expectedKey: "name='Egor'", baseTime: 25 },
      { id: 4, title: "Дробные числа", description: "Тип float.", instruction: "pi = 3.14", expectedKey: "pi=3.14", baseTime: 25 },
      { id: 5, title: "Сложение", description: "Складываем переменные.", instruction: "a = 2 + 2", expectedKey: "a=4", baseTime: 30 },
      { id: 6, title: "Тип Boolean", description: "Истина или ложь.", instruction: "is_active = True", expectedKey: "is_active=True", baseTime: 20 },
      { id: 7, title: "Конкатенация", description: "Склеивание строк.", instruction: "s = 'a' + 'b'", expectedKey: "s='ab'", baseTime: 35 },
      { id: 8, title: "Ввод данных", description: "Функция input.", instruction: "val = input()", expectedKey: "input()", baseTime: 40 },
      { id: 9, title: "Длина строки", description: "Функция len().", instruction: "l = len('hi')", expectedKey: "l=2", baseTime: 30 },
      { id: 10, title: "Комментарии", description: "Игнорируемый код.", instruction: "# Это коммент", expectedKey: "#", baseTime: 15 },
    ]
  },
  {
    id: 2,
    title: "2. Математика",
    lessons: [
      { id: 1, title: "Умножение", description: "Знак *", instruction: "res = 5 * 5", expectedKey: "res=25", baseTime: 20 },
      { id: 2, title: "Деление", description: "Знак /", instruction: "d = 10 / 2", expectedKey: "d=5", baseTime: 20 },
      { id: 3, title: "Степень", description: "Знак **", instruction: "p = 2 ** 3", expectedKey: "p=8", baseTime: 25 },
      { id: 4, title: "Целое деление", description: "Знак //", instruction: "c = 7 // 2", expectedKey: "c=3", baseTime: 30 },
      { id: 5, title: "Остаток", description: "Знак %", instruction: "m = 7 % 2", expectedKey: "m=1", baseTime: 30 },
      { id: 6, title: "Абсолютное значение", description: "abs()", instruction: "a = abs(-5)", expectedKey: "a=5", baseTime: 25 },
      { id: 7, title: "Округление", description: "round()", instruction: "r = round(3.6)", expectedKey: "r=4", baseTime: 25 },
      { id: 8, title: "Приоритет", description: "Скобки в макс.", instruction: "x = (2+2)*2", expectedKey: "x=8", baseTime: 30 },
      { id: 9, title: "Инкремент", description: "+=", instruction: "x = 1; x += 2", expectedKey: "x=3", baseTime: 35 },
      { id: 10, title: "Сложная формула", description: "Расчет", instruction: "f = 10 * 2 + 5", expectedKey: "f=25", baseTime: 40 },
    ]
  },
  {
    id: 3,
    title: "3. Списки (Lists)",
    lessons: [
      { id: 1, title: "Создание списка", description: "Квадратные скобки.", instruction: "my_list = [1, 2]", expectedKey: "[1,2]", baseTime: 30 },
      { id: 2, title: "Доступ по индексу", description: "Начинается с 0.", instruction: "x = my_list[0]", expectedKey: "[0]", baseTime: 30 },
      { id: 3, title: "Метод append", description: "Добавить в конец.", instruction: "my_list.append(3)", expectedKey: ".append(3)", baseTime: 35 },
      { id: 4, title: "Длина списка", description: "len()", instruction: "len(my_list)", expectedKey: "len(", baseTime: 25 },
      { id: 5, title: "Удаление", description: "remove()", instruction: "my_list.remove(1)", expectedKey: ".remove(1)", baseTime: 40 },
      { id: 6, title: "Срез (Slice)", description: "Копирование части.", instruction: "s = my_list[0:2]", expectedKey: "[0:2]", baseTime: 45 },
      { id: 7, title: "Сортировка", description: "sort()", instruction: "my_list.sort()", expectedKey: ".sort()", baseTime: 30 },
      { id: 8, title: "Разворот", description: "reverse()", instruction: "my_list.reverse()", expectedKey: ".reverse()", baseTime: 30 },
      { id: 9, title: "Очистка", description: "clear()", instruction: "my_list.clear()", expectedKey: ".clear()", baseTime: 25 },
      { id: 10, title: "Вложенные списки", description: "Список в списке.", instruction: "nested = [[1]]", expectedKey: "[[1]]", baseTime: 50 },
    ]
  },
  {
    id: 4,
    title: "4. Условия (If/Else)",
    lessons: [
      { id: 1, title: "Простой if", description: "Проверка условия.", instruction: "if x > 0:", expectedKey: "if x > 0:", baseTime: 40 },
      { id: 2, title: "Else", description: "Альтернатива.", instruction: "else:", expectedKey: "else:", baseTime: 30 },
      { id: 3, title: "Elif", description: "Второе условие.", instruction: "elif x == 0:", expectedKey: "elif", baseTime: 45 },
      { id: 4, title: "And", description: "Логическое И.", instruction: "if a and b:", expectedKey: "and", baseTime: 40 },
      { id: 5, title: "Or", description: "Логическое ИЛИ.", instruction: "if a or b:", expectedKey: "or", baseTime: 40 },
      { id: 6, title: "Not", description: "Отрицание.", instruction: "if not x:", expectedKey: "not", baseTime: 35 },
      { id: 7, title: "Сравнение", description: "==", instruction: "if x == 10:", expectedKey: "==", baseTime: 30 },
      { id: 8, title: "Не равно", description: "!=", instruction: "if x != 0:", expectedKey: "!=", baseTime: 30 },
      { id: 9, title: "Вложенный if", description: "if внутри if.", instruction: "if a: if b:", expectedKey: "if", baseTime: 60 },
      { id: 10, title: "Ternary", description: "В одну строку.", instruction: "res = 1 if a else 0", expectedKey: "if", baseTime: 60 },
    ]
  },
  {
    id: 5,
    title: "5. Циклы For",
    lessons: [
      { id: 1, title: "Базовый For", description: "Цикл по списку.", instruction: "for i in my_list:", expectedKey: "for", baseTime: 40 },
      { id: 2, title: "Range(5)", description: "От 0 до 4.", instruction: "for i in range(5):", expectedKey: "range(5)", baseTime: 35 },
      { id: 3, title: "Range(start, stop)", description: "Диапазон.", instruction: "range(1, 10)", expectedKey: "range(1, 10)", baseTime: 40 },
      { id: 4, title: "Цикл по строке", description: "Буквы.", instruction: "for char in 'Hi':", expectedKey: "in", baseTime: 35 },
      { id: 5, title: "Break", description: "Выход из цикла.", instruction: "break", expectedKey: "break", baseTime: 30 },
      { id: 6, title: "Continue", description: "След. итерация.", instruction: "continue", expectedKey: "continue", baseTime: 30 },
      { id: 7, title: "Вложенный For", description: "Сетка.", instruction: "for x in for y", expectedKey: "for", baseTime: 70 },
      { id: 8, title: "Enumerate", description: "Индекс и значение.", instruction: "for i, v in enumerate(l):", expectedKey: "enumerate", baseTime: 60 },
      { id: 9, title: "Zip", description: "Параллельные циклы.", instruction: "zip(a, b)", expectedKey: "zip", baseTime: 60 },
      { id: 10, title: "Sum в цикле", description: "Накопление.", instruction: "s += i", expectedKey: "+=", baseTime: 50 },
    ]
  },
  {
    id: 6,
    title: "6. Циклы While",
    lessons: [
      { id: 1, title: "Базовый while", description: "Пока истинно.", instruction: "while x < 10:", expectedKey: "while", baseTime: 50 },
      { id: 2, title: "Бесконечный цикл", description: "True.", instruction: "while True:", expectedKey: "True", baseTime: 30 },
      { id: 3, title: "While Else", description: "Завершение.", instruction: "else:", expectedKey: "else", baseTime: 45 },
      { id: 4, title: "Счетчик", description: "i = 0", instruction: "i += 1", expectedKey: "+= 1", baseTime: 30 },
      { id: 5, title: "Условие выхода", description: "if break.", instruction: "if i == 5: break", expectedKey: "break", baseTime: 50 },
      { id: 6, title: "Флаг", description: "is_running.", instruction: "while is_running:", expectedKey: "while", baseTime: 40 },
      { id: 7, title: "Ввод до стоп", description: "input.", instruction: "while s != 'stop':", expectedKey: "input", baseTime: 70 },
      { id: 8, title: "Сложный while", description: "and/or.", instruction: "while a and b:", expectedKey: "and", baseTime: 50 },
      { id: 9, title: "Поиск в списке", description: "pop().", instruction: "while my_list:", expectedKey: "pop", baseTime: 60 },
      { id: 10, title: "Математика в while", description: "Деление.", instruction: "while x > 0: x //= 2", expectedKey: "//=", baseTime: 60 },
    ]
  },
  {
    id: 7,
    title: "7. Функции (def)",
    lessons: [
      { id: 1, title: "Создание функции", description: "def имя():", instruction: "def start():", expectedKey: "def", baseTime: 40 },
      { id: 2, title: "Вызов функции", description: "По имени.", instruction: "start()", expectedKey: "()", baseTime: 20 },
      { id: 3, title: "Аргументы", description: "В скобках.", instruction: "def say(msg):", expectedKey: "(msg)", baseTime: 45 },
      { id: 4, title: "Return", description: "Возврат значения.", instruction: "return result", expectedKey: "return", baseTime: 40 },
      { id: 5, title: "Default value", description: "Значение по умолчанию.", instruction: "def f(a=1):", expectedKey: "a=1", baseTime: 50 },
      { id: 6, title: "Args", description: "Список аргументов.", instruction: "*args", expectedKey: "*args", baseTime: 60 },
      { id: 7, title: "Kwargs", description: "Словарь аргументов.", instruction: "**kwargs", expectedKey: "**kwargs", baseTime: 60 },
      { id: 8, title: "Lambda", description: "Анонимная функция.", instruction: "lambda x: x*2", expectedKey: "lambda", baseTime: 50 },
      { id: 9, title: "Docstring", description: "Описание.", instruction: "'''Help'''", expectedKey: "'''", baseTime: 40 },
      { id: 10, title: "Рекурсия", description: "Вызов себя.", instruction: "return f()", expectedKey: "return", baseTime: 90 },
    ]
  },
  {
    id: 8,
    title: "8. Словари (Dict)",
    lessons: [
      { id: 1, title: "Создание словаря", description: "Фигурные скобки.", instruction: "d = {'a': 1}", expectedKey: "{'a':1}", baseTime: 50 },
      { id: 2, title: "Доступ к ключу", description: "По имени.", instruction: "val = d['a']", expectedKey: "['a']", baseTime: 30 },
      { id: 3, title: "Метод get()", description: "Безопасный доступ.", instruction: "d.get('a')", expectedKey: ".get(", baseTime: 40 },
      { id: 4, title: "Добавление", description: "Новый ключ.", instruction: "d['b'] = 2", expectedKey: "['b']=2", baseTime: 35 },
      { id: 5, title: "Keys()", description: "Все ключи.", instruction: "d.keys()", expectedKey: ".keys()", baseTime: 30 },
      { id: 6, title: "Values()", description: "Все значения.", instruction: "d.values()", expectedKey: ".values()", baseTime: 30 },
      { id: 7, title: "Items()", description: "Пары.", instruction: "d.items()", expectedKey: ".items()", baseTime: 40 },
      { id: 8, title: "Pop()", description: "Удаление ключа.", instruction: "d.pop('a')", expectedKey: ".pop(", baseTime: 40 },
      { id: 9, title: "Update()", description: "Объединение.", instruction: "d.update(new)", expectedKey: ".update(", baseTime: 50 },
      { id: 10, title: "Dictionary Comprehension", description: "Сборка.", instruction: "{x: x for x in l}", expectedKey: "{x:", baseTime: 80 },
    ]
  },
  {
    id: 9,
    title: "9. Множества (Sets)",
    lessons: [
      { id: 1, title: "Создание set", description: "Уникальные элементы.", instruction: "s = {1, 2, 3}", expectedKey: "{1,2,3}", baseTime: 40 },
      { id: 2, title: "Add", description: "Добавить.", instruction: "s.add(4)", expectedKey: ".add(4)", baseTime: 30 },
      { id: 3, title: "Intersection", description: "Пересечение.", instruction: "s1 & s2", expectedKey: "&", baseTime: 45 },
      { id: 4, title: "Union", description: "Объединение.", instruction: "s1 | s2", expectedKey: "|", baseTime: 45 },
      { id: 5, title: "Difference", description: "Разность.", instruction: "s1 - s2", expectedKey: "-", baseTime: 45 },
      { id: 6, title: "Remove vs Discard", description: "Удаление.", instruction: "s.remove(1)", expectedKey: "remove", baseTime: 40 },
      { id: 7, title: "Issubset", description: "Подмножество.", instruction: "s1.issubset(s2)", expectedKey: "issubset", baseTime: 50 },
      { id: 8, title: "Frozenset", description: "Неизменяемое.", instruction: "frozenset([1])", expectedKey: "frozenset", baseTime: 50 },
      { id: 9, title: "Очистка множества", description: "clear.", instruction: "s.clear()", expectedKey: "clear", baseTime: 25 },
      { id: 10, title: "Set из списка", description: "Удаление дублей.", instruction: "set([1,1,2])", expectedKey: "set(", baseTime: 40 },
    ]
  },
  {
    id: 10,
    title: "10. Модули и Ошибки",
    lessons: [
      { id: 1, title: "Импорт", description: "import math", instruction: "import math", expectedKey: "import math", baseTime: 30 },
      { id: 2, title: "From Import", description: "Часть модуля.", instruction: "from math import pi", expectedKey: "import pi", baseTime: 40 },
      { id: 3, title: "Try/Except", description: "Ловим ошибки.", instruction: "try:", expectedKey: "try:", baseTime: 50 },
      { id: 4, title: "Except ZeroDivisionError", description: "Деление на 0.", instruction: "except ZeroDivisionError:", expectedKey: "ZeroDivisionError", baseTime: 50 },
      { id: 5, title: "Finally", description: "Всегда в конце.", instruction: "finally:", expectedKey: "finally:", baseTime: 40 },
      { id: 6, title: "Raise", description: "Своя ошибка.", instruction: "raise Exception()", expectedKey: "raise", baseTime: 50 },
      { id: 7, title: "Random", description: "Рандом.", instruction: "import random", expectedKey: "random", baseTime: 30 },
      { id: 8, title: "Time sleep", description: "Пауза.", instruction: "time.sleep(1)", expectedKey: "sleep(1)", baseTime: 40 },
      { id: 9, title: "Datatime", description: "Текущая дата.", instruction: "datetime.now()", expectedKey: "now()", baseTime: 50 },
      { id: 10, title: "As alias", description: "Псевдоним.", instruction: "import pandas as pd", expectedKey: "as pd", baseTime: 40 },
    ]
  }
];