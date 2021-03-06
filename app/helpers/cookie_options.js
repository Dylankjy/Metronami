// TODO: Enable secure cookie after testing

// cookieParser: Cookie schema
const StdCookie = {
    httpOnly: true,
    // secure: true,
    signed: true,
    domain: `localhost:3000`,
    maxAge: 2678400000, // 31 days
    path: '/',
}


// cookieParser: Cookie schema for notifications
const NotificationCookie = {
    httpOnly: true,
    // secure: true,
    // signed: true,
    domain: `localhost`,
    maxAge: 1000, // 1 seconds
    path: '/',
}

// cookieParser: Cookie schema for restoring values to a failed form request
const FormRestoreCookie = {
    httpOnly: true,
    // secure: true,
    // signed: true,
    domain: `localhost`,
    maxAge: 1000, // 1 seconds
    path: '/',
}

module.exports = {
    StdCookie,
    NotificationCookie,
    FormRestoreCookie,
}
