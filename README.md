# IP Fragmentation Calculator

This little application is intended to represent what happens to a datagram of certain size when it's subject to fragmentation due to the MTU. You can modify the data length and the MTU size and calculate the length and the offset of each fragment. Note that the MTU has a minimum size of 28.

This application is intended to educational purposes, to be used while studying computer networking or teaching a class. To run the calculator, just open the ``index.html`` file.

## Helping out

If you want to collaborate on this project, please send a pull request with your fix. The current improvement area is making it more didactic, so if a teacher want to use in on a class room, maybe he doesn't want to show the number of fragments or the values of each one immediately and let the students answer first.

## Thanks

This application is based on the IP Fragmentation Applet coded by Ryan Gilbert (ASU) in 2008, provided along with the book *"Computer Networking: A Top-Down Approach Fourth Edition"* by J. Kurose. The applet was following the work of Albert Huang (UPenn) in 1997.