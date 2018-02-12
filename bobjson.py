import csv
import json
import binascii
import struct

pictures = {}
with open('Pictures.csv', newline='') as f:
	for row in csv.DictReader(f, delimiter=',', quotechar='"'):
		new_entry = {'path': row['Pathname'], 'name': row['Description']}
		if row['AnimationFile']:
			new_entry['anim'] = row['AnimationFile']
		if row['Flags'] != '0':
			new_entry['flags'] = int(row['Flags'])
		pictures[int(row['ID'])] = new_entry

flag_types = {
	'0': 'HIDDEN',
	'1': 'TEMPLATE',
	'2': 'ACTIVE'
}
room_types = {
	'1': 'Entry',
	'2': 'Study',
	'3': 'Family Room',
	'4': 'Kitchen',
	'5': 'Sun Room',
	'6': 'Garage',
	'7': 'Kid\'s Room',
	'8': 'Attic',
	'9': 'Safe',
	'10': 'Common',
	'11': 'Mouse Hole',
	'12': 'Outside'
}
app_types = {
	'3': 'logon',
	'4': 'door',
	'5': 'calendar',
	'6': 'household_manager',
	'7': 'checkbook',
	'12': 'email',
	'30': 'address_book',
	'31': 'letter_writer',
	'39': 'clock',
	'40': 'balloon',
	'51': 'control_panel',
	'66': 'animation',
	'67': 'background',
	'182': 'geosafari',
	'188': 'financial_guide'
}

rooms = {}
with open('Rooms.csv', newline='') as f:
	for row in csv.DictReader(f, delimiter=',', quotechar='"'):
		new_entry = {
			'name': row['Name'],
			'description': row['Description'],
			'background': int(row['BackgroundId']),
			'preview': int(row['PreviewId']),
			'state': flag_types[row['Flags']],
			'type': room_types[row['TypeId']],
			'design': int(row['DesignStyleId']),
			'objects': []
			}
		rooms[int(row['UniqueId'])] = new_entry

sobs = {}
with open('Sobs.csv', newline='') as f:
	for row in csv.DictReader(f, delimiter=',', quotechar='"'):
		new_entry = {
			'image': int(row['ImageId']),
			'app': app_types[row['AppId']],
			'x': int(row['X']),
			'y': int(row['Y']),
			'w': int(row['CX']),
			'h': int(row['CY']),
			'flags': int(row['Flags'])
		}

		dest_id = int(row['DestId'])
		if dest_id > 0 and dest_id < 32768:
			new_entry['destination'] = dest_id
		if row['AnimPath']:
			new_entry['anim'] = row['AnimPath']
		
		sobs[int(row['UniqueId'])] = new_entry


# soblists needs custom parsing as it contains binary data
with open('soblists.csv', 'rb') as f:
	magic_line = b'"UserId","RoomId","Count","OrderedList","UniqueId"\r\n'
	first_line = f.read(len(magic_line))
	assert first_line == magic_line

	rest = f.read()
	rest = rest.replace(b'""', b'"')
	position = 0
	while position < len(rest):
		data_start = rest.index(b'"', position) + 1
		list_header = rest[position:data_start].decode('ascii').split(',')
		user_id = int(list_header[0])
		room_id = int(list_header[1])
		count = int(list_header[2])
		data = rest[data_start:data_start+(count*6)]
		position += (count*6)
		position = rest.index(b'\r\n', position) + 2
		print('UserID: %d / RoomID: %d / Data: %r' % (user_id, room_id, binascii.hexlify(data)))

		for i in range(count):
			sob_id = struct.unpack_from('<H', data, i * 6 + 2)[0]
			rooms[room_id]['objects'].append(sobs[sob_id])


for room in rooms.values():
	room['objects'].reverse()

with open('data.json', 'w') as f:
	json.dump({'rooms': rooms, 'pictures': pictures}, f, indent=4)
