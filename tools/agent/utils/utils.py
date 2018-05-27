import asyncio
import datetime

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def println(text, color=bcolors.OKBLUE):
    time = datetime.datetime.now()
    print('{}: {}{}{}'.format(time.strftime("%Y-%m-%d %H:%M:%S"), color, text, bcolors.ENDC))

async def async_wait(check, interval=1, timeout=None, event='', **kwargs):
    if not timeout:
        timeout = 240

    if event:
        println('Waiting {} sec for {}'.format(timeout, event), bcolors.BOLD)
    else:
        println('Waiting {} sec'.format(timeout), bcolors.BOLD)

    explanation_string = ''

    time_passed = 0
    while time_passed < timeout:
        result = check(**kwargs)
        if type(result) is tuple:
            success = result[0]
            explanation_string = result[1]
        else:
            success = result

        if success:
            if event:
                println('Waiting for {} time: {} seconds'.format(event, time_passed), bcolors.BOLD)
            return

        await asyncio.sleep(interval)
        time_passed += interval

    exception_string = event
    if explanation_string:
        exception_string += ', completed ' + explanation_string

    raise Exception(exception_string)

def wait(check, interval=1, timeout=None, event='', **kwargs):
    loop = asyncio.get_event_loop()
    wait_task = loop.create_task(async_wait(check, interval, timeout, event, **kwargs))
    loop.run_until_complete(wait_task)
    return wait_task.result()

