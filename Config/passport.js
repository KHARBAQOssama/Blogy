const LocalStrategy = require('passport-local')
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')


module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (!user) {
                    return done(null, false, { message: 'Email not registered' });
                }

                // Use bcrypt.compare as an async function
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password or email' });
                }
            } catch (error) {
                return done(error);
            }
        })
    );
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async  (id, done)=>{
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (!user) {
                return done(new Error('User not found'));
            }
            done(null, user);
        } catch (error) {
            done(error);
        }
    })
}