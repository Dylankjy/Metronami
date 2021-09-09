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

// cookieParser: Cookie schema
const ToriimonCookie = {
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
    maxAge: 5000, // 5 seconds
    path: '/',
}

module.exports = {
    StdCookie,
    ToriimonCookie,
    NotificationCookie,
}
