    ______                 __                       __   _   __                __          __                             ___                        __        ______
   / ____/________  ____  / /_      ___  ____  ____/ /  / | / /___ _____  ____/ /___  ____/ /__  ____ _________  ___     /   |  ______________ _____/ /__     / ____/___ _____ ___  ___
  / /_  / ___/ __ \/ __ \/ __/_____/ _ \/ __ \/ __  /  /  |/ / __ `/ __ \/ __  / __ \/ __  / _ \/ __ `/ ___/ _ \/ _ \   / /| | / ___/ ___/ __ `/ __  / _ \   / / __/ __ `/ __ `__ \/ _ \
 / __/ / /  / /_/ / / / / /_/_____/  __/ / / / /_/ /  / /|  / /_/ / / / / /_/ / /_/ / /_/ /  __/ /_/ / /  /  __/  __/  / ___ |/ /  / /__/ /_/ / /_/ /  __/  / /_/ / /_/ / / / / / /  __/
/_/   /_/   \____/_/ /_/\__/      \___/_/ /_/\__,_/  /_/ |_/\__,_/_/ /_/\__,_/\____/\__,_/\___/\__, /_/   \___/\___/  /_/  |_/_/   \___/\__,_/\__,_/\___/   \____/\__,_/_/ /_/ /_/\___/
                                                                                              /____/



 Project: frontend-nanodegree-arcade-game
 Authors:  Alistair Reynolds <alistair.reynolds1986@gmail.com>
			Udacity <www.udacity.com>
 Source: https://github.com/madcabbage/3-frogger/



---------------
| What is it? |
---------------

This is a basic game based on the classic Frogger arcade game.


--------------------
| How do I run it? |
--------------------

To run, open the index.html file in modern (HTML5 compatiable) browser.


-------------------------
| What do I need to do? |
-------------------------

The objective of the game is for you to reach the river without getting hit by the bugs.
If you get hit, you'll get a "Squish" and you'll be reset back to the starting position
If you make it to the other side, you'll score a point!


------------------
| How do I play? |
------------------

Use the cursor keys to control your character


-------------------
| Developer notes |
-------------------

The game has base speeds setup that change according to how well you're doing, but you can change the initial values and maximum/minimum speeds that will be reached at the top of the app.js file
Documentation for each file can be found in the docs folder in the relevant .html file

---------
| Files |
---------

index.html -> Basic index file, nothing fancy
js/resources.js -> Handles loading of images onto the canvas
js/app.js -> Handles entities and game rules
js/engine.js -> Handles loading and refreshing of the game