const express = require("express");
const router = express.Router();
const user_controllers = require("../controllers/user_controllers");
const event_controllers = require("../controllers/event_controllers");

//USER ROUTES
router.get("/get_users", user_controllers.get_users);

router.post("/get_userform", user_controllers.get_userform);

router.post("/get_userdetails", user_controllers.get_userdetails);

router.post("/create_user", user_controllers.create_user);

router.post("/update_user", user_controllers.update_user);

router.delete("/delete_user", user_controllers.delete_user)

//EVENT ROUTES
router.get("/get_events", event_controllers.get_events);

router.post("/get_eventdetails", event_controllers.get_eventdetails);

router.post("/get_eventform", event_controllers.get_eventform);

router.post("/create_event", event_controllers.create_event);

router.post("/update_event", event_controllers.update_event);

router.delete("/delete_event", event_controllers.delete_event)

module.exports = router;
