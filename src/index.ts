import App from "./App";
import Projectile from "./simulations/ProjectileSimulation";
import UiEvents from "./ui/UiEvents";

/**
 * IDEAS
 * draw coordinate axes
 * make point class
 *
 * add menu for other simulations
 * shot a bullet in interval
 * basing on an angle set by user
 * using up/down arrows
 */

new UiEvents();
(new Projectile).render();

