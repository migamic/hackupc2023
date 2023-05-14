## Inspiration
The original goal of the team was to make a mini-game for flight travelers, that would get them to know the streets of their city destination. The game has a very simple concept, reminding of agar.io, where the users are tourists guides in the city and they have to compete to try and gather the largest crowd, while visiting the most important touristic spots in the city.

The end goal is that users, after playing a few games will get familiar with the city layout, so when they are the actual tourists in the city, they will know where everything is and how to reach the most important landmarks.

## What it does
The road network of the destination city is pre-downloaded from OpenStreetMap and parsed to our needs. Map tiles and any other data is also pre-downloaded (since users will not have internet connection during the flight). The preprocessing system is very flexible and can work with any region in the world.

The user is then able to move around the streets of the city while seeing the most important landmarks around

## How we built it
The preprocessing uses Python to export data from OpenStreetMap (the road layout and the landmark coordinates through Overpass queries). We also use MapTiler's tiles to pre-render the background map.

The main application is built using React, using Konva and D3 for processing and drawing the network graph.

## Challenges we ran into
Coding the React app was very challenging because we had zero prior experience.

## Accomplishments that we're proud of
We managed to get a (limited) working project, that runs efficiently and has a very clean UI.

## What we learned
Since this was the first hackathon for the 2/3 people of the team, first and foremost we got a better look at prototyping and the importance of planning every step of the app production properly.

We also learned the basics of React and web development and improved our knowledge in querying public APIs.

## What's next for Street Explorer
We would have liked to have full controls working, allowing the user to navigate the city at will. We would have also liked to implement more game mechanics, such as gathering a crowd that follows the player.
Similarly to agar.io, the future of Street Explorer is a multiplayer game, where multiple users (_i.e._, the plane passengers) can log into the same local network and compete against each other on a fight to pick up as many tourists along the way as possible.
