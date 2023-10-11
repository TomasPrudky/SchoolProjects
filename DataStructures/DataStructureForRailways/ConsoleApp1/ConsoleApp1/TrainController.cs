using System.Collections.Generic;

namespace ConsoleApp1
{
    public class TrainController
    {
        public List<Train> LiostOfTrains { get; set; }

        public TrainController()
        {
            LiostOfTrains = new();
        }
    }
}
