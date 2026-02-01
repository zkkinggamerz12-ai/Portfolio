x=int(input("Write the Total rent:"))
y=int(input("Total food ordering price:"))
z=int(input("Electricity spend"))
a=int(input("Charge per Units:"))
c=x+y+z*a
print(f"The Total bill is {c}")
b=int(input("How much people have to pay rent:"))
print(f"Each have to pay {c/b} ")