"""Pure-Python simulation navigation logic. NOT mobility safety-certified."""
from dataclasses import dataclass
import math

WAYPOINTS = ((-2.2,1.1), (0.15,1.1), (2.25,1.1), (3.45,0))

def wrap_angle(a):
    return (a + math.pi) % (2 * math.pi) - math.pi

def clamp(x, lo, hi):
    return max(lo,min(hi,x))

@dataclass(frozen=True)
class Guidance:
    status: str
    speed: float
    yaw_rate: float
    brake: bool
    steering_angle: float
    waypoint_index: int

class Navigator:
    MAX_SPEED=0.67
    MAX_YAW_RATE=0.75
    BRAKE_DISTANCE=0.62
    SLOW_DISTANCE=1.10
    ARRIVAL_RADIUS=0.32
    def __init__(self, waypoints=WAYPOINTS):
        self.waypoints=tuple(waypoints)
        self.index=0
    def reset(self):
        self.index=0
    def _stop(self,status):
        return Guidance(status,0.,0.,True,0.,self.index)
    def update(self,x,y,heading,front_distance,pushing=True,emergency=False,sensor_ok=True,manual_turn=None):
        if emergency: return self._stop("EMERGENCY_STOP")
        if not sensor_ok or not math.isfinite(front_distance) or front_distance<0: return self._stop("SENSOR_FAULT")
        if front_distance<=self.BRAKE_DISTANCE: return self._stop("OBSTACLE_STOP")
        if not pushing: return self._stop("USER_PAUSED")
        scale=clamp((front_distance-self.BRAKE_DISTANCE)/(self.SLOW_DISTANCE-self.BRAKE_DISTANCE),0.15,1.)
        if manual_turn is not None:
            rate=clamp(manual_turn,-1.,1.)*self.MAX_YAW_RATE
            return Guidance("MANUAL",self.MAX_SPEED*0.6*scale,rate,False,rate/self.MAX_YAW_RATE*0.48,self.index)
        while self.index<len(self.waypoints):
            wx,wy=self.waypoints[self.index]
            if math.hypot(wx-x,wy-y)>self.ARRIVAL_RADIUS: break
            self.index+=1
        if self.index>=len(self.waypoints): return self._stop("DESTINATION_REACHED")
        wx,wy=self.waypoints[self.index]
        error=wrap_angle(math.atan2(wy-y,wx-x)-heading)
        rate=clamp(2*error,-self.MAX_YAW_RATE,self.MAX_YAW_RATE)
        slow_turn=clamp(1-abs(error)/1.5,0.18,1.)
        speed=self.MAX_SPEED*min(slow_turn,scale)
        return Guidance("GUIDING",speed,rate,False,rate/self.MAX_YAW_RATE*0.48,self.index)
