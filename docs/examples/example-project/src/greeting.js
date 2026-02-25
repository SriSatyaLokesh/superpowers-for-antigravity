export const greet = (name, prefix = 'Hello') => {
    return `${prefix}, ${name || 'Stranger'}!`;
};
