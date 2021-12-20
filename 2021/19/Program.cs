using System;

namespace AdventOfCode19
{
    class Program
    {
        static void Main(string[] args)
        {
            using var sr = new StreamReader("test.txt");

            var file = sr.ReadToEnd();
            var lines = file.Split("\n").ToList();

            var scanners = new List<Scanner>();

            Scanner currentScanner = null;
            lines.ForEach(line =>
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    scanners.Add(currentScanner);
                    return;
                }
                if (line.StartsWith("---"))
                {
                    currentScanner = new Scanner(new List<Beacon>());
                    return;
                }
                var s = line.Split(',').Select(n => int.Parse(n)).ToArray();
                var beacon = new Beacon(s[0], s[1], s[2]);
                if (scanners.Count == 0)
                {
                    beacon.absolute = beacon.self;
                }
                currentScanner.beacons.Add(beacon);
            });
            scanners.Add(currentScanner);

            // for each scanner, build list of beacon to beacon vectors
            scanners.ForEach(scanner =>
            {
                for (int i = 0; i < scanner.beacons.Count - 1; i++)
                {
                    var beacon1 = scanner.beacons[i];
                    for (int j = i + 1; j < scanner.beacons.Count - 1; j++)
                    {
                        var beacon2 = scanner.beacons[j];
                        var diff = beacon1.AbsoluteDiff(beacon2);
                        if (scanner.beaconMap.ContainsKey(diff))
                        {
                            scanner.beaconMap[diff].Add((beacon1, beacon2));
                        }
                        else
                        {
                            scanner.beaconMap.Add(diff, new List<(Beacon, Beacon)>{ (beacon1, beacon2) });
                        }
                    }
                }
            });

            // compare each scanner by trying to find at least 12 beacon vectors that match exactly in all three axes magnitude
            var scanner0 = scanners[0];
            var scanner1 = scanners[1];
            var overlap = scanner1.beaconMap.Keys.ToDictionary(key => key, key =>
            {
                var mags = new List<int>{ key.x, key.y, key.z };
                var overlapKeys = scanner0.beaconMap.Keys.Where(key2 => mags.Contains(key2.x) && mags.Contains(key2.y) && mags.Contains(key2.z));
                return overlapKeys.Select(k => scanner0.beaconMap[k]).ToList();
            });
            ;

            // start with scanner 0
            // identify all overlapping scanners
            // somehow transform coords of beacons between overlapping scanners
            // when identified, update beacon with scanner 0 relative coords
            // repeat until all are identified (following chains of scanners probably)
            // de-dupe beacons
            // count beacons
        }
    }

    class Vector3 : IEquatable<Vector3>
    {
        public int x;
        public int y;
        public int z;
        public Vector3(int _x, int _y, int _z)
        {
            x = _x;
            y = _y;
            z = _z;
        }

        public bool Equals(Vector3 other)
        {
            return x == other.x && y == other.y && z == other.z;
        }

        public override bool Equals(object obj)
        {
            var other = (Vector3)obj;
            return x == other.x && y == other.y && z == other.z;
        }

        public override int GetHashCode()
        {
           return $"{x},{y},{z}".GetHashCode();
        }
    }

    class Beacon
    {
        public Vector3 self;
        public Vector3? absolute = null;

        public Beacon (int _x, int _y, int _z)
        {
            self = new Vector3(_x, _y, _z);
        }

        public Vector3 AbsoluteDiff(Beacon other)
        {
            return new Vector3(Math.Abs(self.x - other.self.x), Math.Abs(self.y - other.self.y), Math.Abs(self.z - other.self.z));
        }
    }

    class Scanner
    {
        public List<Beacon> beacons;
        public Dictionary<Vector3, List<(Beacon, Beacon)>> beaconMap = new Dictionary<Vector3, List<(Beacon, Beacon)>>();

        public Scanner (List<Beacon> _beacons)
        {
            beacons = _beacons;
        }
    }
}