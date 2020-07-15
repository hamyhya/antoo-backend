const multer = require("multer")
const profileValidator = require("../../validators/profile");
const response = require("../../utils/response");
const create = require("../../models/profile/createProfile");
const update = require("../../models/profile/updateProfile");
const getProfileById = require("../../models/profile/getProfileById");

module.exports = {
  createProfile: (req, res) => {
    upload(req, res, async (fileError) => {
      if (!req.file) {
        res.status(400).send(response(
          false, "Please select an image to upload"));
      }
      else if (req.fileValidationError) {
        res.status(400).send(response(
          false, req.fileValidationError
        ));
      } else if (fileError instanceof multer.MulterError) {
        res.status(400).send(response(
          false, "File size too large"
        ));
      } else {
        const profileValid = profileValidator(req.body)
        if (profileValid.status) {
          const { id: user_id } = req.me
          const { full_name, phone_number } = profileValid.passed;
          const data = {
            user_id,
            full_name,
            image: "public/" + req.file.filename,
            phone_number
          };
          try {
            const createProfile = await create(data)
            res.status(201).send(response(true, profileValid.msg, createProfile));
          } catch (e) {
            res.status(500).send(response(false, e.message));
          }
        } else {
          res.status(400).send(response(false, profileValid.msg));
        }
      }
    });
  },
  updateProfile: (req, res) => {
    upload(req, res, async (fileError) => {
      if (!req.file) {
        res.status(400).send(response(
          false, "Please select an image to upload"));
      }
      else if (req.fileValidationError) {
        res.status(400).send(response(
          false, req.fileValidationError
        ));
      } else if (fileError instanceof multer.MulterError) {
        res.status(400).send(response(
          false, "File size too large"
        ));
      } else {
        const { id } = req.params
        const userExist = await getProfileById({ user_id: parseInt(id) })
        if (userExist) {
          const profileValid = profileValidator(req.body)
          if (profileValid.status) {
            const { full_name, phone_number } = profileValid.passed;
            const data = {
              user_id,
              full_name,
              image: "public/" + req.file.filename,
              phone_number
            };
            try {
              const createProfile = await update([data, { id: parseInt(id) }])
              res.status(201).send(response(true, profileValid.msg, createProfile));
            } catch (e) {
              res.status(500).send(response(false, e.message));
            }
          } else { res.status(400).send(response(false, profileValid.msg)); }
        } else { res.status(400).send(response(false, userExist)); }
      }
    });
  }
}