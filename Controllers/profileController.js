const upload = require('../Middlewares/imageUploadMiddleware');
const {PrismaClient} = require("@prisma/client");
const path = require("path");
const fs = require('fs');
const prisma = new PrismaClient()

const uploadImage = upload.single('profileImage');
exports.updateProfile = (req,res)=>{
    try{
        uploadImage(req, res, async (err) => {
            if (err) {
                console.error(err);
                req.flash('error_message', 'An error occurred during image upload');
                res.redirect('/profile/edit');
                return;
            }
            const userId = req.user.id
            const {name, email} = req.body
            const image = req.file
            const isAuthor = req.body.isAuthor === 'on';

            const existingUser = await prisma.user.findUnique({
                where:{
                    id: userId
                }
            })



            const updateData = {
                full_name: name,
                email: email,
                isAuthor
            };

            if (image) {
                if (existingUser.image) {
                    const existingImagePath = path.join(__dirname, '../public/images', existingUser.image);
                    try {
                        await fs.unlink(existingImagePath);
                    } catch (unlinkError) {
                        console.error(unlinkError);
                    }
                }

                updateData.image = image.filename;
            }

            await prisma.user.update({
                where: { id: userId },
                data: updateData,
            });
            req.flash('success_message', 'Profile updated successfully');
            res.redirect('/profile/pedit');
        })
    }catch (e) {
        req.flash('error_message', 'An error occurred while updating the profile');
        res.redirect('/profile/edit');
    }
}

exports.deleteAccount = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (user) {
            if (user.image) {
                const imagePath = path.join(__dirname, '../public/images', user.image);
                try {
                    await fs.unlink(imagePath);
                } catch (unlinkError) {
                    console.error(unlinkError);
                }
            }

            await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
            req.logout(()=>{
                req.flash('success_message', 'Account deleted successfully');
                res.redirect('/');
            });

        } else {
            req.flash('error_message', 'User not found');
            res.redirect('/profile/edit');
        }
    } catch (error) {
        console.error(error);
        req.flash('error_message', 'An error occurred while deleting the account');
        res.redirect('/profile/edit');
    }
};