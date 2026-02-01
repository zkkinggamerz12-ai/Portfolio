
add=0
while (True):
  userinput=input("Enter the price or write q:")
  if (userinput!='q'):
    add=add+int(userinput)
    print("overall for now is ")
    print(add)
  else:
    print("Your bill is ")
    print(add)
    break