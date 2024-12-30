export const userService = {
    updateUser,
    getUser
}

async function updateUser(user) {
    const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    return await res.json()
}

async function getUser(email) {
    const res = await fetch(`/api/user/get?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.statusText}`);
    }

    return await res.json();
}