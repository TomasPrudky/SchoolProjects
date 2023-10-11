using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelingSalesmanProblem
{
    public class System
    {
        private List<Pub> pubs;
        private int generation = 0;

        public System(List<Pub> pubs)
        {
            this.pubs = pubs;
        }

        public void Run() {
            Rout rout = new Rout(pubs);
            Population population = new Population(rout, 1000);

            while (/*generation < 1000*/true) {
                population.GenerateNewPopulation();
                generation++;
                Console.WriteLine($"Generace: {generation}\nDistance: {population.BestDistance}\n");
                if (generation % 1000 == 0)
                {
                    Rout bestRout = population.PopulationOfRouts[0];
                    foreach (var item in population.PopulationOfRouts)
                    {
                        if (bestRout.Fitness < item.Fitness)
                        {
                            bestRout = item;
                        }
                    }

                    bestRout.PrintPath();
                    Console.ReadKey();
                }
            }
        }
    }
}
