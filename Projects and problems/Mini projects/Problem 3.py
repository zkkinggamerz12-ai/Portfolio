import time
import random
print("Welcome to dice simulator")
x = input("Enter anything to roll:")
print("dice is rolling. please wait for 2.5 seconds")
time.sleep(2.5)
dice = 1 , 2 , 3 ,4 ,5 ,6
d=[]
d.extend(dice)
print(random.choice(d))