using IronXL;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;

namespace TravelingSalesmanProblem
{
    public class PubController
    {
        private const int RADIUS_OF_EARTH = 6371;
        public List<Pub> Pubs { get; set; }
        public double[,] Distances;

        public PubController() {
            Pubs = new List<Pub>();        
        }

        public void LoadPubs(string path) {
            var lines = File.ReadLines(path);
            foreach (var line in lines) {
                if (Char.IsDigit(line[0])) { 
                    string[] parameters = line.Split(';');
                    Pubs.Add(new Pub(int.Parse(parameters[0]), parameters[1], double.Parse(parameters[2], CultureInfo.InvariantCulture), double.Parse(parameters[3], CultureInfo.InvariantCulture)));
                }
            }

            Distances = new double[Pubs.Count, Pubs.Count];
        }

        //public void CalculatePathBetweenPubs() {
        //    for (int i = 0; i < Pubs.Count; i++)
        //    {
        //        for (int j = 0; j < Pubs.Count; j++)
        //        {
        //            Distances[i, j] = GetDistanceFromLatLonInM(Pubs[i].Lat, Pubs[i].Lon, Pubs[j].Lat, Pubs[j].Lon);
        //        }
        //    } 
        //}

        public void PrintDistances() {
            for (int i = 0; i < Distances.GetLength(0); i++)
            {
                for (int j = 0; j < Distances.GetLength(1); j++)
                {
                    Console.Write($"{Distances[i,j]}");
                }
                Console.WriteLine("");
            }
        }

        //private double GetDistanceFromLatLonInM(double lat1, double lon1, double lat2, double lon2)
        //{
        //    var R = 6371; // Radius of the earth in km
        //    var dLat = Deg2rad(lat2 - lat1);  // deg2rad below
        //    var dLon = Deg2rad(lon2 - lon1);
        //    var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
        //            Math.Cos(Deg2rad(lat1)) * Math.Cos(Deg2rad(lat2)) *
        //            Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

        //    var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        //    var d = R * c * ; // Distance in m
        //    return d;
        //}

        //private double Deg2rad(double deg)
        //{
        //    return deg * (Math.PI / 180);
        //}
    }
}
