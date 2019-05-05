import App from "./App";
import Projectile from "./simulations/ProjectileSimulation";
import UiEvents from "./ui/UiEvents";
import Hud from "./ui/Hud";
import {TimeService} from "./services/TimeService";

/**
 * IDEAS
 */

new UiEvents();
const timeService = new TimeService();
const hud = new Hud(timeService);
const projectileSimulation = (new Projectile(timeService, hud)).render();

