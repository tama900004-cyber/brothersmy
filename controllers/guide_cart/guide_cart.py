"""Webots guide-cart: human push represented by kinematic motion, not physical brakes."""
import math
from controller import Supervisor
from navigation_core import Navigator

STEP=32
DT=STEP/1000.
sim=Supervisor()
keys=sim.getKeyboard()
keys.enable(STEP)
nav=Navigator()
self_node=sim.getSelf()
pos_field=self_node.getField("translation")
rot_field=self_node.getField("rotation")
sensors=[sim.getDevice(n) for n in ("front_distance","left_distance","right_distance")]
for s in sensors: s.enable(STEP)
cam=sim.getDevice("phone_camera")
cam.enable(STEP*4)
wheels=[sim.getDevice(n) for n in ("left_wheel_visual","right_wheel_visual")]
for w in wheels:
    w.setVelocity(40)
    w.setPosition(0)
pointer=sim.getDevice("steering_visual")
pointer.setVelocity(2)
pointer.setPosition(0)
pose=[-3.5,0,0.16]
yaw=0.
wheel_angle=0.
pushing=True
manual=False
manual_turn=0.
emergency=False
fault=False
print("Guide Cart: P pause | B brake | C clear | M manual | LEFT/RIGHT steer | F sensor fault | R reset")
def label(i,msg,y,color):
    sim.setLabel(i,msg,0.02,y,0.066,color,0,"Arial")
while sim.step(STEP)!=-1:
    key=keys.getKey()
    while key!=-1:
        if key in (ord("p"),ord("P")): pushing=not pushing
        elif key in (ord("b"),ord("B")): emergency=True
        elif key in (ord("c"),ord("C")): emergency=False
        elif key in (ord("m"),ord("M")):
            manual=not manual
            manual_turn=0.
        elif key in (ord("f"),ord("F")): fault=not fault
        elif key in (ord("r"),ord("R")):
            pose=[-3.5,0,0.16]
            yaw=0.
            pos_field.setSFVec3f(pose)
            rot_field.setSFRotation([0,0,1,0])
            nav.reset()
            pushing=True
            emergency=False
            fault=False
            manual=False
            manual_turn=0.
        elif key==keys.LEFT: manual_turn=1.
        elif key==keys.RIGHT: manual_turn=-1.
        elif key==keys.UP: manual_turn=0.
        key=keys.getKey()
    dist=min(s.getValue() for s in sensors)
    command=nav.update(pose[0],pose[1],yaw,dist,pushing=pushing,
                       emergency=emergency,sensor_ok=not fault,
                       manual_turn=manual_turn if manual else None)
    if not command.brake:
        yaw+=command.yaw_rate*DT
        pose[0]+=math.cos(yaw)*command.speed*DT
        pose[1]+=math.sin(yaw)*command.speed*DT
        pos_field.setSFVec3f(pose)
        rot_field.setSFRotation([0,0,1,yaw])
        wheel_angle-=command.speed*DT/0.12
        for w in wheels: w.setPosition(wheel_angle)
    pointer.setPosition(command.steering_angle)
    label(0,"SMART CANE / GLIDE-INSPIRED (VISUAL SIM ONLY)",.02,0xFFFFFF)
    label(1,"STATE: %s | PUSH: %s | MODE: %s"%(command.status,"ON" if pushing else "OFF","MANUAL" if manual else "AUTO"),.09,0xFF5555 if command.brake else 0x75FF9A)
    label(2,"WAYPOINT: %d/%d | SENSOR: %.2fm | SPEED: %.2fm/s"%(min(command.waypoint_index+1,len(nav.waypoints)),len(nav.waypoints),dist,command.speed),.16,0xFFFFFF)
    label(3,"P pause | B stop | C clear | M mode | arrows | F fault | R reset",.23,0xF9F9B9)
