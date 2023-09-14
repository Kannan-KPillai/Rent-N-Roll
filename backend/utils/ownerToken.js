import jwt from 'jsonwebtoken';

const generateToken = (res, ownerId) => {
    const token = jwt.sign({ownerId}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })

res.cookie('owjwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSight: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
})
}

export default generateToken;