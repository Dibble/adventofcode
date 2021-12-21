namespace AdventOfCode21
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("test.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var player1 = new Player(int.Parse(lines[0].Split(' ')[^1]));
            var player2 = new Player(int.Parse(lines[1].Split(' ')[^1]));
            var players = new[] { player1, player2 };
            var universes = new List<(int, Player[])>
            {
                (0, players)
            };

            var wins = new[] { 0L, 0L };

            while (universes.Any())
            {
                Console.WriteLine(universes.Count);
                var universe = universes[0];
                var currentPlayer = universe.Item1;
                var player = universe.Item2[currentPlayer];
                var nextPlayer = currentPlayer == 0 ? 1 : 0;

                var newPositions = GetNewPositions(player.position);
                newPositions.Skip(1).ToList().ForEach(pos =>
                {
                    var newPlayers = new[] { new Player(universe.Item2[0].position), new Player(universe.Item2[1].position) };
                    newPlayers[currentPlayer].position = pos;
                    newPlayers[currentPlayer].score += pos;
                    var newUniverse = (nextPlayer, newPlayers);
                    universes.Add(newUniverse);
                });

                player.position = newPositions[0];
                player.score += newPositions[0];
                universe.Item1 = nextPlayer;
                
                if (player.score >= 21)
                {
                    wins[currentPlayer]++;
                    universes = universes.Skip(1).ToList();
                }
            }

            Console.WriteLine(wins.Max());
        }

        static int[] GetNewPositions (int position)
        {
            var rolls = new[] { 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 9 };
            return rolls.Select(roll =>
            {
                var newPosition = position + roll;
                if (newPosition > 10)
                {
                    newPosition -= 10;
                }
                return newPosition;
            }).ToArray();
        }

        struct Player
        {
            public int score;
            public int position;
            public Player(int startingPos)
            {
                score = 0;
                position = startingPos;
            }
        }
    }
}