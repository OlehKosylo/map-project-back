module.exports = {
    date: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
    phone: '^[+?0-9]{7,19}$',
    // eslint-disable-next-line max-len
    email: '^(([^<>()\\[\\].,;:\\s@"]+(\\.[^<>()\\[\\].,;:\\s@"]+)*)|(".+"))@(([^<>()[\\].,;:\\s@"]+\\.)+[^<>()[\\].,;:\\s@"]{2,})$'
};
