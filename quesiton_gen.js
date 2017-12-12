// need to change
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/trivia";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = [
{ question: 'What country won the 2017 World Junior Ice Hockey Championships on January 5,2017?', choices: ['United States', 'Russia', 'Finland', 'Cananda'], answer: 'United States', difficulty: 'Hard', category: 'Sports'},
{ question: 'What horse won the 2017 Kentucky Derby on May 6th, 2017?', choices: ['Always Dreaming', 'Lookin At Lee' , 'Classic Empire', 'Battle of Midway'], answer: 'Always Dreamin', difficulty: 'Medium', category: 'Sports'},
{ question: 'The longest running broadcaster in TV and radio history, what legendary New York sports broadcaster died on July 15, 2017?', choices: ['Curt Gowdy', 'Jack Buck', 'Howard Cosell', 'Bob Wolff'], answer: 'Bob Wolff', difficulty: 'Medium', category: 'Sports'},
{ question: 'Which NHL team won the 2017 Stanley Cup finals against the Nashville Predators?', choices: ['Ottawa Senators', 'Pittsburgh Penguins', 'Columbus Blue Jackets', 'Washington Capitals'], answer: 'Pittsburgh Penguins', difficulty: 'Easy', category: 'Sports'},
{ question: 'What NFL team won Super Bowl 51 in overtime on February 5, 2017?', choices: ['New England Patriots', 'Dallas Cowboys', 'Los Angeles Chargers', 'Atlanta Falcons'], answer: 'New England Patriots', difficulty: 'Easy', category: 'Sports'},
{ question: ' Who was the National Basketball Association\'s Most Valuable Player (MVP) for 2017?', choices: ['Draymond Green', 'Kawhi Leonard', 'James Harden', 'Russell Westbrook'], answer: 'Russell Westbrook', difficulty: 'Medium', category: 'Sports'},
{ question: 'Retaining his title, who won the 2017 World Snooker Championships on May 1st, 2017?', choices: ['Ding Junhui', 'John Higgins', 'Barry Hawkins', 'Mark Selby'], answer: 'Mark Selby', difficulty: 'Hard', category: 'Sports'},
{ question: 'Taking place in Edinburgh, which team won the 2017 Rugby Union European Cup?', choices: ['Saracens', 'Leicester Tigers', 'Sale Sharks', 'Exeter Chiefs'], answer: 'Saracens', difficulty: 'Hard', category: 'Sports'},
{ question: 'Vito "Babe" Parilli, who died in July 2017, was a famous quarterback for which football club from 1961 to 1967?', choices: ['Green Bay Packers', 'Oakland Raiders','Cleveland Browns', 'Boston Patriots'], answer: 'Boston Patriots', difficulty: 'Hard', category: 'Sports'},
{ question: 'In what month did the 2017 Tour de France take place?', choices: ['June', 'July', 'April', 'May'], answer: 'July', difficulty: 'Medium', category: 'Sports'},
{ question: 'Which 1968 Disney comedy film features a white 1963 Volkswagen racing Beetle named Herbie?', choices: ['Quints', 'Ready to Run', 'The Love Bug', 'Northern Lights'], answer: 'The Love Bug', difficulty: 'Easy', category: 'Disney Movie'},
{ question: 'What 1963 animated musical comedy Disney film is based on a 1938 novel by T.H. White?', choices: ['Miracle of the White Stallions', 'The Sword in the Stone', 'Son of Flubber', 'The Incredible Journey'], answer: 'The Sword in the Stone', difficulty: 'Hard', category: 'Disney Movie'},
{ question: 'What was the father\'s name in Walt Disney\'s "Swiss Family Robinson"?', choices: ['Francis', 'Ernst', 'Fritz', 'William'], answer: 'William', difficulty: 'Medium', category: 'Disney Movie'},
{ question: 'In the 1981 Disney film "The Fox and the Hound", what is the name of the hound?', choices: ['Chief', 'Copper', 'Tod', 'Amos Slade'], answer: 'Copper', difficulty: 'Easy', category: 'Disney Movie'},
{ question: 'What Disney television film stars Whoopi Goldberg as Dr. Vivien Morgan/Sir Boss?', choices: ['A Fighting Choice', 'Escape to Witch Mountain', 'Lots of Luck', 'A Knight in Camelot'], answer: ' A Knight in Camelot', difficulty: 'Hard', category: 'Disney Movie'}, 
{ question: 'Originally released by Disney in 1976, a remake starring Jamie Lee Curtis and Lindsay Lohan was released in 2003. Can you name the film?', choices: ['Pollyanna', 'A Tiger Walks', 'Summer Magic', 'Freaky Friday'], answer: 'Freaky Friday', difficulty: 'Medium', category: 'Disney Movie'},
{ question: 'Released in 1995, which of the following Disney films is based on a novel by Mark Twain?', choices: ['Old Yeller', 'Treasure Island', 'Tom and Huck', 'Fun and Fancy Free'], answer: 'Tom and Huck', difficulty: 'Medium', category: 'Disney Movie'},
{ question: 'What Disney villain sings the song "Poor Unfortunate Souls"?', choices: ['Madame Medusa', 'Cruella de Vil', 'Queen of Hearts', 'Ursula the Sea Witch'], answer: 'Ursula the Sea Witch', difficulty: 'Easy', category: 'Disney Movie'},
{ question: '"Jafar" is the villain in which Disney animated film?', choices: [' The Hunchback of Notre Dame', 'Mulan', 'Pocahontas', 'Aladdin'], answer: 'Aladdin', difficulty: 'Easy', category: 'Disney Movie'}, 
{ question: 'In the Disney animated film "Bambi", what kind of animal is "Flower"?', choices: ['Turtle', 'Skunk', 'Rabbit', 'Cat'], answer: 'Skunk', difficulty: 'Medium', category: 'Disney Movie'},
{ question: 'In what month was the attack on Pearl Harbor?', choices: ['January', 'December', 'June', 'July'], answer: 'December', difficulty: 'Easy', category: 'United States'},
{ question: 'In the 1904 Olympics, how many of the 23 track and field titles were won by Americans?', choices: ['19', '21', '15', '7'], answer: '21', difficulty: 'Hard', category: 'United States'},
{ question: 'Where was the World Fair held in 1903?', choices: ['Sacramento', 'Pittsburgh', 'St. Louis', 'Chicago'], answer: 'St. Louis', difficulty: 'Medium', category: 'United States'},
{ question: 'Where was the first nuclear reactor built, by Enrico Fermi?', choices: ['Chicago', 'Detroit', 'Albuquerque', 'Denver'], answer: 'Chicago',  difficulty: 'Medium', category: 'United States'},
{ question: 'Truax Field international airport is in which US state?', choices: ['Wisconsin', 'New York', 'New Hampshire', 'Minnesota'], answer: 'Wisconsin', difficulty: 'Hard', category: 'United States'},
{ question: 'Which couple were implicated in the Whitewater affair?', choices: ['Clintons', 'Obamas', 'Reagans', 'Kennedys'], answer: 'Clinton', difficulty: 'Medium', category: 'United States'},
{ question: 'What year was Martin Luther King Jr. assassinated?', choices: ['1965', '1968', '1973', '1969'], answer: '1968', difficulty: 'Medium', category:'United States'},
{ question: 'What year did Florida become a state?', choices: ['1845', '1850', '1900', '1875'], answer: '1845', difficulty: 'Medium', category: 'United States'},
{ question: 'What is the capital of Pennsylvania?', choices: ['Pittsburgh', 'Harrisburg', 'Gettysburg', 'Philadelphia'], answer: 'Harrisburg', difficulty: 'Easy', category: 'United States'},
{ question: 'What month was George Washington born?', choices: ['March', 'December', 'February', 'June'], answer: 'February', difficulty: 'Medium', category: 'Easy'},
{ question: 'Gatophobia is the fear of what kind of creature?', choices: ['Bears', 'Snakes', 'Cats', 'Spiders'], answer: 'Cats', difficulty: 'Medium', category: 'Animals'},
{ question: 'Which of these animals is the largest by weight?', choices: ['Orangutan', 'Spider Monkey', 'Baboon', 'Mountain Gorilla'], answer: 'Mountain Gorilla', difficulty: 'Easy', category: 'Animals'},
{ question: 'Which of these creatures kills the most people per year?', choices: ['Crocodile', 'Mosquito', 'Great white shark', 'Hippopotamus'], answer: 'Mosquito', difficulty: 'Easy', category: 'Animals'},
{ question: 'How many eyelids does a camel have?', choices: ['3', '5', '0', '2'], answer: '3', difficulty: 'Hard', category: 'Animals'},
{ question: 'Approximately, how many hours a day do cats normally sleep?', choices: ['8', '15', '10', '20'], answer: '15', difficulty: 'Medium', category: 'Animals'},
{ question: 'What is the proper term for a female elephant?', choices: ['Doe', 'Cow', 'Sow', 'Mare'], answer: 'Cow', difficulty: 'Hard', category: 'Animals'},
{ question: 'What is the only continent where bees do not live naturally?', choices: ['Asia', 'North America', 'Europe', 'Antartica'], answer: 'Antartica', difficulty: 'Easy', category: 'Animals'},
{ question: 'What bird was once native to the Island of Mauritius?', choices: ['Flamingo', 'Pink-headed Duck', 'Dodo', 'Great Auk'], answer: 'Dodo', difficulty: 'Hard', category: 'Animals'},
{ question: 'How long in feet can the tentacles on a Portuguese man-o-war grow?', choices: ['150', '200', '100', '85'], answer: '150', difficulty: 'Hard', category:'Animals'},
{ question: 'Which of these creatures lays eggs?', choices: ['Fruit bat', 'Mouse', 'Echidna', 'Beluga Whale'], answer: 'Echidna', difficulty: 'Hard', category: 'Animals'},
{ question: 'Which of the following elements is not a noble gas?', choices: ['Boron', 'Neon', 'Radon', 'Helium'], answer: 'Boron', difficulty: 'Medium', category: 'Science'},
{ question: 'Approximately, what percentage of the population has an IQ above 100?', choices: ['80', '60', '50', '40'], answer: '50', difficulty: 'Hard', category: 'Science'},
{ question: 'Which planet did Mariner 9 orbit in 1971?', choices: ['Mercury', 'Mars', 'Jupiter', 'Saturn'], answer: 'Mars', difficulty: 'Medium', category: 'Science'},
{ question: 'When was the electric battery invented?', choices: ['1876', '1967', '1800', '1903'], answer: '1800', difficulty: 'Hard', category: 'Science'},
{ question: 'What is another name for Vitamin A?', choices: ['Riboflavin', 'Thiamin', 'Retinol', 'Niacin'], answer: 'Retinol', difficulty: 'Hard', category: 'Science'},
{ question: 'Which culture is credited with inventing the abacus?', choices: ['Chinese', 'Russian', 'Egyptian', 'Mayan'], answer: 'Chinese', difficulty: 'Easy', category: 'Science'},
{ question: 'Where is the thickest skin found on the human body?', choices: ['The bum', 'The palm', 'The back', 'The head'], answer: 'The palm', difficulty: 'Easy', category: 'Science'},
{ question: 'Which of the following items was not invented in 1965?', choices: ['Optical Disk', 'Hypertext', 'Respirator', 'Cash Dispenser'], answer: 'Cash Dispenser', difficulty: 'Medium', category: 'Science'},
{ question: 'What is Agent Orange?', choices: ['A character in a cartoon', 'A math problem', 'A nickname for an element', 'A herbicide'], answer: 'A herbicide', difficulty: 'Medium', category: 'Science'},
{ question: 'Which of these inventions dates back to about 1500 BC?', choices: ['Paintbrush', 'Comb', 'Glass', 'Paper'], answer: 'Glass', difficulty: 'Easy', category: 'Science'}
];
  db.collection("questions").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
