const upload = require('../Middlewares/imageUploadMiddleware');
const {PrismaClient} = require("@prisma/client");
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
            const {name, email, isAuthor} = req.body
            const image = req.file
            await prisma.user.update({
                where: { id: userId },
                data: { full_name:name, email:email, image: image.filename },
            });
            console.log(req.body, userId, image)
            req.flash('success_message', 'Profile updated successfully');
            res.redirect('/profile/pedit');
        })
    }catch (e) {
        req.flash('error_message', 'An error occurred while updating the profile');
        res.redirect('/profile/edit');
    }
}