# Примерное описание требуемого API

## Разделы
* [Авторизация](#авторизация)
* [Группы](#группы)
* [Боты](#боты)
* [Сообщения](#сообщения)

## Авторизация

### Cookies 
```
refreshToken: jwt(userId, csrf, exp)
accessToken: jwt(userId, exp)
```

### `POST /api/auth/login`
#### Request
Логиним с помощью вк и вытаскиваем свежий токен
```
    {
        code: string;
        redirectUri: string;
    }
```
#### Response
```
    cookies: {
        refreshJwt: string;
        acessJwt: string;
    },
    body: {
        data: {
            accessJwt: string;
            csrf: string;
            userId: string;
        }
    }
```

### `POST /api/auth/refreshTokens`
#### Request
Обновляем токены
```
    cookies: {
        refreshJwt: string;
        acessJwt: string;
    },
    body: {
        csrf: string;   
    }
```
#### Response
```
    cookies: {
        refreshJwt: string;
        acessJwt: string;
    },
    body: {
        data {
            accessJwt: string;
            csrf: string;
        }   
    }
```

## Группы

### Сущность 
```
    Group: {
        name: string;
        id: number;
        image: string;
        isUsed: boolean; // создан ли уже бот для этой группы
    }
```

### `GET /api/groups`

Получает все группы, админом которых является юзер
#### Response
```
{
    data {
        groups: [Group]
    }
}
```

### `POST /api/group/createBot`

Создаёт бота на группе (получает токен, создаёт колбэк сервер с дефолтным ответом на стартовое сообщение)

#### Request
```
    body: {
        code: string;
        redirectUri: string;
    }
```

#### Response
```
{}
```

## Боты

### Сущность
```
    Group: {
        id: number;
        name: string;
        image: string;
        membersCount: number
    }
```

### `GET /api/bots`

Получает всех ботов, админом которых является юзер
#### Request
#### Response
```
{
    data {
        bots: [Bot]
    }
}
```

### `GET /api/bot/:botId`
Получает всех ботов, админом которых является юзер
#### Request
#### Response
```
{
    data {
        bot: Bot
    }
}
```

## Сообщения

### Сущности
 ```
    MessagePreview: {
        id: number;
        botId: number;
        name: string;
    }
```
```
    Message: {
        id: number;
        botId: number;
        name: string;
        text: string;
    }
```

```
    Trigger: {
        id: number;
        sourceMessageId: number;
        targetMessageId: number;
        triggerType: 'button' | 'plain_message'; // тип плиз сделай как тебе удобнее, только поправь тут потом, плез
    }
```

### `GET /api/message/full?messageId=<number>`

Получает основное сообщение и связаные с ним

#### Response
```
{
    data {
        message: Message, // начальное сообщение
        connectedMessages: [MessagePreview], // можешь слать сразу пустой пока что, только todo сделай плиз
        triggers: [Trigger] // триггеры присылаем всё равно, просто они все обратно в нулевой стэйт ведут, тоже можно пустыми
    }
}
```

### `POST /api/message`
#### Request
Создаёт новое сообщение
```
{
    {
        name: string;
        text: string;
        botId: number;
    }
}
```
#### Response
```
{
    data {
        message: Message;
    }
}
```

### `PUT /api/message`
#### Request
Апдейтит сообщение и возвращает изменённое
```
{
    {
        name?: string; // ? - опционально
        text?: string;
    }
}
```
#### Response
```
{
    data {
        message: Message;
    }
}
```

### `GET /api/message/byBot?botId=<number>`

Получает все сообщения для бота

#### Response
```
{
    data {
        messages: [MessagePreview],
        startId: number // id стартового сообщения
    }
}
```

## Пользователь

### `GET /api/user/info`
#### Response
```
   data: {
        userId: number,
        name: string;
        image: string;
   } 
```

