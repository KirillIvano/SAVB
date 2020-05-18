# Примерное описание требуемого API

## Разделы
* [Авторизация](#авторизация)
* [Группы](#группы)

## Авторизация

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
        refreshJwt: string, HttpOnly;
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
    body: {
        csrf: string;   
    }
```
#### Response
```
    cookies: {
        refreshJwt: string, HttpOnly;
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
    }
```

### `GET /api/group?userId=<string>`
Получает все группы, админом которых является юзер
#### Response
```
{
    data {
        groups: [Group]
    }
}
```
