export const optionsUserRole = [
    {
        label: 'User',
        value: 'user',
    },
    {
        label: 'Admin',
        value: 'admin',
    },
];

export const convertUserRole = (roles) => {
    return roles?.map(role => [role])
}