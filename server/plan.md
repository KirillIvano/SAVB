# Примерное описание требуемого API

## Разделы
* [Авторизация](#авторизация)
* [Группы](#группы)
* [Боты](#боты)

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

`GET /api/group?userId=<string>`

Получает все группы, админом которых является юзер
#### Response
```
{
    data {
        groups: [Group]
    }
}
```

## Боты

### Request
`GET /api/group?userId=<string>`

Получает все группы, админом которых является юзер
#### Response
```
{
    data {
        bots: [{
            id: number;
            name: string;
            image: string;
            membersCount: number
        }]
    }
}
```

`POST /api/group/createBot`

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

## Пользователь

#### Request
`GET /api/user/info?userId=<string>`

#### Response
```
   data: {
        userId: number,
        name: string;
        image: string;
   } 
```

