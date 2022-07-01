const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const { rootPath, PRODUCT_IMAGE_DIR } = require("./FileUploadDir");

const makeFileName = (file) => {
  const fileExt = path.extname(file.originalname);
  const fileName =
    file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") +
    "-" +
    Date.now();
  return fileName + fileExt;
};

//storage for profile images.
const productImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(rootPath, PRODUCT_IMAGE_DIR));
  },
  filename: function (req, file, cb) {
    const fileName = makeFileName(file);
    cb(null, fileName);
  },
});
//setup upload
const productUpload = multer({ storage: productImageStorage });

//reduce image size

const uploadProductImage = (max_length, field_name) => {
  return (req, res, next) => {
    productUpload.array(field_name, max_length)(req, res, (err) => {
      if (err) {
        if (err?.code === "LIMIT_UNEXPECTED_FILE") {
          res.status(200).json({
            message: "Maximum " + max_length + " Image You Can Upload.",
          });
        } else {
          res.status(200).json({
            message: err,
          });
        }
      } else {
        //reduce image size
        next();
      }
    });
  };
};

const compressImage = (dir_name, goNext, reduceSize) => {
  const filePath = path.join(rootPath, dir_name);
  return async (req, res, next) => {
    if (req?.files?.length > 0) {
      if (reduceSize) {
        let done = 0;
        await req.files?.forEach(async (file, index) => {
          await sharp(file.path)
            .webp({ quality: 20 })
            .toFile(filePath + "/" + file?.filename + ".webp", (err, info) => {
              if (err) {
                res.json({
                  error: err,
                });
              } else {
                const dFilePath = path.join(filePath, file.filename);
                try {
                  fs.unlinkSync(dFilePath);
                } catch (err) {}
                done += 1;
                if (done === req.files.length) {
                  next();
                }
              }
            });
        });
      } else {
        next();
      }
    } else {
      if (goNext) {
        next();
      } else {
        res.status(200).json({
          message: "No Image Selected",
        });
      }
    }
  };
};

const removeFile = (folder_name, file_name) => {
  const filePath = path.join(rootPath, folder_name);
  const dFilePath = path.join(filePath, file_name);
  try {
    fs.unlinkSync(dFilePath);
  } catch (err) {}
};

module.exports = {
  uploadProductImage,
  compressImage,
  removeFile,
};
