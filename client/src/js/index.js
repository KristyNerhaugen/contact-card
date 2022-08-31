//import modules
import "./form";
import "./submit";

// import css
import "../css/index.css";

//import Bootstrap
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import images
import Logo from "../images/logo.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

// import initDb, getDb, and postDb functions from database.js
import { initdb, getDb, postDb } from "./database";

// add images on load
window.addEventListener("load", function () {
  initdb();
  getDb();
  postDb("UserNameOne", "UserOne@email.com", 1234567891, "Bear");
  getDb();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});
