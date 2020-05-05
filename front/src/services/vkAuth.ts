export const createVkUserToken = (
    code: string,
    redirectUri: string,
): Promise<{userId: number}> => fetch(
    '/auth/createToken',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code,
            redirectUri,
        }),
    },
).then(res => res.json());
