using System;

namespace TravelingSalesmanProblem
{
    public class Program
    {

        static void Main(string[] args)
        {

            PubController pubController = new PubController();
            pubController.LoadPubs("..\\..\\..\\..\\Pubs.txt");
            System system = new System(pubController.Pubs);
            system.Run();
        }
    }
}
