Robert.js
=========

Here are some tools for doing things with data files from Microsoft Bob (and
the Assistants from Office 97, since they use an upgraded version of the same
format).

I'll write up a better description of this stuff at some point, but for now...

Live demo (requires a modern web browser):

- *Assistants*: https://wuffs.org/bob/actors.html
- *Rooms*: https://wuffs.org/bob/room.html

Created by Ash Wolf (https://github.com/Treeki). Licensed under the MIT
license.

### robert.js

Provides `BobPack` and `BobResource` classes. The `BobPack` class parses a
file (.ACT, .ACP or .ANI) and exposes the resources inside (usually just one).

Each `BobResource` contains the following:

- *Payloads*: WMF images and pose specifications (arrangements of images)
- *RIFFs*: Audio files in RIFF/WAV format
- *Animation Groups*: Groups of animation sequences containing commands to show poses, play sounds and jump
- *String Groups*: Groups of strings to be used in specific scenarios

### wmf.js

Provides a rudimentary implementation of the WMF format that renders to a
HTML5 Canvas.

### demo_actors.js, actors.html

Loads and renders actors from Bob and Office 97 (and also other animation
files used in the Bob Home, just for the hell of it).

Expects actors to be placed in the `actors/` directory and the home animation
files to be placed in the `home/` directory.

### demo_room.js, room.html

Loads and displays rooms from Bob. Pretty buggy.

Expects the home animation files to be placed in the `home/` directory, the
extracted WMFs to be placed in the `upic/` directory and the converted room
data to be placed in `data.json`.

### extract_graphics.bas

VBA module to extract the Bob graphics from the `UPIC.MDB` database. Tested
with Access 97 on Windows 98.

### fix_wmfs.py

Removes the 12-byte headers from every extracted WMF in the `upic/` directory.

### bobjson.py

Converts data extracted from the Bob databases to `data.json` for use with the
room loader. Expects the following files:

- `Rooms.csv`: export of the *Rooms* table from `UTOPIA.MDB`
- `Sobs.csv`: export of the *Sobs* table from `UTOPIA.MDB`
- `soblists.csv`: export of the *Sob Lists* table from `UTOPIA.MDB`
- `Pictures.csv`: export of the *PictureStorage* table from `UPIC.MDB`

All CSVs should be exported using comma delimiters and quoted fields. The
PictureStorage table cannot be exported directly -- you will need to create
a query for it containing all fields except for the two containing binary
data, and then export the query.

