import random
ui=input("Enter rock , paper or scissor . (Spellings must be write):")
possibleactions= 'rock' , 'paper' ,'scissor'
pcactions=possibleactions
pc=random.choice(pcactions)
print(f"Opposite team choose {pc}")
if ui == pc:
    print(f"both choose {ui} . It's a tie")
elif ui == 'rock':
    if pc == 'scissor':
        print(f'Rock breaks scissor . You won')
    if pc == 'paper':
        print(f'Paper covers rock . You loose')
elif ui == 'paper':
    if pc == 'rock':
        print("Paper covers rock . You win")
    if pc == "scissor":
        print('Scissor cuts paper . You loose')
elif ui == 'scissor':
    if pc == 'rock':
        print("Rock breaks scissor . You loose ")
    if pc == 'paper':
        print("Scissor cuts paper . You win ")