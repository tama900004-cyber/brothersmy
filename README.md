# SmartCane — 3D Webots simulation (Glide-inspired)

**Status: research demonstration, NOT a validated mobility or braking system.**

This is an independently written proof of concept of a **human-pushed** two-wheel guide cart.
A simulated user provides walking speed; a Python controller changes heading
and shows rolling wheel animations. Includes camera visualization, three Webots
distance rays, fixed bypass waypoints, obstacle stop, sensor-fault stop, and
emergency stop.

## Quick start

1. Install [Webots](https://cyberbotics.com/#download) R2025a or newer.
2. Open `worlds/smart_cane_demo.wbt` in **desktop Webots**.
3. Press the **Run** button. The cart should start moving automatically.
4. Click the 3D scene to give it keyboard focus.

| Key | Action |
|---|---|
| P | Pause/resume simulated human push |
| B | Emergency software stop |
| C | Clear emergency stop |
| M | Switch route/manual mode |
| Left/Right arrows | Manual turning |
| Up arrow | Straighten manual turn |
| F | Simulate sensor failure, forcing stop |
| R | Reset simulation |

## What is real vs simulated

- **Movement:** KINEMATIC. We directly change the model's position; no wheel traction/torque physics is represented.
- **Wheels:** The wheel motors only animate rotation; there is no automatic drive propulsion.
- **Steering:** We draw steering heading; the actual wheel steering joint and torque are *not* implemented.
- **Stopping:** Software movement is halted. This does **not** simulate real brakes, grip forces, or stopping distance.
- **Sensors:** Three ray distance measurements. The phone camera is visual only; no AI image processing yet.
- **Routing:** A known path of waypoints around fixed obstacles. No general obstacle-replanning.
- **Tests:** Python unit tests validate pure route-controller states, not Webots GUI/ODE physics.

## Test navigation code

```bash
python -m pip install -r requirements-dev.txt
python -m pytest -q
```

## Future integration

Add physics-based passive wheels with steering/brake mechanisms;
realistic friction and hand-push fixture; Android/OpenBot camera inference;
an authenticated BLE bridge to an independent ESP32 safety controller.
All these require new tests before any physical human interaction.

No proprietary Glidance source code is used. No human mobility safety claims.

> This branch is isolated from the repository's main branch; main was not changed.
