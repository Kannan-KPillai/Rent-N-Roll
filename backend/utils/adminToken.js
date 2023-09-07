import jwt from 'jsonwebtoken';

const adminToken = (res, userId) => {
    const token = jwt.sign({adminId}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })

res.cookie('adjwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSight: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
})
}

export default adminToken;