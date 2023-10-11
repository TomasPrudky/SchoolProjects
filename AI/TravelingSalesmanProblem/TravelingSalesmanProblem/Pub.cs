using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelingSalesmanProblem
{
    public class Pub
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }

        public Pub(int iD, string name, double lat, double lon)
        {
            ID = iD;
            Name = name;
            Lat = lat;
            Lon = lon;
        }
    }
}
