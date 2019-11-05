const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const path = require('path');

exports.upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, next) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowed.includes(file.mimetype)) {
      next(null, true);
    } else {
      next({ error: 'Esse tipo de arquivo não é suportado!!' }, false);
    }
  },
});

exports.resize = async (req, _res, next) => {
  if (!req.file) {
    next();
    return;
  }

  const ext = req.file.mimetype.split('/')[1];
  const filename = `${uuid.v4()}.${ext}`;

  req.body.photo = filename;

  const photo = await jimp.read(req.file.buffer);
  await photo.resize(400, 400);
  await photo.write(path.resolve(__dirname, '..', '..', `uploads/${filename}`));
  next();
};
