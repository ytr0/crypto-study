import hashlib, time, binascii

entropy = ''
for i in range(5):
    s = input("Enter something [" + str(i+1) + " of 5]: ")
    entropy = entropy + s + '|' + str(time.time()) + '|'
print("Entropy:", entropy)
startSeed = str(binascii.hexlify(hashlib.sha256(entropy.encode('ascii')).digest()))[2:-1]
print("Start seed = SHA-256(entropy) =", startSeed)

min = 10
max = 20
for i in range(5):
    nextSeed = startSeed + '|' + str(i)
    hash = hashlib.sha256(nextSeed.encode('ascii')).digest()
    bigRand = int.from_bytes(hash, 'big')
    rand = min + bigRand % (max - min + 1)
    print(nextSeed, bigRand, '-->', rand)
