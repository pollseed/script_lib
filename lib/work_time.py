# -*- coding: utf-8 -*-
from datetime import datetime as dt
from datetime import date as d

"""
python work_time.py
What time is working end time of {__day of the week__}?
Plerase your today's working-end hour >>>
"""
class WorkTime(object):
    DAY_OF_THE_WEEK = {
            0: "monday",
            1: "tuesday",
            2: "wednesday",
            3: "thursday",
            4: "friday",
            5: "satarday",
            6: "sunday"
            }
    ONE_HOUR = 60

    def set_value(self,weekday):
        for k,v in self.DAY_OF_THE_WEEK.items():
            if k == weekday:
                ending_time = 0
                try:
                    ending_time = float(input(
                                'What time is working end time of {0}? > '.format(v)))
                    if ending_time > 0 and ending_time > dt.now().hour:
                        return ending_time
                    raise ValueError('0 > input value and now-time')
                except ValueError as e:
                    print('[{0}]\n'.format(e), 'Please enter again!')
                    return self.set_value(weekday)

    def get_time(self,hour):
        rest = (lambda x: round(
            float(
                ((hour - x.hour) * self.ONE_HOUR - x.minute) / self.ONE_HOUR)
            , 3))(dt.now())
        print('resttime :{0}h'.format(rest))

    def __init__(self):
        self.get_time(self.set_value(d.today().weekday()))

if __name__ == '__main__':
    WorkTime()
