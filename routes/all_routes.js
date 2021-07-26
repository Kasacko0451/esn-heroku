const express = require("express");
const router = express.Router();
const user_controllers = require("../controllers/user_controllers");
const event_controllers = require("../controllers/event_controllers");

//USER ROUTES
router.get("/get_users", user_controllers.get_users);

router.post("/get_userdetails", user_controllers.get_userdetails);

//EVENT ROUTES
router.get("/get_events", event_controllers.get_events);

router.post("/get_eventdetails", event_controllers.get_eventdetails);

module.exports = router;
