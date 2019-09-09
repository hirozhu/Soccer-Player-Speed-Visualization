# Soccer-Player-Speed-Visualization

1. Install packages: 'npm install'

2. The filename of the tracking data is currently hard-coded into 'index.ts', change
the field in 'index.ts' to the correct filename.

3. Compile 'index.ts': 'tsc index.ts'

4. Run: 'node index.js'

5. The parser 'parser.ts' will transform the original tracking data in jsonl into a
csv file in the form that I want named 'player_speed.csv', and 'display.html' will 
read this csv file (the filename 'player_speed.csv' is also currently hard-coded 
into 'display.html')

6. display.html will read player speed data from 'player_speed.csv' and display a 
line-chart graph, x-axis being frameIdx and y-axis being speed. Each line
representing a player's speed along each frame over the period of a game. 

7. To show the graph, open Terminal and browse to the directory that has your program 
in it. Then run the following command:

    'python -m SimpleHTTPServer'

8. You’ll see a note come up saying: 

    'Serving HTTP on 0.0.0.0 port 8000 ...'

9. And then you can open up http://localhost:8000/, navigate to the approriate path
that has 'display.html' to view the D3 graph. The loading of the graph is a bit slow.



Fields of Improvements: 

1. The program currently reads the file that is hard-coded into the program. Next step
I could make it so that the user can input the filename to tell the program which file 
to read. 

2. With hundreds of thousands of datapoints (frames) per player. The line-chart may not 
be clear nor pretty. 

3. Currently there are two seperate program: 'parser.ts' to parse the original tracking 
data into the csv format that I need; and 'display.html' to read the csv file and show 
the d3 graph. Next step I should combine them into one program. 

4. Transforming the original data into a csv file might be an unnecessary extra step, 
since csv file is very big and it makes the render very slow. I should think other ways 
to display.