import os

def fixdir(d):
	for e in os.listdir(d):
		p = os.path.join(d,e)
		if e.endswith('.wmf') or e.endswith('.WMF'):
			with open(p, 'rb') as f:
				b = f.read()
			with open(p, 'wb') as f:
				f.write(b[0xC:])
		else:
			fixdir(p)

fixdir('upic')
