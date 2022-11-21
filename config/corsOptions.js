const allowlist = [
    process.env.WEBSITE,
    process.env.IP_LOCALHOST,
    process.env.LOCALHOST
];

export const corsOptions = {
    origin: (origin, callback) => {
        if (allowlist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}