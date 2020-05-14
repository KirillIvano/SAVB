# Примерное описание требуемого API

## Разделы
* [Авторизация](#авторизация)
* [Группы](#группы)

## Авторизация

### `POST /api/auth/login`
#### Request
Логиним с помощью вк и вытаскиваем свежий токен
```js
    {
        code: string;
        redirectUri: string;
    }
```
#### Response
```js
    cookies: {
        refreshJwt: string, HttpOnly;
    },
    body: {
        accessJwt: string;
        cors: string;
        userId: string;
    }
```

### `POST /api/auth/refreshTokens`
#### Request
Обновляем токены
```js
    body: {
        cors: string;   
    }
```
#### Response
```js
    cookies: {
        refreshJwt: string, HttpOnly;
    },
    body: {
        accessJwt: string;
        cors: string;
    }
```

## Группы

### Сущность 
```js
    Group: {
        name: string;
        id: number;
    }
```

### `GET /api/group?userId=<string>`
Получает все группы, админом которых является юзер
#### Response
```js
{
    groups: [Group]
}
```
