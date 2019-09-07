# Soccer-Player-Speed-Visualization

1. The parser.ts is currently not working. Having trouble to build/run. Guessing I 
might be missing some installs/imports.

2. display.html will currently read player speed data that I made from mock.csv and
display a line-chart graph, x-axis being frameIdx and y-axis being speed. Each line
representing a player's speed along each frame over the period of a game. 

3. To show the graph, open Terminal and browse to the directory that has your file 
in it. Then run the following command:

    python -m SimpleHTTPServer

4. You’ll see a note come up saying: 

    Serving HTTP on 0.0.0.0 port 8000 ...

5. And then you can open up http://localhost:8000/display.html to view the D3 graph.