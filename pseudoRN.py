import hashlib, time

startSeed = str(time.time()) + '|'
min = 10
max = 20
for i in range(5):
    nextSeed = startSeed + str(i)
    hash = hashlib.sha256(nextSeed.encode('ascii')).digest()
    bigRand = int.from_bytes(hash, 'big')
    rand = min + bigRand % (max - min + 1)
    print(nextSeed, bigRand, '-->', rand)
