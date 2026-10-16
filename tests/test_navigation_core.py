import math
import pathlib
import sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / "controllers" / "guide_cart"))
from navigation_core import Navigator,wrap_angle

def test_go_when_clear():
    x=Navigator().update(-3.5,0,0,4)
    assert x.status=="GUIDING" and x.speed>0 and not x.brake
def test_stop_obstacle():
    x=Navigator().update(-3.5,0,0,.1)
    assert x.brake and x.speed==0
def test_stop_sensor_fault():
    assert Navigator().update(0,0,0,float("nan")).status=="SENSOR_FAULT"
def test_stop_emergency():
    assert Navigator().update(0,0,0,4,emergency=True).status=="EMERGENCY_STOP"
def test_push_pause():
    assert Navigator().update(0,0,0,4,pushing=False).brake
def test_waypoint_finish():
    assert Navigator(waypoints=((0,0),)).update(0,0,0,4).status=="DESTINATION_REACHED"
def test_manual_steering():
    x=Navigator().update(0,0,0,4,manual_turn=1)
    assert x.status=="MANUAL" and x.yaw_rate>0
def test_wrap():
    assert math.isclose(wrap_angle(3*math.pi),-math.pi)
