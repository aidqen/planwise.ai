export const userService = {
    updateUser
}

async function updateUser(user) {
    const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    return await res.json()
}