using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelingSalesmanProblem
{
    public class Population
    {
        public List<Rout> PopulationOfRouts { get; set; } = new List<Rout>();
        public double BestDistance { get; set; } = double.MaxValue;
        public double BestFitness { get; set; } = 0;

        private Rout initRout;
        private Random random = new Random();
        private const double MUTATE_CHANCE = 0.02;
        private readonly double[] CHANCES_TO_CROSSING = { 0.4, 0.7, 0.9 };
        private readonly int SIZE_OF_POPULATION;

        public Population(Rout rout, int size = 1000)
        {
            initRout = rout;
            this.SIZE_OF_POPULATION = size;
            GenerateFirstPopulation(SIZE_OF_POPULATION);
        }

        private void GenerateFirstPopulation(int populationSize)
        {
            PopulationOfRouts = new List<Rout>();
            for (int i = 0; i < populationSize; i++)
            {
                PopulationOfRouts.Add(new Rout(initRout.Shuffle()));
            }
            GetBestFitness();
        }

        public void GetBestFitness()
        {
            foreach (Rout item in PopulationOfRouts)
            {
                if (item.Fitness > BestFitness)
                {
                    BestFitness = item.Fitness;
                }
                if (item.Distance < BestDistance)
                {
                    BestDistance = item.Distance;
                }
            }
        }

        public void GenerateNewPopulation()
        {
            List<Rout> tmp = new List<Rout>();
            List<Rout> sortedPopulation = new List<Rout>(PopulationOfRouts);
            sortedPopulation.Sort();
            sortedPopulation.Reverse();

            int size10percent = sortedPopulation.Count / 10;
            for (int i = 0; i < size10percent; i++)
            {
                tmp.Add(sortedPopulation[i]);
            }

            for (int i = 0; i < sortedPopulation.Count - size10percent; i++)
            {
                Rout firstParent = SelectParent(sortedPopulation);
                Rout secondParent = SelectParent(sortedPopulation);
                Rout child = Crossing(firstParent, secondParent);
                child = Mutate(child);
                tmp.Add(child);
            }

            PopulationOfRouts = tmp;
            GetBestFitness();
        }

        private Rout Crossing(Rout firstParent, Rout secondParent)
        {
            int start = random.Next(firstParent.VisitedPubs.Count);
            int end = random.Next(start, firstParent.VisitedPubs.Count);
            List<Pub> tmp = new List<Pub>(firstParent.VisitedPubs);

            for (int i = 0; i < end - start; i++)
            {
                tmp.RemoveAt(start);
            }

            for (int i = 0; i < secondParent.VisitedPubs.Count; i++)
            {
                if (!tmp.Contains(secondParent.VisitedPubs[i]))
                {
                    tmp.Add(secondParent.VisitedPubs[i]);
                }
            }

            return new Rout(tmp);
        }

        public Rout SelectParent(List<Rout> list)
        {
            double chance = random.NextDouble();
            int size = list.Count;
                //Random from TOP 0% - 24%
            if (chance <= CHANCES_TO_CROSSING[0])
            {
                return list[random.Next(0, size / 4)];
            }
            else if (chance <= CHANCES_TO_CROSSING[1])
            {
                //Random from TOP 25% -49%
                return list[random.Next(size / 4, size / 2)];
            }
            else if (chance <= CHANCES_TO_CROSSING[2])
            {
                //Random from TOP 50% - 74%
                return list[random.Next(size / 2, (size / 4) * 3)];
            }
            else
            {
                //Radon from TOP 75% - 99%
                return list[random.Next((size / 4) * 3, size)];
            }
        }

        public Rout Mutate(Rout rout)
        {
            double chance = random.NextDouble();
            if (chance < MUTATE_CHANCE)
            {
                int i = random.Next(0, rout.VisitedPubs.Count);
                int j = random.Next(0, rout.VisitedPubs.Count);
                Pub tmp = rout.VisitedPubs[i];
                rout.VisitedPubs[i] = rout.VisitedPubs[j];
                rout.VisitedPubs[j] = tmp;
            }
            return new Rout(rout.VisitedPubs);
        }
    }
}
