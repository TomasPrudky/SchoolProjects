using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelingSalesmanProblem
{
    public class Rout : IComparable<Rout>
    {
        public List<Pub> VisitedPubs { get; set; }
        public double Distance { get; set; }
        public double Fitness { get; set; }



        public Rout(List<Pub> list)
        {
            VisitedPubs = list;
            CalculateDistance();
            CalculateFitnes();
        }

        private void CalculateFitnes()
        {
            Fitness = 1 / Distance;
        }

        private void CalculateDistance()
        {
            double distance = 0;
            //-1 pro nekruhovou cestu.
            for (int i = 0; i < VisitedPubs.Count - 1; i++)
            {
                Pub firstPub = VisitedPubs[i];
                Pub secondPub = VisitedPubs[(i + 1) % VisitedPubs.Count];
                distance += GetDistanceFromLatLonInM(firstPub.Lat, firstPub.Lon, secondPub.Lat, secondPub.Lon);
            }

            Distance = distance;
        }

        private double GetDistanceFromLatLonInM(double lat1, double lon1, double lat2, double lon2)
        {
            double d = 6371 * Math.Acos(
                    Math.Sin(lat1) * Math.Sin(lat2) +
                    Math.Cos(lat1) * Math.Cos(lat2) *
                    Math.Cos(lon1 - lon2)
                );
            return d / 100;
        }

        public List<Pub> Shuffle()
        {
            Random random = new Random();
            List<Pub> tmp = new List<Pub>(VisitedPubs);
            int count = tmp.Count;

            while (1 < count)
            {
                count--;
                int k = random.Next(count + 1);
                Pub v = tmp[k];
                tmp[k] = tmp[count];
                tmp[count] = v;
            }

            return tmp;
        }

        public void PrintPath()
        {
            foreach (var item in VisitedPubs)
            {
                Console.Write(item.ID + "->");
            }
            Console.WriteLine("\n");
        }

        public int CompareTo(Rout other)
        {
            return Fitness.CompareTo(other.Fitness);
        }
    }
}
